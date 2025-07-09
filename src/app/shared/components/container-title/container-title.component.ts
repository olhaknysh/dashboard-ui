import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-title',
  standalone: true,
  imports: [CommonModule],
  template: `<h2 class="container-title"><ng-content></ng-content></h2>`,
  styles: [
    `
      .container-title {
        color: var(--title-color);
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class ContainerTitleComponent {}
