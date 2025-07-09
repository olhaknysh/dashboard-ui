export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isLoggingIn: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
