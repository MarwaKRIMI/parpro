import { NgZone } from "@angular/core";
import { Site } from "./../models/site.model";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SiteService } from "../shared/services/site.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertModule, AlertService } from "ngx-alerts";
import { debounceTime } from "rxjs/operators";
import { ActivityService } from "../shared/services/activity.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";
@Component({
  selector: "app-site-web",
  templateUrl: "./site-web.component.html",
  styleUrls: ["./site-web.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [SiteService, ActivityService]
})
export class SiteWebComponent implements OnInit {
  userName: string;
  sosForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  activities = [];
  site: Site = new Site();
  public addrKeys: string[];
  public addr: object;
  code_postal: any;
  latitude: any;
  longitude: any;
  ville: any;
  adresse: any;
  constructor(
    private siteService: SiteService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private activityService: ActivityService,
    private zone: NgZone,
    private titleService: Title,
    private meta: Meta,
    private router: Router
  ) {
    this.getActivities();
    this.site.activity = "";
  }

  ngOnInit() {
    this.sosForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      zipCode: ["", Validators.required],
      city: ["", Validators.required],
      description: [""],
      activity: ['""', Validators.required],
      address: [""],
      country: [""],
      latitude: [""],
      longitude: [""]
    });
    this.titleService.setTitle("Organiser votre site professionnel| PARPRO");
    // description //
    this.meta.addTag({
      name: "description",
      content:
        "Votre entreprise et vos produits devraient être unique !. On vous offre des solutions performantes <br>pour décrocher plus de chantiers."
    });
    this.site.address.country = "France";

  }
  showAlerts(): void {
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");
  }
  onSubmit() {
    this.submitted = true;

    this.loading = true;

    this.siteService
      .post(this.site)
      .pipe(debounceTime(400))
      .subscribe(
        data => {
          this.alertService.success("Message envoyé avec succès");
          this.router.navigate(["validation-demande-site"]);
          this.site = new Site();

          this.loading = false;
        },
        error => {
          if (error === "The specified user already exist") {
            this.alertService.danger("Cet utilisateur existe déjà");
            this.loading = false;
          } else {
            this.alertService.danger(
              "une erreur est survenue veuillez réessayer plus tard"
            );
            this.loading = false;
          }
        }
      );
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

  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.code_postal = addrObj.postal_code;
      this.ville = addrObj.locality;
      this.addrKeys = Object.keys(addrObj);
      this.latitude = addrObj.lat;
   
      this.site.address.address = addrObj.route;

      this.longitude = addrObj.lng;
      this.site.address.latitude = addrObj.lat;
      this.site.address.longitude = addrObj.lng;
      this.site.address.city = addrObj.locality;
      this.site.address.zipCode = addrObj.postal_code;
    });
  }
}
