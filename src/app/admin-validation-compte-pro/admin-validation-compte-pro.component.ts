import { Component, OnInit } from '@angular/core';
import { ConfirmProService } from './../shared/services/admin-pro-confirm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModule, AlertService } from 'ngx-alerts';
@Component({
  selector: 'fws-validation-compte-pro',
  templateUrl: './admin-validation-compte-pro.component.html',
  styleUrls: ['./admin-validation-compte-pro.component.css'],
  providers: [ConfirmProService]
})
export class ValidationAdminCompteProComponent implements OnInit {
  id: string;
  constructor(private router: Router, private route: ActivatedRoute, private confirmService: ConfirmProService, private alertService: AlertService,) {
    this.route.queryParams.subscribe(params => {
    this.id = params['id'];
    if (this.id) {
      this.confirmService.confirmPro(this.id)
      .subscribe(
          data => {
            this.alertService.success('Le professionnel est bien validé');
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
