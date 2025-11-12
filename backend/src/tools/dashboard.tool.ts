import { dashboardService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import { z } from 'zod';

const dashboardStatsSchema = z.object({
    totalUsers: z.number(),
    activeUsers: z.number(),
    totalRevenue: z.number(),
    conversionRate: z.number(),
    percentChanges: z.object({
        users: z.number(),
        revenue: z.number(),
        conversionRate: z.number()
    })
});

const activityItemSchema = z.object({
    id: z.string(),
    type: z.string(),
    description: z.string(),
    timestamp: z.string(),
    user: z.string()
});

const getDashboardStatsTool: MCPTool = {
    id: 'dashboard_get_stats',
    name: 'Get Dashboard Statistics',
    description: 'Get dashboard statistics including total users, active users, revenue, and conversion metrics',
    inputSchema: z.object({}), // No input parameters required
    outputSchema: dashboardStatsSchema,
    fn: async () => {
        const stats = await dashboardService.getDashboardStats();
        return stats;
    }
};

const getRecentActivityTool: MCPTool = {
    id: 'dashboard_get_recent_activity',
    name: 'Get Recent Activity',
    description: 'Get recent activity feed showing system activities and events',
    inputSchema: z.object({}), // No input parameters required
    outputSchema: z.object({
        activities: z.array(activityItemSchema)
    }),
    fn: async () => {
        const activities = await dashboardService.getRecentActivity();
        return { activities };
    }
};

export const dashboardTools: MCPTool[] = [getDashboardStatsTool, getRecentActivityTool];