import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-politique',
  templateUrl: './politique.component.html',
  styleUrls: ['./politique.component.css'],
})
export class PolitiqueComponent implements OnInit {
  loading = false;
  submitted = false;
  constructor(private titleService : Title,
    private meta :Meta 
  ) { 
    this.meta.addTag({name:"description",content:"Les données personnelles sont traitées de manière transparente,confidentielle et sécurisée. ,Ci-dessous PARPRO vous informe sur la manière claire et transparente de l'utilisation et la protection de vos données personnelles. PARPRO respecte l’ensemble des dispositions réglementaires et législatives françaises et européennes relatives à la protection des données personnelles. Les termes utilisés dans la présente Charte ont la même signification telle que définie les conditions générales d’utilisation et les conditions générales de vente. L’utilisation des services prodigués par PARPRO entraîne l’acceptation de la présente Charte."})
    this.titleService.setTitle("Politique de confidentialité| PARPRO")
  }
  ngOnInit() {
  }

}
