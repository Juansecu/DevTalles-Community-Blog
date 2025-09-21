import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [RouterLink, ReactiveFormsModule]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  emailMatchValidator(): ValidationErrors | null {
    const email = this.registerForm?.get('email')?.value;
    const confirmEmail = this.registerForm?.get('confirmEmail')?.value;

    if (!email || !confirmEmail) {
      return null;
    }

    return email === confirmEmail ? null : { emailMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Datos del registro:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
    } else {
      console.log('Formulario no válido');
      this.registerForm.markAllAsTouched();
    }
  }

  // Métodos helper para errores
  getFirstNameError(): string {
    const control = this.registerForm.get('firstName');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    return '';
  }

  getLastNameError(): string {
    const control = this.registerForm.get('lastName');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return 'Los apellidos deben tener al menos 2 caracteres';
    }
    return '';
  }

  getEmailError(): string {
    const control = this.registerForm.get('email');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Ingresa un email válido';
    }
    return '';
  }

  getConfirmEmailError(): string {
    const control = this.registerForm.get('confirmEmail');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Ingresa un email válido';
    }
    if (this.emailMatchValidator() && control?.touched) {
      return 'Los emails no coinciden';
    }
    return '';
  }

  getUsernameError(): string {
    const control = this.registerForm.get('username');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.registerForm.get('password');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.registerForm.get('confirmPassword');
    if (control?.hasError('required') && control?.touched) {
      return 'Este campo es obligatorio';
    }
    if (this.registerForm.hasError('passwordMismatch') && control?.touched) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  getAgreeTermsError(): string {
    const control = this.registerForm.get('agreeTerms');
    if (control?.hasError('required') && control?.touched) {
      return 'Debes aceptar los términos y condiciones';
    }
    return '';
  }

  hasFirstNameError(): boolean {
    const control = this.registerForm.get('firstName');
    return control?.invalid && control?.touched ? true : false;
  }

  hasLastNameError(): boolean {
    const control = this.registerForm.get('lastName');
    return control?.invalid && control?.touched ? true : false;
  }

  hasEmailError(): boolean {
    const control = this.registerForm.get('email');
    return control?.invalid && control?.touched ? true : false;
  }

  hasConfirmEmailError(): boolean {
    const control = this.registerForm.get('confirmEmail');
    return (control?.invalid && control?.touched) ||
      (this.emailMatchValidator() && control?.touched)
      ? true
      : false;
  }

  hasUsernameError(): boolean {
    const control = this.registerForm.get('username');
    return control?.invalid && control?.touched ? true : false;
  }

  hasPasswordError(): boolean {
    const control = this.registerForm.get('password');
    return control?.invalid && control?.touched ? true : false;
  }

  hasConfirmPasswordError(): boolean {
    const control = this.registerForm.get('confirmPassword');

    return (control?.invalid && control?.touched) ||
      (this.registerForm.hasError('passwordMismatch') && control?.touched)
      ? true
      : false;
  }

  hasAgreeTermsError(): boolean {
    const control = this.registerForm.get('agreeTerms');
    return control?.invalid && control?.touched ? true : false;
  }
}
