import { Component } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  popLogin = false;
  loggedIn = false;
  user = '';
  version = packageJson.version;
  mgLogoSrc = '../assets/mind_goblin_icon.webp';
  mgLogoHiddenSrc = '../assets/mind_goblin_hidden.webp';
  mgLogo = this.mgLogoHiddenSrc;
  //loginIcon: IconProp = ['fas', 'door-closed'];
  loginIcon: IconName = 'door-closed';
  profilePrefix: IconPrefix = 'far';
  
  // cards = ['Strike', 'Block', 'Assist', 'Dash', 'Dying Breath'];
  // status = ['Intact', 'Intact', 'Intact', 'Exhausted', 'Destroyed'];

  navRules() {
    let rulesUrl = '../assets/Rules/Dungeon_Crawlers_v0.5.0.pdf'; //update w/ new versions
    window.open(rulesUrl, '_blank');
  }

  navMG() {
    console.log('send to MG hub');
  }

  onLogin(loggedInUser: string) { 
    this.user = loggedInUser;
    this.loggedIn = loggedInUser == '' ? false : true;
    this.popLogin = false;
    if (this.loggedIn)
      console.log(this.user + ' successfully logged in');
    else
      console.log('didn\'t log in');
  }
  
  async navProfile() {
    console.log('route to profile');
  }

  onRecover() {
    console.log('route to password recovery');
  }
}
