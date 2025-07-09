import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="user-avatar">
      @if (avatarUrl() && avatarUrl() !== '') {
        <img [src]="avatarUrl()" [alt]="name()" class="avatar-image" />
      } @else {
        <div class="avatar-fallback">
          <mat-icon>person</mat-icon>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .user-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--dark-blue);
        overflow: hidden;
      }

      .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: var(--dark-blue);
        color: var(--title-color);
      }

      .avatar-fallback mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    `,
  ],
})
export class UserAvatarComponent {
  name = input.required<string>();

  avatarUrl = computed(() => {
    const encodedName = encodeURIComponent(this.name());
    return `https://ui-avatars.com/api/?name=${encodedName}&background=3b82f6&color=ffffff`;
  });
}
