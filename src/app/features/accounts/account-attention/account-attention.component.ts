import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import {
  ContainerComponent,
  ContainerTitleComponent,
  DialogLinkComponent,
} from '../../../shared';
import { AccountInfoStore } from '../../../store';
import { AccountAttention } from '../../../services/accounts';

@Component({
  selector: 'app-account-attention',
  standalone: true,
  imports: [ContainerComponent, ContainerTitleComponent, DialogLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-container [variant]="'attention'">
      <app-container-title>Needs Attention</app-container-title>
      <div class="flex flex-row gap-10 overflow-x-auto">
        @for (item of attetionItems(); track item.title) {
          <div class="flex flex-col gap-2">
            <h2 class="text-white text-lg font-bold">{{ item.title }}</h2>
            <p class="sub-title text-sm">{{ item.subtitle }}</p>
            <app-dialog-link
              [text]="item.linkText"
              [dialogTitle]="item.title ?? ''"
              [dialogItems]="item.additionalInfo"
            ></app-dialog-link>
          </div>
        }
      </div>
    </app-container>
  `,
})
export class AccountAttentionComponent {
  readonly accountInfoStore = inject(AccountInfoStore);

  readonly attetionItems = computed<AccountAttention[]>(() => {
    return this.accountInfoStore.getSelectedAccountInfo()?.attention ?? [];
  });
}
