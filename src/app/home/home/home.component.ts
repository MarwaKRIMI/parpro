import { Router } from "@angular/router";

import {
  Component,
  Output,
  OnInit,
  Input,
  ViewEncapsulation,
  NgZone
} from "@angular/core";
import { Observable } from "rxjs";
import { Title, Meta } from "@angular/platform-browser";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { ActivityService } from "../../shared/services/activity.service";
import { AddressService } from "../../shared/services/address.service";
import { AlertModule, AlertService } from "ngx-alerts";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "home",
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html",
  encapsulation: ViewEncapsulation.None,
  providers: [ActivityService, AddressService]
})
export class HomeComponent implements OnInit {
  public activeLang = 'fr';
  filter = {
    name: "",
    address: "",
    activity: "",
    language: "",
    status: 2
  };
  activities = [];
  public addrKeys: string[];
  public addr: object;
  cities = [];
  submitted = false;
  loading = false;
  adresse: any;
  pays: any;
  code_postal: any;
  ville: any;
  address: string;
  activity: string;
  public loaded = false;
  public errorMessage: string;
  height = "360px";
  public imageProUrlArray = [
    "../../assets/img/pro-first-slider.png",
    "../../assets/img/pro-second-slider.png",
    "../../assets/img/pro-third-slider.png"
  ];
  public imageParticulierUrlArray = [
    "../../assets/img/particulier-first-slider.png",
    "../../assets/img/particulier-second-slider.png",
    "../../assets/img/particulier-third-slider.png"
  ];

  constructor(
    private titleService: Title,
    public authService: AuthenticationService,
    private meta: Meta,
    private activityService: ActivityService,
    private addressService: AddressService,
    private alertService: AlertService,
    private router: Router,
    private zone: NgZone,
    private translate: TranslateService
  ) {
    this.meta.addTag({
      name: "description",
      content:
        "PARPRO vous permet de déposer votre demande de travaux et de consulter les profils des professionnels proches de chez vous gratuitement en quelques clics"
    });
    this.getActivities();
    this.getCities();
    this.translate.setDefaultLang(this.activeLang);
  }
  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.adresse = addrObj.route;
      this.pays = addrObj.country;
      this.code_postal = addrObj.postal_code;
      this.ville = addrObj.locality;
      this.addrKeys = Object.keys(addrObj);
    });
  }
  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
  public ngOnInit() {
    this.titleService.setTitle("Trouver le meilleur professionnel| PARPRO");
  }
  public onSubmit() {
    this.router.navigate(["/recherche/resultats"], {
      queryParams: this.filter
    });
  }

  getActivities() {
    this.activityService.getAll().subscribe(
      res => (this.activities = res),
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
        this.loading = false;
      }
    );
  }

  getCities() {
    this.addressService.getAllCities().subscribe(
      res => (this.cities = res),
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }
}
