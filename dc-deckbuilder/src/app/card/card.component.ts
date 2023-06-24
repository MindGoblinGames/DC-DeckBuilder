import { Component, OnInit, Input } from '@angular/core';
import { CardService, Card } from '../card.service'

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() name = '';
  @Input() status = "Intact";
  card!: Card;
  
  constructor (private cardService: CardService) {  }

  ngOnInit(): void {
    let card = this.cardService.getByName(this.name);
    this.card = card != undefined ? card : <Card>{};
    this.card.status = this.status;
  }
}
