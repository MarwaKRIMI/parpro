import { EmailService } from "./../shared/services/email.service";
import { PreviousRouterService } from "./../shared/services/previous-router.service";
import { Component, OnInit } from "@angular/core";
import { ShareDataService } from "./../shared/services/share-data.service";
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: "fws-validation-compte-part",
  templateUrl: "./validation-compte-part.component.html",
  styleUrls: ["./validation-compte-part.component.css"]
})
export class ValidationComptePartComponent implements OnInit {
  email: string;
  constructor(
    dataService: ShareDataService,
    private previousRouterService: PreviousRouterService,
    private emailService: EmailService,
    private alertService: AlertService,
    private titleService : Title,
    private meta : Meta
  ) {
    this.email = dataService.getEmail();
  }

  ngOnInit() {
    this.meta.addTag({name:"description",content:"content='Valider votre compte particulier"})
    //title
    this.titleService.setTitle("Valider votre compte particulier| PARPRO")
    console.log(this.previousRouterService.getPreviousUrl());
  }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  } 
  active_email(email: string) {
    this.emailService.request_email(this.email).subscribe(
      res => {
        this.alertService.success(
          "Un email d'activation vous a été envoyé. Veuillez consulter votre boite de reception"
        );
      },
      error => {
        this.alertService.danger(
          "Une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }
}
