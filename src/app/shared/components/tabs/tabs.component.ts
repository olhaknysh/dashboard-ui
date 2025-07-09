import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { Tab } from './tabs.interfaces';

@Component({
  selector: 'app-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  tabs = input<Tab[]>([]);
  activeTabId = input<string>('');

  tabChange = output<string>();

  getActiveTabIndex(): number {
    return this.tabs().findIndex((tab) => tab.id === this.activeTabId());
  }

  onTabIndexChange(index: number): void {
    const tab = this.tabs()[index];
    const isTabActionable = tab && !tab.disabled;

    if (!isTabActionable) {
      return;
    }

    this.tabChange.emit(tab.id);
  }
}
