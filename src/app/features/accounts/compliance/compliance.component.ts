import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AccountInfoStore } from '../../../store';
import { AccountContainerComponent } from '../account-container';
import { ContainerComponent, DialogLinkComponent } from '../../../shared';

@Component({
  selector: 'app-compliance',
  standalone: true,
  templateUrl: './compliance.component.html',
  imports: [
    MatIconModule,
    AccountContainerComponent,
    DialogLinkComponent,
    ContainerComponent,
  ],
  styleUrls: ['./compliance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplianceComponent {
  accountInfoStore = inject(AccountInfoStore);
  compliance = computed(() => this.accountInfoStore.getCompliance());
}
