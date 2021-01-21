import { User } from 'src/contrats/types';

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): Promise<void>;
  can(permission: string | undefined): boolean;
  loading: boolean;
}
