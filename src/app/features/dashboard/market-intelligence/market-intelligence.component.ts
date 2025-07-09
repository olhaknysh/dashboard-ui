import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketIntelligenceStore } from '../../../store';
import { ContainerComponent, ContainerTitleComponent } from '../../../shared';

import { MarketIntelligencePointComponent } from './components';

@Component({
  selector: 'app-market-intelligence',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MarketIntelligencePointComponent,
    ContainerComponent,
    ContainerTitleComponent,
  ],
  template: `
    <app-container>
      <app-container-title>Market Intelligence</app-container-title>
      <div class="flex flex-col gap-2">
        @for (item of points(); track $index) {
          <app-market-intelligence-point
            [status]="item.status"
            [text]="item.text"
          ></app-market-intelligence-point>
        }
      </div>
    </app-container>
  `,
})
export class MarketIntelligenceComponent {
  private readonly marketStore = inject(MarketIntelligenceStore);
  points = this.marketStore.getPoints;
}
