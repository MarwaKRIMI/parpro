import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'login-form',
  providers: [AuthenticationService],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isChecked: true;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private titleservice: Title,
    private meta : Meta 
    ) {
      if (authenticationService.isLoggedIn()) {
        this.router.navigate(['/']);
      }
    }
    showAlerts(): void{
      this.alertService.info('this is an info alert');
      this.alertService.danger('this is a danger alert');
      this.alertService.success('this is a success alert');
      this.alertService.warning('this is a warning alert');
  } 
  ngOnInit() {
    this.meta.addTag({name:"description",content:"Cconnectez-vous à notre portail professionnel pour découvrir des opportunités qui apporteront de la valeur à votre projet "})
    this.meta.addTag({name:"robots", content:"index, follow"})
    this.titleservice.setTitle("Connectez-vous à votre espace membre| PARPRO ")
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        checkbox: ['']
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                if(data === "Particular") {
                  this.router.navigate(['profil-part']);
                } else if (data === "Professional") {
                  this.router.navigate(['compte-pro']);
                }
            },
            error => {
                this.alertService.danger('Email ou mot de passe incorrect');
                this.loading = false;
            });
}
}
