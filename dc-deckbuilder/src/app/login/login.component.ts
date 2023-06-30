import { Component, EventEmitter, Output } from '@angular/core';
import { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  MAX_INPUT_LENGTH = 255;

  create = false;
  protected username = '';
  protected email = '';
  protected password = '';
  protected confirm = '';
  iconType: IconPrefix = 'far';

  headers = new HttpHeaders().set('responseType', 'text');

  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  close() {
    this.loggedIn.emit(false);
  }

  login() {
    this.http.post('backend/login.php', {action: 'login', user: this.username, pass: this.password}, {responseType: 'text'}).subscribe((data) => {
      console.log(data)
    });
  }

  register() {
    this.http.post('backend/register.php', {action: 'register', user: this.username, email: this.email, pass: this.password, conf: this.confirm}, {responseType: 'text'}).subscribe((data) => {
      console.log(data)
    });
  }
}
