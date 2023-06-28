import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // cards = ["Strike", "Block", "Assist", "Dash", "Dying Breath"];
  // status = ["Intact", "Intact", "Intact", "Exhausted", "Destroyed"];

  navRules() {
    let rulesUrl = "../assets/Rules/Dungeon_Crawlers_v0.5.0.pdf"; //update w/ new versions
    window.open(rulesUrl, "_blank");
  }
}
