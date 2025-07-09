import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerComponent, DialogLinkComponent } from '../../../../shared';

@Component({
  selector: 'app-performance-metric-card',
  standalone: true,
  imports: [CommonModule, ContainerComponent, DialogLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-container>
      <h3 class="title flex flex-row gap-2 items-center">
        {{ cardTitle() }}
        @if (titleContent()) {
          <ng-container *ngTemplateOutlet="titleContent()"></ng-container>
        }
      </h3>
      <ng-content></ng-content>
      @if (isDialogLinkShown()) {
        <app-dialog-link
          class="mt-4"
          [text]="linkText()"
          [dialogTitle]="dialogTitle()"
          [dialogItems]="dialogItems()"
        ></app-dialog-link>
      }
    </app-container>
  `,
})
export class PerformanceMetricCardComponent {
  cardTitle = input.required<string>();
  isDialogLinkShown = input<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleContent = input<TemplateRef<any>>();

  linkText = input<string>('See all factors');
  dialogTitle = input<string>('Winnability Factors');
  dialogItems = input<string[]>(['Factor 1', 'Factor 2', 'Factor 3']);
}
