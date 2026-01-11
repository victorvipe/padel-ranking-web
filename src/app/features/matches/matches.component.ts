import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marches',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Marches</h2>
    <p>Contenido de Marches.</p>
  `
})
export class MatchesComponent {}
