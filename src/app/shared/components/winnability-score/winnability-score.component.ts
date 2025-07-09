import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-winnability-score',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="winnability-score-row">
      @for (dot of dots(); track $index) {
        <span class="winnability-dot"></span>
      }
    </div>
  `,
  styles: [
    `
      .winnability-score-row {
        display: flex;
        gap: 4px;
        align-items: center;
      }
      .winnability-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--dark-blue);
      }
    `,
  ],
})
export class WinnabilityScoreComponent {
  score = input<number>(0);
  dots = computed(() => Array(this.score()).fill(undefined));
}
