import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDemandService } from '../shared/services/demand-confirm.service';
import { AlertModule, AlertService } from 'ngx-alerts';
@Component({
  selector: 'fws-confirm',
  templateUrl: './confirm-demand.component.html',
  styleUrls: ['./confirm-demand.component.css'],
  providers: [ConfirmDemandService]
})
export class ConfirmDemandComponent implements OnInit {
  loading = false;
  submitted = false;
  demandId: string;
  token: string;
  constructor(private router: Router, private route: ActivatedRoute, private confirmDemandService: ConfirmDemandService, private alertService: AlertService,) {
    this.route.queryParams.subscribe(params => {
    this.demandId = params['id'];
    if (this.demandId) {
      this.confirmDemandService.confirmDemand(this.demandId)
      .pipe(first())
      .subscribe(
          data => {
            this.alertService.success('La demande est bien confirmée');
          },
          error => {
              this.alertService.danger("Une erreur est survenue ! réessayer plus tard");
          });
    }
  });
  }

  ngOnInit() {
  }

  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
}

}
