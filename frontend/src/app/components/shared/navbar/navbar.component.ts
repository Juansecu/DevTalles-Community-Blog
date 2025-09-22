import { Component, computed, Signal, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

export type MenuNavbar = Array<'Inicio' | 'Categorías' | 'Cursos'>;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink]
})
export class NavbarComponent {
  private router = inject(Router);

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
}
