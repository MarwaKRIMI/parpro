import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/User.service';
import { User } from '../models/user.model';
import { DemandService } from '../shared/services/demand.service';
import { Demand } from '../models/demand.model';
import { FilterDemand } from '../models/demand-filter.model';
import { Professional } from '../models/professional.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title, Meta } from "@angular/platform-browser";
@Component({
  selector: 'fws-list-demands',
  templateUrl: './list-demands.component.html',
  styleUrls: ['./list-demands.component.css'],
  providers: [UserService, DemandService]
})
export class ListDemandsComponent implements OnInit {
  constructor(private userService : UserService,
     private alertService: AlertService,
     private spinner: NgxSpinnerService, 
     private demandService: DemandService,
     private titleservice: Title,
     private meta: Meta) {
    this.getListDemands()
  }
  isAccepted : boolean = false
  listDemands :Demand[] = [];

  ngOnInit() {
    this.meta.addTag({
      name: "description",
      content:
        "voir les demandes disponibles dans votre domaine d'expertise et accepter ce qui vous intéresse"
    });
    this.titleservice.setTitle(
      "Les demandes disponibles dans votre domaine d'expertise| PARPRO "
    );
    this.spinner.show();
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  } 
  getListDemands() {
    let filter = new FilterDemand();
    filter.sort = "createdAt"
    filter.order = "desc";
   
    filter.status = 1;
    
    this.userService.me().subscribe(
      res => {
        filter.activity = res.activity.id;
        this.demandService.getListDemands(filter).subscribe(
          res => {
            this.listDemands = res;
            this.spinner.hide()
          },
          error => {
          this.alertService.danger('Une erreur est survenue veuillez réessayer plus tard');
        });
      },
      error => this.alertService.danger('Une erreur est survenue veuillez réessayer plus tard')
    )
  }

}
