import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Records</h2>
    <p>Contenido de Records.</p>
  `
})
export class RecordsComponent {}
