import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { AccountContainerComponent } from '../account-container';
import { ContainerComponent } from '../../../shared';
import { AccountSpecificationStore } from '../../../store/accounts';
import {
  AccountSpecificationInfo,
  AccountSpecificationService,
} from '../../../services';

import { SpecificationTreeComponent } from './specification-tree';
import { SpecificationInfoComponent } from './specification-info';

@Component({
  selector: 'app-account-specification',
  standalone: true,
  template: `
    <app-account-container title="Account Specification">
      <app-container>
        <div class="grid sm:grid-cols-[1fr_3fr] grid-cols-1 gap-4">
          <app-specification-tree
            [currentNode]="currentNode()"
            [tree]="tree()"
            (nodeSelected)="onNodeSelected($event)"
          ></app-specification-tree>
          <app-specification-info [info]="info()"></app-specification-info>
        </div>
      </app-container>
    </app-account-container>
  `,
  imports: [
    AccountContainerComponent,
    ContainerComponent,
    SpecificationTreeComponent,
    SpecificationInfoComponent,
  ],
})
export class AccountSpecificationComponent implements OnInit {
  accountSpecificationStore = inject(AccountSpecificationStore);
  accountSpecificationService = inject(AccountSpecificationService);
  tree = this.accountSpecificationStore.getTree;

  info = signal<AccountSpecificationInfo | null>(null);
  currentNode = computed(() => this.info()?.id ?? null);

  ngOnInit() {
    this.onNodeSelected('winnability');
  }

  onNodeSelected(node: string) {
    this.accountSpecificationService
      .getSpecificationInfo(node)
      .pipe(take(1))
      .subscribe((info) => {
        this.info.set(info);
      });
  }
}
