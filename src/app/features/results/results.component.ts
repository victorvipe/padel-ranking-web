import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Results</h2>
    <p>Contenido de Results.</p>
  `
})
export class ResultsComponent {}
