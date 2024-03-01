import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordService } from '../shared/services/password.service';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'fws-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css'],
  providers: [passwordService]
})
export class RequestPasswordComponent implements OnInit {
  RequestPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private titleService : Title,
    private meta :Meta ,
    private formBuilder: FormBuilder,
    private passwordService: passwordService,
    private alertService: AlertService
  ) {  this.meta.addTag({ name: 'description', content: "Saisissez ci-dessous votre adresse e-mail, un e-mail vous sera envoyé pour réinitialiser votre mot de passe."})}

  ngOnInit() {
    this.titleService.setTitle("Réinitialisez votre mot de passe| PARPRO")
    this.RequestPasswordForm = this.formBuilder.group({
        email: ['', Validators.required]
    });

  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  } 
  // convenience getter for easy access to form fields
  get f() { return this.RequestPasswordForm.controls; }

  onSubmit() {

      this.submitted = true;
      // stop here if form is invalid
      if (this.RequestPasswordForm.invalid) {
          return;
      }

      this.loading = true;
      this.passwordService.request_password(this.f.email.value)
          .subscribe(
              data => {
                this.alertService.success('Vérifier votre boite email');
                this.loading = false;
              },
              error => {
                  this.alertService.danger('Veuiller réessayer plus tard');
                  this.loading = false;
              });
  }

}
