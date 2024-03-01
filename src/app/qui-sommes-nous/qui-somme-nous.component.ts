import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-qui-sommes-nous',
  templateUrl: './qui-somme-nous.component.html',
  styleUrls: ['./qui-somme-nous.component.css'],
})
export class QuiSommeNousComponent implements OnInit {
  constructor(   private titleService : Title,
    private meta :Meta ) { this.meta.addTag({name:"description" , content:"Vous avez besoin d'un prestataire de service ? Vous voulez trouver le meilleur professionnel pour vos travaux au meilleur prix ? Vous frappez à la bonne porte ! PARPRO vous permet de déposer votre demande et de consulter les profils des professionnels proches de chez vous gratuitement en quelques clics. En effet nos professionnels qualifiés s'engagent à vous répondre dans les plus brefs délais pour répondre au mieux à vos besoins. Notre métier consiste à réunir et à mettre en contact nos clients ensemble avec les meilleurs spécialistes de tous les secteurs d’activités. Pour nous la confiance est une évidence, PARPRO pense à tout car vos projets comptent trop pour nous"})}

  ngOnInit() {
    this.titleService.setTitle("Qui sommes-nous| PARPRO")
  }

}
