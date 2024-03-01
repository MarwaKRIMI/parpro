import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-cond-gen-ventes',
  templateUrl: './cond-gen-ventes.component.html',
  styleUrls: ['./cond-gen-ventes.component.css'],
})
export class CondGenVentesComponent implements OnInit {
  constructor( private titlService: Title,
    private meta: Meta ) {
      this.meta.addTag({name:"description",content:"Accès aux services: Le site permet à l'utilisateur un accès gratuit aux services suivants : Le site est accessible gratuitement en tout lieu à tout utilisateur ayant un accès à Internet. Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge Selon le cas : L’utilisateur non inscrit n'a pas accès aux services réservés aux utilisateurs inscrits. Pour cela, il doit s'identifier à l'aide de son  identifiant et de son mot de passe. Le site met en œuvre tous les moyens mis à sa disposition pour assurer un accès de qualité à ses services. L'obligation étant de moyens, le site ne s'engage pas à atteindre ce résultat"})
      this.titlService.setTitle("Conditions générales de vente| PARPRO")
     }

  ngOnInit() {
  }

}
