export interface RouteParams {
  id?: string;
}

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HOME: '/',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];