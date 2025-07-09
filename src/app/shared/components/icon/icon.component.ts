import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <mat-icon
      [fontIcon]="fontIcon()"
      [style.fontSize.px]="size()"
      (click)="iconClick.emit($event)"
      (keydown)="iconKeydown.emit($event)"
      tabindex="0"
    ></mat-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  fontIcon = input<string>('');
  size = input<number | string>(20);

  iconClick = output<Event>();
  iconKeydown = output<KeyboardEvent>();
}
