import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordService } from '../shared/services/password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [passwordService]
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  token: string;

  constructor(private titleService : Title,
    private meta :Meta ,
    private formBuilder: FormBuilder,
    private passwordService: passwordService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.meta.addTag({ name: 'description', content: "écrivez votre nouveau mot de passe "})
    this.route.queryParams.subscribe(params => {
    this.token = params['t'];
  });
  }

  ngOnInit() {
    this.titleService.setTitle('Tapez le nouveau mot de passe| PARPRO ')
    this.ResetPasswordForm = this.formBuilder.group({
      password_1: ['', Validators.required],
      password_2: ['', Validators.required]
    });
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  } 
  // convenience getter for easy access to form fields
  get f() { return this.ResetPasswordForm.controls; }

  onSubmit() {

      this.submitted = true;
      // stop here if form is invalid
      if (this.ResetPasswordForm.invalid) {
          return;
      }

      this.loading = true;
      this.passwordService.reset_password(this.token, this.f.password_1.value)
          .subscribe(
              data => {
                this.loading = false;
                this.router.navigate(['connexion']);
              },
              error => {
                  this.alertService.danger('Veuiller réessayer plus tard');
                  this.loading = false;
              });
  }

}
