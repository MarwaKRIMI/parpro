import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {

  constructor(
    private TitleService: Title,
    private meta: Meta 
  ) { 
    this.meta.addTag({name:"description", content:"Paiement invalide |PARPRO "})
  }

  ngOnInit() {
    this.TitleService.setTitle("Paiement non valide| PARPRO")
  }

}
