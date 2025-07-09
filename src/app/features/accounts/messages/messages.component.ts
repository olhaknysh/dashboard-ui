import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';

import { AccountInfoStore } from '../../../store/accounts';
import { AccountContainerComponent } from '../account-container';
import {
  ButtonComponent,
  ContainerComponent,
  SearchComponent,
} from '../../../shared';

import { MessagesElementComponent } from './components';
import { Message } from '../../../services';

@Component({
  selector: 'app-messages',
  imports: [
    MessagesElementComponent,
    AccountContainerComponent,
    ContainerComponent,
    SearchComponent,
    ButtonComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-account-container title="Messages">
      <app-container>
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <app-search
            [placeholder]="'Search messages'"
            (searchChange)="onSearchChange($event)"
          ></app-search>
          <div class="flex gap-2">
            <app-button appearance="outlined" icon="filter" size="md">
              Filter
            </app-button>
            <app-button appearance="outlined" icon="sort" size="md">
              Sort
            </app-button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          @for (message of filteredMessages(); track message.id) {
            <app-messages-element [message]="message"></app-messages-element>
          }
        </div>
      </app-container>
    </app-account-container>
  `,
})
export class MessagesComponent {
  private readonly accountInfoStore = inject(AccountInfoStore);
  messages = this.accountInfoStore.getMessages;

  filteredMessages = signal<Message[]>([]);

  constructor() {
    effect(() => {
      this.filteredMessages.set(this.messages());
    });
  }

  onSearchChange(event: string) {
    this.filteredMessages.set(
      this.messages().filter((message) =>
        message.title.toLowerCase().includes(event.toLowerCase()),
      ),
    );
  }
}
