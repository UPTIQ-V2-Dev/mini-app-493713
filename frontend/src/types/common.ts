export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  conversionRate: number;
  percentChanges: {
    users: number;
    revenue: number;
    conversionRate: number;
  };
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}