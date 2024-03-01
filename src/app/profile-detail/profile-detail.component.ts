import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ProfessionalService } from "../shared/services/professional.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { FilterDemand } from "../models/demand-filter.model";
import { Demand } from "../models/demand.model";
import { UserService } from "../shared/services/User.service";
import { first } from "rxjs/operators";
import { Professional } from "../models/professional.model";
import { User } from "../models/user.model";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { directive } from "babel-types";
import { AlertModule, AlertService } from "ngx-alerts";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "fws-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [ProfessionalService, UserService]
})
export class ProfileDetailComponent implements OnInit {
  loading = false;
  submitted = false;
  isSiretExist = false;
  // me:User = new User();
  professional: Professional = new Professional();
  me: Professional;
  services: any[] = [];
  shiftSchedule: any;
  weekEnds: any;
  slug: any;
  images = [0, 1, 2, 3, 4];
  imageSrc: any[] = [];
  modeEdit: boolean = false;
  isCollapsedKbis: boolean = true;
  isCollapsedInsurance: boolean = true;
  isCollapsedGuarantee: boolean = true;
  fileUrl: string;
  fileToUpload: File = null;
  existInsurance: boolean;
  existKbis: boolean;
  existGuarantee: boolean;
  oldKbis: any;
  oldInsurance: any;
  oldGuarantee: any;
  form: FormGroup;
  viewKbis: any;
  constructor(
    private alertService: AlertService,
    private profService: ProfessionalService,
    private professionalService: ProfessionalService,
    private userService: UserService,
    private authService: AuthenticationService,
    private sanitization: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private titleservice: Title,
    private meta: Meta,
  ) {
    this.getProfile();
    this.getProfessional;
    var user2 = this.professional;
    this.route.params.subscribe(params => {
      if (params["slug"]) {
        this.getProfessional(params["slug"]);
      }
    });
  }
  viewFile(event: Event, field: any) {
    event.stopPropagation();
    event.preventDefault();
    if (field == "kbis") {
      window.open(this.oldKbis.webPath);
    } else if (field == "insurance") {
      window.open(this.oldInsurance.webPath);
    } else if (field == "guarantee") {
      window.open(this.oldGuarantee.webPath);
    }
  }
  toggleCollapse(field: any) {
    this.loading = false;
    this.submitted = false;
    if (field == "kbis") {
      this.isCollapsedKbis = !this.isCollapsedKbis;
    } else if (field == "insurance") {
      this.isCollapsedInsurance = !this.isCollapsedInsurance;
    } else if (field == "guarantee") {
      this.isCollapsedGuarantee = !this.isCollapsedGuarantee;
    }
  }
  showAlerts(): void {
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");
  }
  ngOnInit() {
    this.meta.addTag({name:"description", content:"Vous pouvez modifier vos informations sur votre métier, telles que vos services et vos réalisations."})
    this.titleservice.setTitle("Modifiez vos informations personnelles| PARPRO ")
    var user = this.professional;
    this.route.params.subscribe(params => {
      if (params["slug"]) {
        this.getProfessional(params["slug"]);
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.form = new FormGroup({
      kbisDoc: new FormControl("", {
        updateOn: "submit"
      })
    });
    if (this.authService.getUserRole() == "Professional") {
      delete this.professional.user;
      delete this.professional.realizations;
      delete this.professional.activity;
      if (this.professional.slug) {
        delete this.professional.slug;
      }
      this.professional.services = [];
      for (var i = 0; i < this.services.length; i++) {
        this.professional.services.push(this.services[i].value);
      }
      if (this.professional.since) {
        this.professional.since = this.professional.since.toString();
      }
      if (this.professional.kbisDoc && this.professional.kbisDoc.webPath) {
        delete this.professional.kbisDoc;
      }
      if (
        this.professional.insuranceDoc &&
        this.professional.insuranceDoc.webPath
      ) {
        delete this.professional.insuranceDoc;
      }
      if (
        this.professional.guaranteeDoc &&
        this.professional.guaranteeDoc.webPath
      ) {
        delete this.professional.guaranteeDoc;
      }
      if (!this.professional.experiences) {
        delete this.professional.experiences;
      }
      if(this.professional.startedSince) {
        delete this.professional.startedSince;
      }

      this.profService
        .update(this.professional, this.authService.GetUserId())
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Mise à jour avec succès");
            if (data.siret) {
              this.isSiretExist = true;
            }
            this.getProfile();
            this.isCollapsedKbis = true;
            this.isCollapsedInsurance = true;
            this.isCollapsedGuarantee = true;

            window.scroll(0, 0);
            this.loading = false;
          },
          error => {
            this.alertService.danger(
              "une erreur est survenue veuillez réessayer plus tard"
            );
            window.scroll(0, 0);
            this.loading = false;
          }
        );
    }
  }

  getProfile() {
    this.userService.me().subscribe(
      res => {
        let dateDay =
          new Date(res.since).getDate() < 10
            ? "0" + new Date(res.since).getDate()
            : new Date(res.since).getDate();
        let dateMonth =
          new Date(res.since).getMonth() + 1 < 10
            ? "0" + (new Date(res.since).getMonth() + 1)
            : new Date(res.since).getMonth() + 1;
        let dateDayPartenaire =
          new Date(res.startedSince).getDate() < 10
            ? "0" + new Date(res.startedSince).getDate()
            : new Date(res.startedSince).getDate();
        let dateMonthPartenaire =
          new Date(res.startedSince).getMonth() + 1 < 10
            ? "0" + (new Date(res.startedSince).getMonth() + 1)
            : new Date(res.startedSince).getMonth() + 1;
        this.professional.services = res.services;
        this.professional.experiences = res.experiences;
        this.professional.denomination = res.denomination;
        this.professional.insurance = res.insurance;
        this.professional.effective = res.effective;
        this.professional.legalForm = res.legalForm;
        this.professional.leader = res.leader;
        this.professional.user = res.user;
        this.professional.siret = res.siret;
        if (this.professional.siret) {
          this.isSiretExist = true;
        }
        this.professional.insuranceDoc = res.insuranceDoc;
        this.professional.guaranteeDoc = res.guaranteeDoc;
        this.professional.kbisDoc = res.kbisDoc;
        if (!this.professional.insuranceDoc) {
          this.existInsurance = false;
        } else {
          this.existInsurance = true;
        }
        if (!this.professional.kbisDoc) {
          this.existKbis = false;
        } else {
          this.existKbis = true;
        }
        if (!this.professional.guaranteeDoc) {
          this.existGuarantee = false;
        } else {
          this.existGuarantee = true;
        }
        this.oldKbis = this.professional.kbisDoc;
        this.oldInsurance = this.professional.insuranceDoc;
        this.oldGuarantee = this.professional.guaranteeDoc;
        this.slug = res.slug;
        this.professional.realizations = res.realizations;
        if (res.since) {
          this.professional.since =
            new Date(res.since).getFullYear() + "-" + dateMonth + "-" + dateDay;
        }
        if (res.startedSince) {
          this.professional.startedSince =
            new Date(res.startedSince).getFullYear() +
            "-" +
            dateMonthPartenaire +
            "-" +
            dateDayPartenaire;
        }

        this.imageSrc = [];
        this.professional.realizations.forEach(element => {
          this.imageSrc.push(element.webPath);
        });
        if (
          this.professional.services.length == 0 ||
          this.professional.services[0] == null
        ) {
          this.services = [
            {
              values: ""
            }
          ];
        } else {
          this.services = [];
          for (let i = 0; i < this.professional.services.length; i++) {
            this.services.push({
              value: this.professional.services[i]
            });
          }
        }
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }
  getProfessional(slug) {
    this.professionalService.getSecureProfessional(slug).subscribe(
      res => {
        this.professional.kbisDoc = res.kbisDoc;
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }

  addPhoto() {
    let i = this.images.length;
    this.images.push(i + 1);
  }
  //  addDocument() {
  //     this.documents.push({ value: "" });
  //   }
  add() {
    this.services.push({ value: "" });
  }

  delete(index) {
    this.services.splice(index, 1);
  }

  readURL(event: any, index): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((file: any) => {
        return (e: Event) => {
          //use "e" or "file"
          let existImage = this.professional.realizations.find(
            i => i.webPath === this.imageSrc[index]
          );
          if (existImage) {
            this.professionalService
              .deleteImage(existImage.id, this.professional.user.id.toString())
              .subscribe(res => console.log("image delete success"));
          }
          this.professionalService
            .addImage(
              reader.result.toString(),
              this.professional.user.id.toString()
            )
            .subscribe(res => {
              this.imageSrc = [];
              this.professional.realizations = res.realizations;
              this.professional.realizations.forEach(element => {
                this.imageSrc.push(element.webPath);
              });
            });
        };
      })(file);

      reader.readAsDataURL(file);
    }
  }

  deleteImage(imgsrc) {
    for (let i = 0; i < this.professional.realizations.length; i++) {
      if (this.professional.realizations[i].webPath === imgsrc) {
        this.professionalService
          .deleteImage(
            this.professional.realizations[i].id,
            this.professional.user.id.toString()
          )
          .subscribe(res => {
            this.imageSrc = [];
            this.professional.realizations = res.realizations;
            res.realizations.forEach(element => {
              this.imageSrc.push(element.webPath);
            });
          });
      }
    }
  }

  makeTrustedImage(item) {
    const imageString = JSON.stringify(item).replace(/\\n/g, "");
    const style = "url(" + imageString + ")";
    return this.sanitization.bypassSecurityTrustStyle(style);
  }

  url: string;
  handleFileInput(event: any, field: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        if (field == "kbisDoc") {
          this.professional.kbisDoc = this.url;
        } else if (field == "insuranceDoc") {
          this.professional.insuranceDoc = this.url;
        } else if (field == "guaranteeDoc") {
          this.professional.guaranteeDoc = this.url;
        }
      };
    }
  }
}
