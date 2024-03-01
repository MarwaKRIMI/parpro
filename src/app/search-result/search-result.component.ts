import { User } from "./../models/user.model";
import { Address } from "./../models/address.model";
import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ActivityService } from "../shared/services/activity.service";
import { ProfessionalService } from "../shared/services/professional.service";
import { AddressService } from "../shared/services/address.service";
import { Subscription } from "rxjs";
import { AlertModule, AlertService } from "ngx-alerts";
import { Title, Meta } from "@angular/platform-browser";
import { Professional } from "../models/professional.model";
import { Activity } from "../models/activity.model";
import { AuthenticationService } from "../shared/services/authentication.service";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";

@Component({
  selector: "fws-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"],

  providers: [ActivityService, ProfessionalService, AddressService]
})
//@Output() mouseOut: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
export class SearchResultComponent implements OnInit {
  activities = [];
  id: any;
  cities = [];
  address: string;
  activity: string;
  prof: Professional[];
  searchResult = [];
  filterSubscription: Subscription;
  loading = false;
  isConnected: boolean = false;
  ok:boolean = false
  code_postal: any;
  public addrKeys: string[];
  public addr: object;
  zoom: number;
  labelOptions = {
    color: "white",
    fontFamily: "",
    fontSize: "14px",
    fontWeight: "bold",
    background: "yellow"
  };
  // initial center position for the map
  center: { lat: 45.864716; lng: 3.349014 };

  lat: number = 45.864716;
  lng: number = 3.349014;
  mylat: any;
  mylng: any;
  distance;
  marker: any[];
  isClicked: boolean = false;

  constructor(
    private activityService: ActivityService,
    private professionalService: ProfessionalService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private addressService: AddressService,
    private titleService: Title,
    private meta: Meta,
    private zone: NgZone
  ) {
    this.getActivities();
    this.getCities();
    this.isConnected = this.authService.isLoggedIn();
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.mylng = +pos.coords.longitude;
        this.mylat = +pos.coords.latitude;
      });
    }
  }
  clickedMarker(m: marker, i: number) {
    for (let i = 0; i < this.searchResult.length; i++) {
      this.searchResult[i].isClicked = false;
      this.searchResult[i].hovered = false;
    }
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((m.user.address.latitude - this.mylat) * p) / 2 +
      (c(this.mylat * p) *
        c(m.user.address.latitude * p) *
        (1 - c((m.user.address.longitude - this.mylng) * p))) /
        2;
    this.distance = Math.round(12742 * Math.asin(Math.sqrt(a)) * 2);
    if(this.distance>0){
      this.ok=true;
    }
    m.isClicked = !m.isClicked;
    m.hovered = true;
    let el = document.getElementById(this.id);
    el.scrollIntoView();
  }
  clickedMarker1(m: marker, i: number) {
    for (let i = 0; i < this.searchResult.length; i++) {
      this.searchResult[i].isClicked = false;
      this.searchResult[i].hovered = false;
    }
  
    m.isClicked = !m.isClicked;
    m.hovered = true;
  
  }
  ngOnInit() {
    this.filterSubscription = this.route.queryParams.subscribe(data => {
      this.address = data.address;
      this.activity = data.activity;
      if (this.activity) {
        this.getActivity();
      } else if (!this.activity && !this.address) {
        this.titleService.setTitle("Tous les professionnels| PARPRO ");
        this.meta.addTag({
          name: "description",
          content: "content='Trouvez tous les artisans dans france. "
        });
      } else if (!this.activity && this.address) {
        this.titleService.setTitle(
          "Tous les professionnels  a " + this.address + "| PARPRO"
        );
        this.meta.addTag({
          name: "description",
          content: "Tous les professionnels  a " + this.address
        });
      }
      this.searchProfessionals({
        address: this.address,
        activity: this.activity,
        status: 2
      });
    });
  }
  showAlerts(): void {
    this.alertService.info("this is an info alert");
    this.alertService.danger("this is a danger alert");
    this.alertService.success("this is a success alert");
    this.alertService.warning("this is a warning alert");
  }
  onSubmit() {
    this.router.navigate(["./"], {
      queryParams: { address: this.address, activity: this.activity },
      relativeTo: this.route
    });
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  searchProfessionals(filter) {
    this.loading = true;
    this.professionalService.search(filter).subscribe(
      res => {
        this.searchResult = res;
        this.loading = false;
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
        this.loading = false;
      }
    );
  }
  getActivity() {
    this.activityService.getID(this.activity).subscribe(
      res => {
        if (this.address) {
          this.titleService.setTitle(
            res.name + " à " + this.address + "| PARPRO"
          );
          this.meta.addTag({
            name: "description",
            content: res.name + " à " + this.address
          });
        } else {
          this.titleService.setTitle(res.name + "| PARPRO");
          this.meta.addTag({ name: "description", content: res.name });
        }
      },
      error => {
        this.alertService.danger(
          "une erreur est survenue veuillez réessayer plus tard"
        );
      }
    );
  }
  initAutocomplete() {
    var lat = document.getElementById("lat");
    var lng = document.getElementById("lng");

    var map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: +lat,
        lng: +lng
      },
      zoom: 13
    });
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
  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.code_postal = addrObj.postal_code;
      this.addrKeys = Object.keys(addrObj);
    });
  }
}
interface marker {
  user: User;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isClicked?: boolean;
  hovered?: boolean;
}
