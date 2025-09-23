import { Component, inject, signal, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [RouterLink, ReactiveFormsModule]
})
export class LoginComponent implements OnInit, AfterViewInit {
  private readonly captchaSiteKey: string;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  private returnUrl = '/';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(32)]
    ],
    turnstileToken: ['', [Validators.required]]
  });

  constructor() {
    this.captchaSiteKey = environment.captchaSiteKey;
  }

  ngOnInit() {
    // Obtener URL de retorno de los query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Verificar si hay error de Discord
    const discordError = this.route.snapshot.queryParams['error'];
    if (discordError) {
      this.errorMessage.set(discordError);
    }
  }

  ngAfterViewInit() {
    const renderTurnstile = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (window['turnstile'] && document.getElementById('turnstile-widget')) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window['turnstile'].render('#turnstile-widget', {
          sitekey: this.captchaSiteKey,
          callback: (token: string) => {
            this.loginForm.patchValue({ turnstileToken: token });
          },
          theme: 'dark'
        });
      } else {
        setTimeout(renderTurnstile, 100);
      }
    };
    renderTurnstile();
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
        const result = await this.authService.login(
          credentials,
          this.loginForm.value.turnstileToken
        );

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

  /**
   * Iniciar login con Discord
   */
  loginWithDiscord(): void {
    this.authService.handleDiscordCallback();
  }
}
