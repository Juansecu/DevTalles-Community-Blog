import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [RouterLink, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  private returnUrl = '/';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(32)]
    ]
  });

  ngOnInit() {
    // Obtener URL de retorno de los query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const credentials: LoginDto = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      try {
        const result = await this.authService.login(credentials);

        if (result.success) {
          this.successMessage.set('¡Inicio de sesión exitoso! Redirigiendo...');

          // Redirigir a la URL de retorno o página principal después de 1 segundo
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 1000);
        } else {
          this.errorMessage.set(result.error || 'Error al iniciar sesión');
        }
      } catch (error) {
        this.errorMessage.set('Error interno. Inténtalo de nuevo.');
        console.error('Error:', error);
      } finally {
        this.isLoading.set(false);
      }
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
      return 'La contraseña debe tener al menos 8 caracteres';
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
