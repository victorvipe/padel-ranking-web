import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, MatToolbarModule, MatTabsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  title = 'Panteres Grogues Padel';
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  tabs = [
    { path: '/ranking', label: 'Ranking' },
    { path: '/results', label: 'Results' },
    { path: '/matches', label: 'Matches' },
    { path: '/apuntados', label: 'Apuntados' },
    { path: '/formula', label: 'Formula' },
    { path: '/pista-inoportuna', label: 'Pista Inoportuna' },
    { path: '/orla', label: 'Orla' },
    { path: '/records', label: 'Records' }
  ];
}
