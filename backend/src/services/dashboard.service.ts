import prisma from '../client.ts';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

interface DashboardStats {
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

interface ActivityItem {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
}

/**
 * Get dashboard statistics
 * @returns {Promise<DashboardStats>}
 */
const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
        // Get total users count
        const totalUsers = await prisma.user.count();
        
        // Get active users (users created in the last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const activeUsers = await prisma.user.count({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo
                }
            }
        });

        // Mock revenue and conversion data (would come from actual payment/analytics service)
        const totalRevenue = 123456.78;
        const conversionRate = 3.24;

        // Mock percentage changes (would be calculated from historical data)
        const percentChanges = {
            users: 12.5,
            revenue: 8.3,
            conversionRate: -2.1
        };

        return {
            totalUsers,
            activeUsers,
            totalRevenue,
            conversionRate,
            percentChanges
        };
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch dashboard statistics');
    }
};

/**
 * Get recent activity feed
 * @returns {Promise<ActivityItem[]>}
 */
const getRecentActivity = async (): Promise<ActivityItem[]> => {
    try {
        // Get recent users for activity feed
        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });

        // Create activity items from recent users
        const activities: ActivityItem[] = recentUsers.map((user, index) => ({
            id: user.id.toString(),
            type: 'user_registered',
            description: 'New user registration',
            timestamp: user.createdAt.toISOString(),
            user: user.name || user.email
        }));

        // Add some mock activities to demonstrate different activity types
        const mockActivities: ActivityItem[] = [
            {
                id: '1000',
                type: 'payment_completed',
                description: 'Payment processed successfully',
                timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
                user: 'Bob Wilson'
            },
            {
                id: '1001',
                type: 'user_login',
                description: 'User logged in',
                timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
                user: 'Alice Johnson'
            },
            {
                id: '1002',
                type: 'data_export',
                description: 'Data export requested',
                timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
                user: 'Charlie Brown'
            }
        ];

        // Combine and sort by timestamp (newest first)
        const allActivities = [...activities, ...mockActivities];
        allActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return allActivities.slice(0, 10); // Return top 10 most recent activities
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch recent activity');
    }
};

export default {
    getDashboardStats,
    getRecentActivity
};