import { Component, EventEmitter, Output } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  create = false;
  protected username = '';
  protected email = '';
  protected password = '';
  protected confirm = '';
  iconType: IconPrefix = 'far';

  @Output() loggedIn = new EventEmitter<boolean>();

  close() {
    this.loggedIn.emit(false);
  }
}
