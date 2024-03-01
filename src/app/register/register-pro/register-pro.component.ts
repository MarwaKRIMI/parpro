import { Component, OnInit, NgZone } from "@angular/core";
import { UserService } from "../../shared/services/User.service";
import { Professional } from "../../models/professional.model";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { Language } from "../../models/language.model";
import { HelpersService } from "../../shared/services/helpers.service";
import { ActivityService } from "../../shared/services/activity.service";
import { environment } from "../../../environments/environment";
import { Demand } from "../../models/demand.model";
import { DemandService } from "../../shared/services/demand.service";
import { FilterDemand } from "../../models/demand-filter.model";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/internal/operators";
import { AppState } from "../../app.service";
import { ShareDataService } from "../../shared/services/share-data.service";
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
import { PreviousRouterService } from "./../../shared/services/previous-router.service";

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
  selector: "fws-register-pro",
  templateUrl: "./register-pro.component.html",
  styleUrls: ["./register-pro.component.css"],
  providers: [UserService, ActivityService, DemandService, HelpersService]
})
export class RegisterProComponent {
  searchTerm: FormControl = new FormControl();
  searchResult = [];
  loading = false;
  submitted = false;
  secPasswordText = "";
  pro: Professional = new Professional();
  langs: Language[] = [];
  activities = [];
  indexes = [];
  country: ["France"];
  rightUrl: boolean = false;
  countries = environment.countriesList;
  demands: Demand[];
  subscription: Subscription;
  intervalId: number;
  index: number = 0;
  allComments = [
    {
      name: "Samia L",
      city: "06410 BIOT",
      description:
        "Recherche un professionnel pour la pose de linoléum dans un appartement pour 5 pièces."
    },
    {
      name: "Vincent A",
      city: "04420 DIGNE-LES-BAINS",
      description:
        "je souhaite aménager 2 chambres dans un sous-sol semi enterré avec fenêtres."
    },
    {
      name: "Sandrine P",
      city: "06600 ANTIBES",
      description:
        "Installation d'un système d'alarme sur une villa sans télésurveillance."
    },
    {
      name: "Daniel Q",
      city: "05400 OZE",
      description: "Je souhaite rénover l'intérieure de ma maison."
    },
    {
      name: "Pascale K",
      city: "06400 CANNES",
      description:
        "Nous souhaitons repeindre trois chambres de 11 m² et un salon de 47 m²."
    },
    {
      name: "Pauline O",
      city: "06000 NICE",
      description:
        "Réaliser une chape béton pour la terrasse autour de la piscine qui fati 55 m² tout compris."
    },
    {
      name: "Pierre J",
      city: "83220 LE PRADET",
      description: "retrait des parquets existants et pose carrelages."
    },
    {
      name: "Maurice G",
      city: "06130 GRASSE",
      description:
        "contrat à l’année, Intervention pour la tonte de pelouse et l'entretien de notre terrain 3300 m²,, taille d'une petite haie 5 m de long et 0,70 m de haut ."
    },
    {
      name: "Olivier F",
      city: "07100 ANNONAY",
      description: "Je souhaite avoir un devis pour tuber une cheminée."
    },
    {
      name: "Julie T",
      city: "06360 EZE",
      description:
        "on souhaite installer un système de chauffage au sol avec combinaison de pompe à chaleur et chauffage électrique pour une maison de 230 m²"
    },
    {
      name: "Ute R",
      city: "08500 REVIN",
      description: "JJe souhaite rénover l'intérieure de ma maison."
    },
    {
      name: "Emilie G",
      city: "09100 PAMIERS",
      description:
        "Je souhaite traiter les remontées capillaires sur les murs intérieurs et extérieurs de ma maison."
    },
    {
      name: "Shirley P",
      city: "83260 LA CRAU",
      description:
        "je souhaite construire une maison avec 2 chambres, un salon et une cuisine."
    },
    {
      name: "Samir D",
      city: "10420 TROYES",
      description: "Réaliser le traitement de la charpente en bois."
    },
    {
      name: "Danièle Y",
      city: "06620 GOURDON",
      description:
        "Effectuer le remplacement d'une dizaine de volets en bois avec des dimensions différentes."
    },
    {
      name: "Javier X",
      city: "11000 NARBONNE",
      description:
        "Je souhaite faire la dératisation dans une maison de 130 m²."
    },
    {
      name: "Jérémy Q",
      city: "83550 VIDAUBAN",
      description:
        "Rafraichissement d'un appartement de 135 m² (peinture murs et plafonds)."
    },
    {
      name: "YAZAN Z",
      city: "12000 RODEZ",
      description:
        "Je souhaite réaliser un DPE de ma maison qui date de 1967 avant la mise en vente."
    },
    {
      name: "Loïc Z",
      city: "06110 LE CANNET",
      description:
        "Réaliser l'installation de la domotique complète pour ma maison: alarmes et télésurveillance."
    },
    {
      name: "Hayet T",
      city: "13009 MARSEILLE",
      description:
        "Nous souhaitons changer le compteur pour le mettre aux normes dans une maison individuelle"
    },
    {
      name: "Patricia L",
      city: "13012 MARSEILLE",
      description: "Pose d'une chape avant le sol en pvc sur une terrasse."
    },
    {
      name: "Florence C",
      city: "13100 AIX-EN-PROVENCE",
      description:
        "Je souhaite enlever un escalier en béton pour le remplacer par un escalier en bois."
    },
    {
      name: "Béatrice A",
      city: "14000 CAEN",
      description: "Je souhaite installer une douche à l'italienne."
    },
    {
      name: "Isabelle G",
      city: "83600 FREJUS",
      description:
        "Changement des serrures pour le blindage des portes de mon appartement."
    },
    {
      name: "Pierre D",
      city: "15140 SALERS",
      description: "je souhaite élaguer 16 arbres et enlever les déchets verts."
    },
    {
      name: "André U",
      city: "06250 MOUGINS",
      description: "je souhaite motoriser les volets existant."
    },
    {
      name: "Onorius G",
      city: "16200 JARNAC",
      description: "Réaliser la fourniture et la pose d'un portillon."
    },
    {
      name: "George H",
      city: "83700 SAINT-RAPHAEL",
      description: "Réaliser une isolation de toiture par la pose d'une bâche."
    },
    {
      name: "Tim F",
      city: "17100 SAINTES",
      description: "Nous souhaitons faire une cuisine équipée en bois."
    },
    {
      name: "Eden Y",
      city: "06650 OPIO",
      description:
        "Effectuer la pose de parquet flottant pour tout l'étage d'une maison individuelle."
    },
    {
      name: "Kevin H",
      city: "18000 BOURGES",
      description:
        "effectuer la rénovation de plusieurs fenêtres en PVC pour une maison."
    },
    {
      name: "Aileen K",
      city: "19000 TULLE",
      description: "nous souhaitons faire un balcon ferronnier."
    },
    {
      name: "Elodie S",
      city: "06580 PEGOMAS",
      description:
        "réaliser l'installation en plomberie pour un logement de 71 m²."
    },
    {
      name: "Nadim O",
      city: "21000",
      description: "remise en place de borne d'un terrain."
    },
    {
      name: "Jean Michel P",
      city: "06260 PIGAUD",
      description: "Pose de margelle sur une piscine de 28 m²."
    },
    {
      name: "Lina F",
      city: "222000 GUINGAMP",
      description:
        "Réaliser le ravalement de façade complet d'une maison  de 2 étages."
    },
    {
      name: "Samia D",
      city: "06420 ROURE",
      description: "Refaire la peinture du plafond dans toutes les pièces."
    },
    {
      name: "Antoine Z",
      city: "83870 SIGNES",
      description: "Créer une ouverture entre la cuisine et le salon."
    },
    {
      name: "Sylvie T",
      city: "23400 BOURGANEUF",
      description: "installer des panneaux photovoltaiques sur un toit ."
    },
    {
      name: "Delphine Y",
      city: "06910 SIGALE",
      description:
        "Je souhaite la pose d'une clôture rigide sur un muret d’une longueur de 37 m."
    },
    {
      name: "Benoit S",
      city: "06430 TENDE",
      description: "Installation d'une pompe à chaleur pour une maison."
    },
    {
      name: "Helmut",
      city: "83920 LA MOTTE",
      description:
        "isoler l'intérieur d'une maison de 110 m² avec de la laine de verre et du placo"
    },
    {
      name: "Albert C",
      city: "26000 VALENCE",
      description: "Installer des bornes pour délimiter un terrain de 980 m²"
    },
    {
      name: " Mirabelle I",
      city: "06140 VENCE",
      description:
        "Pose de revêtement béton ciré teinte gris clair d'un sol intérieur"
    },
    {
      name: "Florentin H",
      city: "27000 EVEREUX",
      description: "faire une douche pour handicapé."
    },
    {
      name: "Odette T",
      city: "29820 BREST",
      description: "Rénover une véranda de plus de 18 ans."
    },
    {
      name: "Mauriel N",
      city: "06000 NICE",
      description:
        "Je souhaite coller un carrelage effet béton par-dessus le carrelage existant"
    },
    {
      name: "Fréderic L",
      city: "28000 CHARTRES",
      description: "Transformer une fenêtre en baie vitrée."
    },
    {
      name: "Gerald S",
      city: "06400 CANNES",
      description: "Rénover complètement une maison de 1973."
    },
    {
      name: "Céline M",
      city: "06130 GRASSE",
      description:
        "Je souhaite refaire la peinture du carrelage et du parquet flottant dans 3 pièces."
    },
    {
      name: "Philippe O",
      city: "30000 NIMES",
      description:
        "Faire abattre quelques arbres sur mon terrain+ entretien de jardin."
    },
    {
      name: "Karima M",
      city: "83990 SAINT-TROPEZ",
      description:
        "nous recherchons un professionnel pour réaliser une étude de sol pour faire la construction d'un bâtiment."
    },
    {
      name: "Benjamin G",
      city: "31000 TOULOUSE",
      description: "Refaire le plafond en placo dans 4 pièces."
    },
    {
      name: "Paul K",
      city: "31440 BOUTX",
      description: "je souhaite faire une terrasse en bêton de 60 m²."
    },
    {
      name: "Helene M",
      city: "32013 AUCH",
      description:
        "Je souhaite réaliser la motorisation de mes volets roulants."
    },
    {
      name: "Hector  V",
      city: "06270 VILLENEUVE LOUBET",
      description: "Faire construire une petite maison de 70 m²."
    }
  ];
  adresse: any;
  pays: any;
  code_postal: any;
  ville: any;
  lng: any;
  lat: any;
  public addrKeys: string[];
  public addr: object;

