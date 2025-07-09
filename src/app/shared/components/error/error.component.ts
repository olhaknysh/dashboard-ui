import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  template: ` <div class="text-center text-red-400 py-4">{{ error() }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  error = input<string>('');
}
