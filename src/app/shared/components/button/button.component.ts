import { Component, input, HostBinding, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';

import { ButtonLoaderSize } from './button.component.constant';
import {
  ButtonIconPosition,
  ButtonSize,
  ButtonType,
} from './button.component.interfaces';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  appearance = input<MatButtonAppearance>('text');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  type = input<ButtonType>('button');
  icon = input<string>();
  iconPosition = input<ButtonIconPosition>('left');
  fullWidth = input<boolean>(false);

  loadingSize = computed(() => ButtonLoaderSize[this.size()]);
  showLeftIcon = computed(
    () => this.icon() && this.iconPosition() === 'left' && !this.loading(),
  );
  showRightIcon = computed(
    () => this.icon() && this.iconPosition() === 'right' && !this.loading(),
  );

  clicked = output<void>();

  @HostBinding('class.full-width') get isFullWidth(): boolean {
    return this.fullWidth();
  }

  onClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }
}
