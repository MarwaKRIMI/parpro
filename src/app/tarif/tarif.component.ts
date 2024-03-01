import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { first } from "rxjs/operators";
import { UserService } from "../shared/services/User.service";
import { ProfessionalService } from "../shared/services/professional.service";
import { HttpClient } from "@angular/common/http";
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: "fws-tarif",
  templateUrl: "./tarif.component.html",
  styleUrls: ["./tarif.component.css"],
  providers: [UserService, ProfessionalService],
  encapsulation: ViewEncapsulation.None
})
export class TarifComponent implements OnInit {
  loading = false;
  submitted = false;
  checked: boolean = false;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private proService: ProfessionalService,
    private alertService: AlertService,
    private titleService : Title,
    private meta :Meta 
  ) {}
  paymentData: any = {
    PBX_SITE: "",
    PBX_RANG: "",
    PBX_IDENTIFIANT: "",
    PBX_TOTAL: "",
    PBX_DEVISE: "",
    PBX_CMD: "",
    PBX_PORTEUR: "",
    PBX_RETOUR: "",
    PBX_HASH: "",
    PBX_TIME: "",
    PBX_HMAC: "",
    serveurOK: ""
  };
  ngOnInit() {
    this.meta.addTag({name:"description",content:"content='pour bénéficier de l'offre de démarrage, vous devez convaincre les autres professionnels"})
    //title
    this.titleService.setTitle("Offre START UP| PARPRO")
    this.getPaymentData();
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  } 
  getPaymentData() {
    this.userService.me().subscribe(
      res => {
        this.proService.postPayment(res.user.id, 64.44).subscribe(
          res => {
            this.paymentData = res;
          },
          error => {
            this.alertService.danger(
              "Une erreur est survenue veuillez réessayer plus tard"
            );
          }
        );
      },
      error => {
        this.alertService.danger(
          "Une erreur est survenue lors de la récupération du profil veuillez réessayer plus tard"
        );
      }
    );
  }
}
