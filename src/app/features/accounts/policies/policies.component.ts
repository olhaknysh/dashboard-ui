import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AccountContainerComponent } from '../account-container';
import { ContainerComponent } from '../../../shared';
import { PoliciesCardComponent } from './components/policies-card.component';
import { AccountInfoStore } from '../../../store';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [
    AccountContainerComponent,
    ContainerComponent,
    PoliciesCardComponent,
  ],
  templateUrl: './policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent {
  private readonly store = inject(AccountInfoStore);
  policies = this.store.getPolicies;
}
