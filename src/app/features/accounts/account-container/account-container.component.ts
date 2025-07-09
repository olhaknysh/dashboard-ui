import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-account-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex flex-col gap-4 pt-8">
      <h2 class="title text-lg font-bold">{{ title() }}</h2>
      <ng-content></ng-content>
    </section>
  `,
})
export class AccountContainerComponent {
  title = input<string>();
}
