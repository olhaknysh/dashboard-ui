import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

import {
  ButtonComponent,
  ContainerComponent,
  CopyPasteDirective,
  ContainerTitleComponent,
  InputComponent,
} from '../../shared';
import { UserStore } from '../../store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    ButtonComponent,
    ContainerTitleComponent,
    ContainerComponent,
    InputComponent,
    CopyPasteDirective,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly userStore = inject(UserStore);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.userStore.login(credentials);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 6 characters`;
    }
    return '';
  }

  get isLoading(): boolean {
    return this.userStore.isLoggingIn();
  }

  get errorMessage(): string {
    return this.userStore.error() || '';
  }
}
