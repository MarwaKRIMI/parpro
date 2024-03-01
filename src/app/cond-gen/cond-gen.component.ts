import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Title, Meta } from "@angular/platform-browser";
@Component({
  selector: 'fws-cond-gen',
  templateUrl: './cond-gen.component.html',
  styleUrls: ['./cond-gen.component.css'],
})
export class CondGenComponent implements OnInit {
  loading = false;
  submitted = false;
  constructor(private titlService: Title, private meta: Meta) {
    this.meta.addTag({
      name: "description",
      content:
        "Définitions :SAS PARPRO FRANCE est le propriétaire du site PARPRO et exploitant les services de PARPRO. PARPRO : désigne le site internet www.parpro.fr Utilisateur: désigne toute personne physique ou morale qui utilise le site PARPRO et accède aux services proposés par PARPRO. Particulier :désigne toute personne physique ou morale inscrite sur le site PARPRO qui dépose une ou plusieurs demandes sur le site PARPRO à fin de trouver un professionnel. Professionnel: désigne toute personne physique ou morale inscrite sur le site PARPRO qui propose des prestations de services aux particuliers. Demande: désigne les prestations de services que le particulier souhaite faire réaliser par des professionnels via le site PARPRO. Profil : désigne toutes les infomations mises en ligne par les professionnels sur le site PARPRO. PARPRO propose le service d'intermédiation mettant en contact direct les professionnels avec les particuliers. PARPRO propose aux particuliers de déposer des demandes de prestations de services gratuitement sur le site PARPRO,  les professionnels intéressés par une demande se mettent ensuite directement en contact avec le particulier pour lui proposer de réaliser la ou les prestations de services demandées. Le particulier peut être contacté par zéro à  cinq professionnels maximum. En aucun cas la responsabilité de PARPRO ne peut être recherchée pour tout litige relatif à l’éventuelle poursuite de la relation entre un particulier et un professionnel. Le service de mise en relation proposé  par PARPRO est entièrement gratuit pour les particuliers. La rémunération de PARPRO provient uniquement des services payants des professionnels, PARPRO ne prends aucune commission sur le montant des prestations réalisées par les professionnels"
    });
    this.titlService.setTitle("Conditions générales d'utilisation| PARPRO");
  }
  ngOnInit() {
  }

}
