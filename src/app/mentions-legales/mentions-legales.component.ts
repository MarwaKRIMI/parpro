import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-mentions-legales',
  templateUrl: './mentions-legales.component.html',
  styleUrls: ['./mentions-legales.component.css'],
})
export class MentionsComponent implements OnInit {
  loading = false;
  submitted = false;
  constructor(
    private titleService : Title,
    private meta :Meta 
    ) { 
      }

  ngOnInit() {
    this.meta.addTag({ name: 'description', content: "Conformément aux dispositions des articles 6- III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs et aux visiteurs du site www.parpro.fr (ci-après «PARPRO») les présentes mentions légales. La connexion, l'utilisation et l'accès à PARPRO impliquent l'acceptation  intégrale et sans réserve de l'internaute de toutes les dispositions des présentes mentions légales. Editeur du site: Les Services de PAPPRO sont édités par SAS PARPRO FRANCE au capital de 1000 euros, immatriculée au RCS de GRASSE sous le numéro 841 749 799 dont le  siège social est situé à 44 Boulevard Victor Hugo, 06130 GRASSE et dont le numéro de TVA intracommunautaire est FR06841749799. Téléphone : 04 22 48 05 59 Adresse e-mail : info@parpro.fr Directeur de la publication : Monsieur Achref ZRELLI, Président. Hébergeur du site : Le site PARPRO est hébergé par SAS OVH au capital de 10 069 020 euros, immatriculée au RCS de LILLE Métropole sous le numéro 424 761 419 et dont le siège social est situé au 2 Rue Kellermann, 59100 ROUBAIX – FRANCE et dont le numéro de téléphone est 1007 "})
 
    this.titleService.setTitle('Mentions légales| PARPRO')
  }
  

}
