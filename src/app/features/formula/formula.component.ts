import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formula',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Formula</h2>
    <p>Contenido de Formula.</p>
  `
})
export class FormulaComponent {}
