import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { UserService } from '../../shared/services/User.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'fws-register-part',
  templateUrl: './register-part.component.html',
  styleUrls: ['./register-part.component.css'],
  providers: [UserService]
})
export class RegisterPartComponent {

  loading = false;
  submitted = false;
  secPasswordText = '';
  particular: User = new User();
 
  activities = [];
  countries = environment.countriesList;
  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,

    ) {
    }

  onSubmit() {
    this.submitted = true;
    if(this.particular.plainPassword.first != this.particular.plainPassword.second){
      this.loading = false;
      return;
    }
    this.loading = true;

    this.userService.registerParticular(this.particular)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.success('Inscription avec succès', true);
                
            },
            error => {
                this.alertService.error('Une erreur est survenue veuillez réessayer plus tard');
                this.loading = false;
            });
  }

}
