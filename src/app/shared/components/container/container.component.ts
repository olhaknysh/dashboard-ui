import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ContainerVariant } from './container.component.interface';

@Component({
  selector: 'app-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="container-wrapper"
      [class.attention]="variant() === 'attention'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  variant = input<ContainerVariant>('default');
}
