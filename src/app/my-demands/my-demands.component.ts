import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/User.service";
import { User } from "../models/user.model";
import { DemandService } from "../shared/services/demand.service";
import { Demand } from "../models/demand.model";
import { FilterDemand } from "../models/demand-filter.model";
import { Professional } from "../models/professional.model";
import { AuthenticationService } from "../shared/services/authentication.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertModule, AlertService } from "ngx-alerts";
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: "fws-list-demands",
  templateUrl: "./my-demands.component.html",
  styleUrls: ["./my-demands.component.css"],
  providers: [UserService, DemandService]
})
export class MyDemandsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private demandService: DemandService, 
    private titleservice: Title,
    private meta : Meta
  ) {
    this.getListDemands();
  }

  myDemands: Demand[] = [];

  ngOnInit() {
    this.meta.addTag({name:"description",content:" vos demandes acceptées correspondent à votre domaine d'expertise."})
    this.titleservice.setTitle("Les  demandes acceptées dans votre domaine d'expertise| PARPRO ")
    this.spinner.show();
  }
  showAlerts(): void {
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");
  }
  getListDemands() {
    let filter = new FilterDemand();
    this.userService.me().subscribe(
      res => {
        filter.limit = 10;
        filter.professional = res.user.id;
        this.demandService.getListDemands(filter).subscribe(
          res => {
            this.myDemands = res;
            this.spinner.hide();
          },
          error => {
            this.alertService.danger(
              "Une erreur est survenue veuillez réessayer plus tard"
            );
          }
        );
      },
      error =>
        this.alertService.danger(
          "Une erreur est survenue veuillez réessayer plus tard"
        )
    );
  }
}
