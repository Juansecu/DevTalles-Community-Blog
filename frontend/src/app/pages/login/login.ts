import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [RouterLink]
})
export class LoginComponent {
  constructor() {
    console.log('hello');
  }
}
