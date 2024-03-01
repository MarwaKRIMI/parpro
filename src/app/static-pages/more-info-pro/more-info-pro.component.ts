import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-more-info-pro',
  templateUrl: './more-info-pro.component.html',
  styleUrls: ['./more-info-pro.component.css']
})
export class MoreInfoProComponent implements OnInit {

  constructor(private titleService : Title,
    private meta :Meta 
    ) { 
      this.meta.addTag({ name: 'description', content: "Devenez aussi une histoire de succès avec PARPRO notre équipe interne d'employés amicaux et qualifiés se réjouit de vous soutenir. Que ce soit dans la recherche des clients, la soumission d'offres ou l'établissement de votre profil d'entreprise - nous ne serons là rien que pour vous servir au mieux avec toutes vos questions sur PARPRO dès le début Ensemble nous  veillons à ce que votre entreprise soit également lancée avec succès!• vous déterminez vous-même vos prix.• Nous vous  tiendrons au courant des demandes appropriées dans votre région.• Construisez votre clientèle et comblez les lacunes. • 73% de nos clients sont propriétaires - profitez-en. votre succès est important pour nous ! votre conseiller personnel est là pour vous!"})
  } 

  ngOnInit() {
    this.titleService.setTitle('Informations sur les professionnels| PARPRO')

}
}
