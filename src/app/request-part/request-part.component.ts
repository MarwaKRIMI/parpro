import { PreviousRouterService } from "./../shared/services/previous-router.service";
import { Component, OnInit, ViewEncapsulation, NgZone } from "@angular/core";
import { environment } from "./../../environments/environment";
import { Demand } from "../models/demand.model";
import { ActivityService } from "../shared/services/activity.service";
import { DomSanitizer } from "@angular/platform-browser";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { DemandService } from "../shared/services/demand.service";
import { HelpersService } from "../shared/services/helpers.service";
import { Language } from "../models/language.model";
import { debounceTime } from "rxjs/internal/operators";
import { UserService } from "../shared/services/User.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { ParticularFirstRequest } from "../models/particularFirstRequest.model";
import { Password, User } from "../models/user.model";
import { ShareDataService } from "../shared/services/share-data.service";
import { interval, Subscription } from "rxjs";
import { AlertModule, AlertService } from "ngx-alerts";
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";

import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
  state
} from "@angular/animations";
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { anyTypeAnnotation } from "babel-types";

@Component({
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),

        query(
          ":enter",
          stagger("400ms", [
            animate(
              "1s ease-in",
              keyframes([
                style({
                  opacity: 0,
                  transform: "translateX(-100%)",
                  offset: 0
                }),
                style({
                  opacity: 1,
                  transform: "translateX(15px)",
                  offset: 0.3
                }),
                style({ opacity: 1, transform: "translateX(0)", offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ],
  selector: "fws-request-part",
  templateUrl: "./request-part.component.html",
  styleUrls: ["./request-part.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [ActivityService, DemandService, HelpersService]
})
export class RequestPartComponent implements OnInit {
  countries = environment.countriesList;
  demand: Demand = new Demand();
  owner: User = new User();
  activities = [];
  images = [0, 1, 2];
  imageSrc: any[] = [];
  submitted = false;
  loading = false;
  indexes = [];
  comments = [];
  langs: Language[] = [];
  country: ["France"];
  modeEdit: boolean = false;
  password: Password = new Password();
  selectedLang: any = null;
  subscription: Subscription;
  intervalId: number;
  index: number = 0;
  j: number;
  adresse: any;
  pays: any;
  code_postal: any;
  ville: any;
  lat: any;
  lng: any;
  public addrKeys: string[];
  public addr: object;
  allComments = [
    {
      description:
        "Demande passée… après deux jours huit offres. C'est à peine plus rapide et moins compliqué."
    },
    {
      description: "J'ai trouvé tous les artisans dont j'avais besoin ici."
    },
    {
      description:
        "Du début de la description du poste à l'exécution, tout a parfaitement fonctionné."
    },
    {
      description:
        "Fonctionnement rapide et simple, offres rapides et très bien exécutées par l'artisan."
    },
    {
      description:
        "Tout a parfaitement fonctionné. Offre juste, travail compétent, fiable, impeccable."
    },
    {
      description:
        "Je me suis inscrit pour la première fois le lundi et samedi, la commande avait déjà été traitée."
    },
    {
      description:
        "Jusqu'à présent, toutes nos demandes ont été effectuées de manière très satisfaisante."
    },
    {
      description: "Super plate-forme, transaction rapide, super artisan."
    },
    {
      description:
        "Opération rapide et simple, offres rapides et très bien exécutées par l'artisan."
    },
    {
      description:
        "Nous sommes ravis, le rendez-vous a été réalisé à court terme et mis en œuvre professionnellement."
    }
  ];
  rightUrl: boolean = false;

  constructor(
    private sanitization: DomSanitizer,
    private activityService: ActivityService,
    private alertService: AlertService,
    private demandService: DemandService,
    private router: Router,
    private route: ActivatedRoute,
    private helpersService: HelpersService,
    private authService: AuthenticationService,
    private dataService: ShareDataService,
    private previousRouterService: PreviousRouterService,
    private titleService: Title,
    private meta: Meta,
    private zone: NgZone
  ) {
    this.owner.civility = 1;
    if (this.previousRouterService.getPreviousUrl() == "/validation-part") {
      this.rightUrl = true;
      if (
        this.dataService.getDemand() &&
        this.dataService.getUser() &&
        this.dataService.getLang() &&
        this.dataService.getPassword()
      ) {
        this.demand = this.dataService.getDemand();
        this.owner = this.dataService.getUser();
        this.selectedLang = this.dataService.getLang();
        this.password = this.dataService.getPassword();
      }
    }
    this.getActivities();
    this.getLangs();
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.getDemand(params["id"]);
        this.modeEdit = true;
      }
    });
  }
  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.adresse = addrObj.route;
      this.pays = addrObj.country;
      this.demand.address.country = addrObj.country;
      this.demand.address.city = addrObj.locality;
      this.demand.address.zipCode = addrObj.postal_code;
      this.code_postal = addrObj.postal_code;
      this.lat = addrObj.lat;
      this.demand.address.latitude = addrObj.lat;
      this.lng = addrObj.lng;
      this.demand.address.longitude = addrObj.lng;
      this.ville = addrObj.locality;
      this.addrKeys = Object.keys(addrObj);
    });
  }
  showAlerts(): void {
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");
  }
  ngOnInit() {
    this.demand.address.country = "France";
    if (this.getRole() == "Professional" || !this.isLogged()) {
      //description
      this.meta.addTag({
        name: "description",
        content:
          "inscrivez-vous maintenant et postez vos annonces gratuitement, déposez  votre annonce et être contacté par un artisan"
      });
      //title
      this.titleService.setTitle(
        "Inscrivez-vous comme un particulier et trouvez les meilleurs artisans| PARPRO"
      );
    } else if (this.getRole() == "Particular" && !this.modeEdit) {
      //description
      this.meta.addTag({
        name: "description",
        content: "Déposer votre demande| PARPRO"
      });
      //title
      this.titleService.setTitle("Déposer votre demande| PARPRO");
    } else if (this.getRole() == "Particular" && this.modeEdit) {
      //description
      this.meta.addTag({
        name: "description",
        content: "Modifier votre demande"
      });
      //title
      this.titleService.setTitle("Modifier votre demande| PARPRO");
    }

    for (let i = 0; i < 3; i++) {
      let index;
      index = this.randomIntFromInterval(0, this.allComments.length - 1);
      if (this.indexes.indexOf(index) == -1) {
        this.indexes.push(index);
        this.comments.push(this.allComments[index]);
      } else {
        i = i - 1;
      }
    }
    let numberOfSeconds = this.randomIntFromInterval(20000, 60000);
    const source = interval(numberOfSeconds);
    this.subscription = source.subscribe(val => this.opensnack());
  }
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  opensnack() {
    let index;
    if (this.comments.length < this.allComments.length - 10) {
      index = this.randomIntFromInterval(0, this.allComments.length - 1);
      if (this.indexes.indexOf(index) == -1) {
        this.indexes.push(index);
        this.comments.unshift(this.allComments[index]);
      } else {
        this.opensnack();
      }
    } else if (
      this.comments.length < this.allComments.length &&
      this.comments.length >= this.allComments.length - 10
    ) {
      for (let i = 0; i < this.allComments.length; i++) {
        if (this.indexes.indexOf(i) == -1) {
          this.indexes.push(i);
          this.comments.unshift(this.allComments[i]);
          break;
        }
      }
    }
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.demand.images = this.imageSrc;
    this.dataService.setEmail(this.owner.email);
    this.dataService.setDemand(this.demand);
    this.dataService.setUser(this.owner);
    this.dataService.setPassword(this.password);
    this.dataService.setLang(this.selectedLang);

    if (!this.isLogged()) {
      let firstDemande = new ParticularFirstRequest();
      firstDemande.owner.email = this.owner.email;
      firstDemande.owner.firstName = this.owner.firstName;
      firstDemande.owner.lastName = this.owner.lastName;
      firstDemande.owner.phone = this.owner.phone;
      firstDemande.owner.address = this.demand.address;
      firstDemande.owner.plainPassword = this.password;
      firstDemande.owner.languages = this.selectedLang;
      firstDemande.address = this.demand.address;
      firstDemande.description = this.demand.description;
      firstDemande.images = this.demand.images;
      firstDemande.activity = this.demand.activity;
      firstDemande.title = this.demand.title;
      firstDemande.owner.civility = this.owner.civility;

      this.demandService
        .createFirstDemande(firstDemande)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Demande enregistrée avec succès");
            this.router.navigate(["validation-part"]);
          },
          error => {
            this.alertService.danger(
              "Compte existe déjà. Merci de se connecter et ajouter votre demande"
            );
            this.loading = false;
          }
        );
    } else if (this.modeEdit) {
      this.demandService
        .editDemande(this.demand)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Demande modifiée avec succès");
            this.router.navigate(["profil-part"]);
          },
          error => {
            this.alertService.danger(
              "Une erreur est survenue veuillez réessayer plus tard"
            );
            this.loading = false;
          }
        );
    } else {
      this.demandService
        .createDemande(this.demand)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Demande enregistrée avec succès");
            this.router.navigate(["profil-part"]);
          },
          error => {
            this.alertService.danger(
              "une erreur est survenue veuillez réessayer plus tard"
            );
            this.loading = false;
          }
        );
    }
  }

  getActivities() {
    this.activityService.getAll().subscribe(
      res => (this.activities = res),
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }

  getLangs() {
    this.helpersService.getLanguages().subscribe(
      res => {
        this.langs = res;
        for (let i = 0; i < res.length; i++) {
          if (res[i].code == "FR") {
            this.selectedLang = [res[i].id];
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

  getDemand(id) {
    this.demandService.getDemand(id).subscribe(
      res => {
        this.demand = res;
        //selectedLang = res.lang.id;
        this.demand.activity = res.activity.id;
        this.demand.images.forEach(element => {
          this.imageSrc.push(element.webPath);
        });
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }

  readURL(event: any, index): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      if (this.modeEdit) {
        reader.onload = ((file: any) => {
          return (e: Event) => {
            //use "e" or "file"
            let existImage = this.demand.images.find(
              i => i.webPath === this.imageSrc[index]
            );

            if (existImage) {
              this.demandService
                .deleteImage(existImage.id, this.demand.id)
                .subscribe(res => console.log("image delete success"));
            }
            this.demandService
              .addImage(reader.result.toString(), this.demand.id)
              .subscribe(res => (this.imageSrc[index] = res.images[0].webPath));
          };
        })(file);
      } else {
        reader.onload = e => (this.imageSrc[index] = reader.result);
      }

      reader.readAsDataURL(file);
    }
  }
  addPhoto() {
    let i = this.images.length;
    this.images.push(i + 1);
  }

  makeTrustedImage(item) {
    const imageString = JSON.stringify(item).replace(/\\n/g, "");
    const style = "url(" + imageString + ")";
    return this.sanitization.bypassSecurityTrustStyle(style);
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }

  getRole() {
    return this.authService.getUserRole();
  }
}
