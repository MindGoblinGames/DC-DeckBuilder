import { Component, OnInit, Input } from '@angular/core';
import { CardService, Card } from '../card.service'

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() name = '';
  @Input() status = 'Intact';
  card!: Card;
  art = '';
  catIcon = '';
  typeIcon = '';
  overlay = '';
  defaultArt = '../../assets/CardArt/default.webp';
  
  constructor (private cardService: CardService) {  }

  ngOnInit(): void {
    let card = this.cardService.getByName(this.name);
    this.card = card != undefined ? card : <Card>{};
    this.card.status = this.status;
    this.getImages();
  }

  getImages() {
    this.art = '../../assets/CardArt/' + this.name + '.webp';
    this.catIcon = '../../assets/CardIcons/' + this.card.category + '.webp';
    this.typeIcon = '../../assets/CardIcons/' + this.card.cardType + '.webp';
    if (this.status != 'Intact')
      this.overlay = '../../assets/CardArt/' + this.status + '.webp';
  }

  imgError(event: Event) {
    (<HTMLImageElement>event.target).src = this.defaultArt;
  }
}
