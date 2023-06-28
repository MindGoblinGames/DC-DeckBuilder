import { Component } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loggedIn = false;
  mgLogoSrc = '../assets/mind_goblin_hidden.webp';
  iconStyle: IconPrefix = 'far';
  
  cards = ['Strike', 'Block', 'Assist', 'Dash', 'Dying Breath'];
  status = ['Intact', 'Intact', 'Intact', 'Exhausted', 'Destroyed'];

  navRules() {
    let rulesUrl = '../assets/Rules/Dungeon_Crawlers_v0.5.0.pdf'; //update w/ new versions
    window.open(rulesUrl, '_blank');
  }

  navMG() {
    console.log('send to MG hub');
  }

  async login() {
    console.log('login');
    this.loggedIn = true;
    return;
  }
  
  async navProfile() {
    if (!this.loggedIn)
      await this.login();
    console.log('route to profile');
  }

  toggleMG(mode: string) {
    if (mode == 'on')
      this.mgLogoSrc = '../assets/mind_goblin_icon.webp';
    else if (mode == 'off')
      this.mgLogoSrc = '../assets/mind_goblin_hidden.webp';
  }
}
