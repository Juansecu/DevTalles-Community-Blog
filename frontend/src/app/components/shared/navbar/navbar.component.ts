import { Component, computed, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type MenuNavbar = Array<'Inicio' | 'Categorías' | 'Cursos'>;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [NgOptimizedImage]
})
export class NavbarComponent {
  menuNavbar: Signal<MenuNavbar> = computed(() => ['Inicio', 'Categorías', 'Cursos']);
}
