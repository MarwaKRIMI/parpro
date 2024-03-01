import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { first } from "rxjs/operators";
import { UserService } from "../shared/services/User.service";
import { ProfessionalService } from "../shared/services/professional.service";
import { AlertService } from "../shared/services/alert.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "fws-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
  providers: [UserService, ProfessionalService],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private proService: ProfessionalService,
    private alertService: AlertService
  ) {
    //this.getPaymentData();
  }
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
    this.getPaymentData();
  }

  getPaymentData() {
    this.userService.me().subscribe(
      res => {
        this.proService.postPayment(res.user.id, 66.44).subscribe(
          res => {
            this.paymentData = res;
          },
          error => {
            this.alertService.error(
              "Une erreur est survenue veuillez réessayer plus tard"
            );
          }
        );
      },
      error => {
        this.alertService.error(
          "Une erreur est survenue lors de la récupération du profil veuillez réessayer plus tard"
        );
      }
    );
  }

  // onSubmit() {
  //   console.log("passed heeere")
  //   console.log(this.paymentData.serveurOK);
  //   return this.http.post("https://tpeweb1.paybox.com/cgi/MYchoix_pagepaiement.cgi", {
  //     PBX_SITE: this.paymentData.PBX_SITE,
  //     PBX_RANG: this.paymentData.PBX_RANG,
  //     PBX_IDENTIFIANT: this.paymentData.PBX_IDENTIFIANT,
  //     PBX_TOTAL: this.paymentData.PBX_TOTAL,
  //     PBX_DEVISE: this.paymentData.PBX_DEVISE,
  //     PBX_CMD: this.paymentData.PBX_CMD,
  //     PBX_PORTEUR: this.paymentData.PBX_PORTEUR,
  //     PBX_RETOUR: this.paymentData.PBX_RETOUR,
  //     PBX_HASH: this.paymentData.PBX_HASH,
  //     PBX_TIME: this.paymentData.PBX_TIME,
  //     PBX_HMAC: this.paymentData.PBX_HMAC
  //   }).subscribe(
  //     data => console.log("data", data),
  //     error => console.log(error)
  //   )
  //   }
}
