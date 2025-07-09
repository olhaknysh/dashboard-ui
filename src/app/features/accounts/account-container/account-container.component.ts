import {
  Component,
  ChangeDetectionStrategy,
  input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-container',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex flex-col gap-4 pt-8">
      <h2
        class="title text-lg font-bold flex md:flex-row flex-col gap-2 items-center"
      >
        {{ title() }}
        @if (titleContent()) {
          <ng-container *ngTemplateOutlet="titleContent()"></ng-container>
        }
      </h2>
      <ng-content></ng-content>
    </section>
  `,
})
export class AccountContainerComponent {
  title = input<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  titleContent = input<TemplateRef<any>>();
}
