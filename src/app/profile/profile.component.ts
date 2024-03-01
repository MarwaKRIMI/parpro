import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/User.service";
import { User } from "../models/user.model";
import { DemandService } from "../shared/services/demand.service";
import { Demand } from "../models/demand.model";
import { FilterDemand } from "../models/demand-filter.model";
import { Professional } from "../models/professional.model";
import { AuthenticationService } from "../shared/services/authentication.service";
import { AlertModule, AlertService } from 'ngx-alerts';
import { Meta, Title } from "@angular/platform-browser";
@Component({
  selector: "fws-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [UserService, DemandService]
})
export class ProfileComponent implements OnInit {
  
  professional: Professional = new Professional();
  user: User = new User();
  demands: Demand[] = [];
  name: string | boolean;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private demandService: DemandService,
    public authService: AuthenticationService,
    private titleservice: Title,
    private meta: Meta,
  ) {
    this.getProfile();
    this.getDemands();
  }


  ngOnInit() {this.name =this.authService.getCurrentUserName()
    this.meta.addTag({name:"description", content:"profil de "+ this.authService.getCurrentUserName()})
    this.titleservice.setTitle("Profil de "+  this.name+"| PARPRO")}

 
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
}
  getProfile() {
    this.userService.me().subscribe(
      res => {
        if (this.authService.getUserRole() == "Professional") {
          this.professional = res;
          this.user = res.user;
        } else {
          this.user = res;
        }
      },
      error => {
      this.alertService.danger('Une erreur est survenue veuillez réessayer plus tard');
    });
  }

  getDemands() {
    let filter = new FilterDemand();
    filter.limit = 10;
    this.demandService.getDemands(filter).subscribe(
      res => (this.demands = res),
      error => {
      this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
    });
  }

  deleteDemande(demandId: string) {
    this.demandService.deleteDemands(demandId).subscribe(
      res =>  {this.alertService.success(' Suppression avec succès'); this.getDemands()},
      error => {
      this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
    });
  }
}
