import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CreateUserDto } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [RouterLink, ReactiveFormsModule]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  registerForm: FormGroup = this.fb.group(
    {
      firstName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(70)]
      ],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(32)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(32)]
      ],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    },
    { validators: [this.passwordMatchValidator, this.emailMatchValidator] }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email')?.value;
    const confirmEmail = control.get('confirmEmail')?.value;

    if (!email || !confirmEmail) {
      return null;
    }

    return email === confirmEmail ? null : { emailMismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const formData = this.registerForm.value;

      const userData: CreateUserDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        emailConfirmation: formData.confirmEmail,
        username: formData.username,
        password: formData.password,
        passwordConfirmation: formData.confirmPassword,
        birthdate: formData.birthdate
      };

      try {
        const result = await this.usersService.createUser(userData);

        if (result.success) {
          this.successMessage.set(
            '¡Usuario creado exitosamente! Redirigiendo al login...'
          );

          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage.set(result.error || 'Error al crear usuario');
        }
      } catch (error) {
        this.errorMessage.set('Error interno. Inténtalo de nuevo.');
        console.error('Error:', error);
      } finally {
        this.isLoading.set(false);
      }
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
    if (this.registerForm.hasError('emailMismatch') && control?.touched) {
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

  getBirthdateError(): string {
    const control = this.registerForm.get('birthdate');
    if (control?.hasError('required') && control?.touched) {
      return 'La fecha de nacimiento es obligatoria';
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
      (this.registerForm.hasError('emailMismatch') && control?.touched)
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

  hasBirthdateError(): boolean {
    const control = this.registerForm.get('birthdate');
    return control?.invalid && control?.touched ? true : false;
  }
}
