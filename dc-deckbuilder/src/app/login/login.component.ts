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

  @Output() loggedIn = new EventEmitter<string>();
  @Output() recover = new EventEmitter();

  constructor(private http: HttpClient) {}

  close(loggedInUser: string) {
    this.loggedIn.emit(loggedInUser);
  }

  forgot() {
    this.recover.emit(true);
  }

  login() {
    if ((<HTMLFormElement>document.getElementById("loginForm")).reportValidity())
      this.http.post('backend/login.php', {action: 'login', user: this.username, pass: this.password}, {responseType: 'text'}).subscribe((data) => {
        let success = data == "Login Successful!" ? true : false
        this.respond(data, success);
        if (success)
          setTimeout(() => {this.close(this.username)}, 1000);
      });
  }

  register() {
    if ((<HTMLFormElement>document.getElementById("registerForm")).reportValidity())
      this.http.post('backend/register.php', {action: 'register', user: this.username, email: this.email, pass: this.password, conf: this.confirm}, {responseType: 'text'}).subscribe((data) => {
        let success = data == "Account Created!" ? true : false;
        this.respond(data, success);
        if (success) {
          setTimeout(() => {this.switch()}, 1000);
        }
      });
  }

  switch() {
    (<HTMLFormElement>document.querySelector("form")).reset();
    document.getElementById("response")!.innerHTML = '';
    this.create = !this.create;
  }

  respond(message: string, success: boolean) {
    let target = document.getElementById("response");

    target!.innerHTML = message;
    target!.style.color = success ? "darkgreen" : "darkred";
    if (!success) {
      target!.className = "flash";
      setTimeout(() => {target!.className = ''}, 500)
    }
  }
}