  comments = [];
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private demandService: DemandService,
    private router: Router,
    private helpersService: HelpersService,
    private alertService: AlertService,
    private appState: AppState,
    private dataService: ShareDataService,
    private previousRouterService: PreviousRouterService,
    private titleService: Title,
    private meta: Meta,
    private zone: NgZone
  ) {
    if (this.previousRouterService.getPreviousUrl() == "/validation-pro") {
      this.rightUrl = true;
      if (this.dataService.getPro()) {
        this.pro = this.dataService.getPro();
      }
    }
    this.getActivities();
    this.getLangs();
    //this.getDemandes();
    this.searchTerm.valueChanges.pipe(debounceTime(400)).subscribe(data => {
      this.appState.search_word(data).subscribe(response => {
        this.searchResult = response;
      });
    });
  }

  ngOnInit() {
    this.pro.user.address.country = "France";
    this.titleService.setTitle(
      "Ecrire l'histoire de votre succès maintenant et trouvez des demandes de chantiers| PARPRO"
    );
    // description //
    this.meta.addTag({
      name: "description",
      content:
        "Inscrivez-vous gratuitement, consultez et répondez à autant de chantiers disponibles que vous souhaitez, augmentez votre visibilité sur Internet et valorisez votre entreprise et la gestion de vos clientèles. "
    });
    for (let i = 0; i < 5; i++) {
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
  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.adresse = addrObj.route;
      this.pays = addrObj.country;
      this.pro.user.address.country = addrObj.country;
      this.pro.user.address.city = addrObj.locality;
      this.pro.user.address.zipCode = addrObj.postal_code;
      this.pro.user.address.latitude = addrObj.lat;
      this.pro.user.address.longitude = addrObj.lng;
      this.code_postal = addrObj.postal_code;
      this.lat = addrObj.lat;
      this.lng = addrObj.lng;
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
    this.submitted = false;
    if (
      this.pro.user.plainPassword.first != this.pro.user.plainPassword.second
    ) {
      this.loading = false;
      return;
    }
    this.loading = true;
    this.dataService.setEmail(this.pro.user.email);
    this.dataService.setPro(this.pro);

    this.userService
      .registerProfessional(this.pro)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Inscription avec succès");
          this.router.navigate(["validation-pro"]);
        },
        error => {
          console.log(error);
          if (error === "The specified user already exist") {
            this.alertService.danger("Cet utilisateur existe déjà");
            this.loading = false;
          } else {
            this.alertService.danger(
              "Une erreur est survenue veuillez réessayer plus tard"
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
  getLangs() {
    this.helpersService.getLanguages().subscribe(
      res => {
        this.langs = res;
        for (let i = 0; i < res.length; i++) {
          if (res[i].code == "FR") {
            this.pro.user.languages = [res[i].id];
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

  getDemandes() {
    let filter = new FilterDemand();
    filter.limit = 3;
    this.demandService.getDemands(filter).subscribe(
      res => (this.demands = res),
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
        this.loading = false;
      }
    );
  }
}
