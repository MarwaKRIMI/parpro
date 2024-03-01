import { Component, OnInit } from "@angular/core";
import { Demand } from "../models/demand.model";
import { Router, ActivatedRoute } from "@angular/router";
import { DemandService } from "../shared/services/demand.service";
import { UserService } from "../shared/services/User.service";
import { AlertModule, AlertService } from "ngx-alerts";
import { Meta, Title } from "@angular/platform-browser";
@Component({
  selector: "fws-demand",
  templateUrl: "./demand.component.html",
  styleUrls: ["./demand.component.css"],
  providers: [DemandService, UserService]
})
export class DemandComponent implements OnInit {
  demand: Demand = new Demand();
  loading: boolean;
  isAccepted: boolean;
  full: boolean;
  status: number;
  submitted: boolean;
  lat: number = 5;
  lng: number = 3;
  recenterMap(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  marker: any[];
  constructor(
    private demandService: DemandService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private userService: UserService,
    private titleservice: Title,
    private meta: Meta
  ) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.getDemand(params["id"]);
      }
    });
  }

  ngOnInit() {}
  showAlerts(): void {
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");
  }
  getDemand(id) {
    this.demandService.getDemand(id).subscribe(
      res => {
        this.demand = res;
        this.acceptDemand;
        this.lat = this.demand.address.latitude;
        this.lng = this.demand.address.longitude;

        //title et description
        this.titleservice.setTitle(this.demand.title + "| PARPRO");
        this.meta.addTag({
          name: "description",
          content: this.demand.description
        });
        this.userService.me().subscribe(
          response => {
            this.status = response.status;
            for (var i = 0; i < this.demand.participantList.length; i++) {
              if (
                this.demand.participantList[i].professional.user.id ==
                response.user.id
              ) {
                this.isAccepted = true;
              }
            }
            if (this.demand.status == 3) {
              this.full = true;
            }
          },
          error => {
            this.alertService.danger(
              "une erreur est survenue veuillez réessayer plus tard"
            );
          }
        );
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }
  initAutocomplete() {
    var lat = parseFloat(document.getElementById("lat").nodeValue);
    var lng = parseFloat(document.getElementById("lng").nodeValue);

    var map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 13
    });
  }
  acceptDemand(idDemand) {
    this.submitted = true;
    if (this.status == 1) {
      return;
    }
    if (this.full == true) {
      return;
    }
    this.loading = true;

    this.userService.me().subscribe(
      res => {
        this.demandService.acceptDemand(idDemand, res.user.id).subscribe(
          res => {
            this.alertService.success("La demande a été bien acceptée");
            this.router.navigate(["/demandes"]);
            this.loading = false;
          },
          error => {
            this.alertService.danger(
              "Une erreur est survenue veuillez réessayer plus tard"
            );
            this.router.navigate(["/demandes"]);
            this.loading = false;
          }
        );
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
        this.router.navigate(["/demandes"]);
        this.loading = false;
      }
    );
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isClicked?: boolean;
  hovered?: boolean;
}
