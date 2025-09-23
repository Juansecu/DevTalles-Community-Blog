import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-discord-callback',
  template: `
    <div class="callback-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <h2>Procesando autenticación con Discord...</h2>
        <p>Por favor espera mientras completamos tu inicio de sesión.</p>
      </div>
    </div>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .loading-spinner {
        text-align: center;
        background: white;
        padding: 3rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
      }

      .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #5865f2;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      h2 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      p {
        color: #666;
        font-size: 1rem;
      }
    `
  ]
})
export class DiscordCallbackComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    try {
      // Obtener parámetros de la URL (code, state, etc.) si es necesario
      const queryParams = this.route.snapshot.queryParams;
      console.log('Discord callback params:', queryParams);

      // Procesar el callback de Discord
      const result = await this.authService.handleDiscordCallback();

      if (result.success) {
        console.log('Autenticación con Discord exitosa');

        // Obtener URL de retorno
        const returnUrl = this.authService.getDiscordReturnUrl();

        // Redirigir después de un breve delay para mostrar el mensaje
        setTimeout(() => {
          this.router.navigate([returnUrl]);
        }, 2000);
      } else {
        console.error('Error en autenticación con Discord:', result.error);

        // Redirigir al login con el error
        setTimeout(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              error: result.error || 'Error en la autenticación con Discord'
            }
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error procesando callback de Discord:', error);

      // Redirigir al login con error genérico
      setTimeout(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            error: 'Error inesperado en la autenticación'
          }
        });
      }, 2000);
    }
  }
}
