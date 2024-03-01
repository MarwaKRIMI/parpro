import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'fws-payment-accepted',
  templateUrl: './payment-accepted.component.html',
  styleUrls: ['./payment-accepted.component.css']
})
export class PaymentAcceptedComponent implements OnInit {

  constructor(
    private TitleService: Title ,
    private meta: Meta 
  ) { 
    this.meta.addTag({name:"description", content:"paiement valide| parpro "})
  }

  ngOnInit() {
    this.TitleService.setTitle("Paiement valide | PARPRO")
  }

}
