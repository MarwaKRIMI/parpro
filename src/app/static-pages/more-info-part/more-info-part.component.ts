import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-more-info-part',
  templateUrl: './more-info-part.component.html',
  styleUrls: ['./more-info-part.component.css']
})
export class MoreInfoPartComponent implements OnInit {

  constructor(private titleService : Title,
    private meta :Meta 
    ) { 
      this.meta.addTag({ name: 'description', content: "Trouvez les meilleurs Professionnels dans votre région avec PARPRO,  vous trouverez des artisans et des prestataires de services pour votre projet !Cherchez-vous un prestataire de services ? PARPRO met fin à la recherche artisanale la plus élaborée.Grâce à PARPRO, vous trouverez rapidement des artisans et des prestataires de services compétents pour chaque travail. Il suffit de déposer  votre demande gratuitement et de recevoir diverses offres de nos artisans certifiés.  Les profils de nos clients professionnels vous aideront à choisir la meilleure entreprise artisanale. Chez PARPRO, vous obtenez des prix de qualité et équitables! Avec nous, vous ne trouverez que des artisans certifiés et agréés vérifié par nos soins  Laissez-vous convaincre par des profils d'entreprises significatifs Vous l'avez entre vos mains: vous choisissez le meilleur artisan au meilleur prix  Vous trouverez ici des artisans et des prestataires de services de presque toutes les industries de votre région PARPRO est gratuit pour vous en tant que client! "})
  } 

  ngOnInit() {
    this.titleService.setTitle('Informations sur les particuliers| PARPRO')
  }

}
