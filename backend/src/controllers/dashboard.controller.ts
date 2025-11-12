import { dashboardService } from '../services/index.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import httpStatus from 'http-status';

const getDashboardStats = catchAsyncWithAuth(async (req, res) => {
    const stats = await dashboardService.getDashboardStats();
    res.status(httpStatus.OK).send(stats);
});

const getRecentActivity = catchAsyncWithAuth(async (req, res) => {
    const activity = await dashboardService.getRecentActivity();
    res.status(httpStatus.OK).send(activity);
});

export default {
    getDashboardStats,
    getRecentActivity
};