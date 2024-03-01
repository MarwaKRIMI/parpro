import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmEmailService } from '../shared/services/register-confirm.service';
import { AlertModule, AlertService } from 'ngx-alerts';
@Component({
  selector: 'fws-confirm',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css'],
  providers: [ConfirmEmailService]
})
export class ConfirmComponent implements OnInit {
  user: string;
  token: string;
  constructor(private router: Router, private route: ActivatedRoute,
     private confirmService: ConfirmEmailService,
     private alertService: AlertService) {
    this.route.queryParams.subscribe(params => {
    this.user = params['u'];
    this.token = params['t'];
    if (this.user && this.token) {
      this.confirmService.confirm(this.user,  this.token)
      .pipe(first())
      .subscribe(
          data => {
            this.alertService.success('Votre email a été bien validé');
              this.router.navigate(['connexion']);
          },
          error => {
              this.alertService.danger("Votre email n'a pas été validé, veuillez réessayer svp !");
          });
    }
  });
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
}
  ngOnInit() {
  }



}
