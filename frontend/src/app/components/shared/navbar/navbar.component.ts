import { Component, computed, Signal, inject, signal, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../services/auth.service';

export type MenuNavbar = Array<'Inicio' | 'Categorías' | 'Cursos'>;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink]
})
export class NavbarComponent {
  private router = inject(Router);
  public authService = inject(AuthService);

  // Estado del dropdown del usuario
  isUserDropdownOpen = signal(false);

  menuNavbar: Signal<MenuNavbar> = computed(() => ['Inicio', 'Categorías', 'Cursos']);

  showNavbar = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const hideRoutes = ['/login', '/register'];
        return !hideRoutes.includes(event.urlAfterRedirects);
      }),
      startWith(true) // Mostrar por defecto hasta que se detecte la ruta
    ),
    { initialValue: true }
  );

  /**
   * Toggle del dropdown del usuario
   */
  toggleUserDropdown(): void {
    this.isUserDropdownOpen.set(!this.isUserDropdownOpen());
  }

  /**
   * Cerrar el dropdown del usuario
   */
  closeUserDropdown(): void {
    this.isUserDropdownOpen.set(false);
  }

  /**
   * Navegar a login
   */
  goToLogin(): void {
    this.closeUserDropdown();
    this.router.navigate(['/login']);
  }

  /**
   * Navegar a register
   */
  goToRegister(): void {
    this.closeUserDropdown();
    this.router.navigate(['/register']);
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    this.closeUserDropdown();
    await this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Iniciar login con Discord
   */
  loginWithDiscord(): void {
    this.closeUserDropdown();
    this.authService.loginWithDiscord();
  }

  /**
   * Escuchar clics fuera del dropdown para cerrarlo
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const userMenu = target.closest('.user-menu');

    if (!userMenu && this.isUserDropdownOpen()) {
      this.closeUserDropdown();
    }
  }
}
