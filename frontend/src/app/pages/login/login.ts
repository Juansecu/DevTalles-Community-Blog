import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [RouterLink, ReactiveFormsModule]
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.log('Formulario no válido');
      this.loginForm.markAllAsTouched();
    }
  }

  getEmailError(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required') && emailControl?.touched) {
      return 'Este campo es obligatorio';
    }
    if (emailControl?.hasError('email') && emailControl?.touched) {
      return 'Ingresa un email válido';
    }
    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required') && passwordControl?.touched) {
      return 'Este campo es obligatorio';
    }
    if (passwordControl?.hasError('minlength') && passwordControl?.touched) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  hasEmailError(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl?.invalid && emailControl?.touched ? true : false;
  }

  hasPasswordError(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.invalid && passwordControl?.touched ? true : false;
  }
}
