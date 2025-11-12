import type { PaginatedResponse } from '../types/api';
import type { AuthResponse, User, DashboardStats, Activity, QuickAction } from '../types/common';

export const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export const mockAdminUser: User = {
    id: '2',
    email: 'admin@example.com',
    firstName: 'Jane',
    lastName: 'Smith'
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token-123456789',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        },
        refresh: {
            token: 'mock-refresh-token-987654321', 
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        }
    }
};

export const mockDashboardStats: DashboardStats = {
    totalUsers: 12543,
    activeUsers: 8432,
    totalRevenue: 123456.78,
    conversionRate: 3.24,
    percentChanges: {
        users: 12.5,
        revenue: 8.3,
        conversionRate: -2.1
    }
};

export const mockActivities: Activity[] = [
    {
        id: '1',
        type: 'user_registered',
        description: 'New user registration',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        user: 'Alice Johnson'
    },
    {
        id: '2',
        type: 'payment_completed',
        description: 'Payment processed successfully',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        user: 'Bob Wilson'
    },
    {
        id: '3',
        type: 'profile_updated',
        description: 'User profile updated',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        user: 'Carol Davis'
    }
];

export const mockQuickActions: QuickAction[] = [
    {
        id: '1',
        title: 'Add New User',
        description: 'Create a new user account',
        icon: 'UserPlus',
        href: '/users/new'
    },
    {
        id: '2',
        title: 'View Reports',
        description: 'Access analytics and reports',
        icon: 'BarChart3',
        href: '/reports'
    },
    {
        id: '3',
        title: 'Settings',
        description: 'Configure application settings',
        icon: 'Settings',
        href: '/settings'
    }
];

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};
