import { Component, OnInit } from "@angular/core";
import { Demand } from "../models/demand.model";
import { Professional } from "../models/professional.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ProfessionalService } from "../shared/services/professional.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title, Meta } from "@angular/platform-browser";
@Component({
  selector: "fws-professional-profile",
  templateUrl: "./professional-profile.component.html",
  styleUrls: ["./professional-profile.component.css"],
  providers: [ProfessionalService]
})
export class ProfessionalProfileComponent implements OnInit {
  professional: Professional = new Professional();
  items: Array<any> = [];
  isConnected: boolean = false;
  isEmpty :boolean = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private professionalService: ProfessionalService,
    private servicetitle : Title ,
    private meta : Meta 
    
  ) {
    this.route.params.subscribe(params => {
      if (params["slug"]) {
        this.getProfessional(params["slug"]);
      }
    });
    this.isConnected = this.authService.isLoggedIn();
  }
  ngOnInit() {}
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
}

  getProfessional(slug) {
    this.professionalService.getProfessional(slug).subscribe(
      res => {
        let dateDay =
          new Date(res.since).getDate() < 10
            ? "0" + new Date(res.since).getDate()
            : new Date(res.since).getDate();
        let dateMonth =
          new Date(res.since).getMonth() + 1 < 10
            ? "0" + (new Date(res.since).getMonth() + 1)
            : new Date(res.since).getMonth() + 1;

        this.professional = res;
        if(this.professional.services[0] ==null){
          this.isEmpty = true
        }
 
        if (this.isConnected){
          this.meta.addTag({name:"description",content:"Contactez "+this.professional.user.lastName+" "+this.professional.user.firstName+" artisan à "+ this.professional.user.address.city})
          this.servicetitle.setTitle(this.professional.user.lastName+" "+this.professional.user.firstName+" artisan à "+ this.professional.user.address.city+"| PARPRO")
          }
          else{
          this.meta.addTag({name:"description",content:"Contactez "+this.professional.user.lastName+" "+this.professional.user.firstName+" artisan à "+ this.professional.user.address.city})
          this.servicetitle.setTitle("Profil de  "+ this.professional.companyName+"| PARPRO")
          
          }
        if (this.professional.since) {
          this.professional.since =
            dateDay + "-" + dateMonth + "-" + new Date(res.since).getFullYear();
        }
        this.professional.realizations.forEach(element => {
          this.items.push(element.webPath);
        });
        this.professional.kbisDoc = res.kbisDoc;
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }
}
