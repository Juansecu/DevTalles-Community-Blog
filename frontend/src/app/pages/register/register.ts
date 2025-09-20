import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [RouterLink]
})
export class RegisterComponent {
  constructor() {
    console.log('hello from register');
  }
}
