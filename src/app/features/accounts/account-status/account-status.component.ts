import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountInfoStore } from '../../../store';
import { ContainerComponent } from '../../../shared';
import { AccountContainerComponent } from '../account-container';

import { ACCOUNT_STATUS_STEPS } from './account-status.component.constant';

@Component({
  selector: 'app-account-status',
  standalone: true,
  imports: [CommonModule, ContainerComponent, AccountContainerComponent],
  templateUrl: './account-status.component.html',
  styleUrls: ['./account-status.component.scss'],
})
export class AccountStatusComponent {
  accountInfoStore = inject(AccountInfoStore);
  currentStep = computed(() => this.accountInfoStore.getCurrentStep());

  steps = ACCOUNT_STATUS_STEPS;
}
