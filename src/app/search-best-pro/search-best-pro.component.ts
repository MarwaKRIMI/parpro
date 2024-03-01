import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/services/activity.service';
import { Router } from '@angular/router';
import { AddressService } from '../shared/services/address.service';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-search-best-pro',
  templateUrl: './search-best-pro.component.html',
  styleUrls: ['./search-best-pro.component.css'],
  providers: [ ActivityService, AddressService]
})
export class SearchBestProComponent {

  activities = [];
  filter = {
    name: "",
    address: "",
    activity: "",
    language: "",
    status: 2
  }
  cities = [];
  submitted = false;
  loading = false;
  constructor(
    private activityService: ActivityService,
    private alertService: AlertService,
    private addressService : AddressService,
    private titleservice : Title,
    private meta : Meta,
    private router: Router ) {
      this.getActivities();
      this.getCities();
     }

     ngOnInit() {
      this.meta.addTag({name:"description",content:" Trouvez les meilleurs professionnel pour vour , Recherche des professionnels"})
      this.titleservice.setTitle("Recherche des professionnels| PARPRO  ")
    }
  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  } 
  onSubmit(){
    this.submitted = true;
   // this.router.navigate(['/recherche/resultats', this.filter])
   this.router.navigate(['/recherche/resultats'], { queryParams: this.filter });
  }
  getActivities() {
    this.activityService.getAll().subscribe(
      res => this.activities = res ,
      error => {
      this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
      this.loading = false;
    });
  }

  getCities() {
    this.addressService.getAllCities().subscribe(
      res => this.cities = res ,
      error => {
      this.alertService.danger('une erreur est survenue veuillez réessayer plus tard');
    });
  }
}
