import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

import { UserStore, TaskStore } from '../../../store';
import {
  SearchComponent,
  ButtonComponent,
  UserAvatarComponent,
} from '../../../shared';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchComponent,
    ButtonComponent,
    UserAvatarComponent,
    MatDividerModule,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly userStore = inject(UserStore);
  protected readonly taskStore = inject(TaskStore);
  private readonly router = inject(Router);

  onSearchChange(value: string) {
    this.taskStore.setSearchTerm(value);
  }

  clearSearch() {
    this.taskStore.clearSearch();
  }

  logout() {
    this.userStore.logout();
    this.router.navigate(['/auth']);
  }
}
