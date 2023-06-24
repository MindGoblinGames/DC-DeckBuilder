import { Injectable } from '@angular/core';
import cardData from '../assets/cards.json';

export interface Card {
  name: string;
  category: string;
  cardType: string;
  action: string;
  description: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: Card[] = cardData;

  getByName(name: string): Card | undefined {
    return Object.assign({}, this.cards.find(card => card.name == name));
  }

  getByCategory(cat: string): Card[] {
    return Object.assign(this.cards.filter(card => card.category == cat));
  }

  getByType(type: string): Card[] {
    return Object.assign(this.cards.filter(card => card.cardType == type));
  }
}
