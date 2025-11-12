import { api } from '../lib/api';
import { mockApiDelay } from '../lib/utils';
import { mockDashboardStats, mockActivities } from '../data/mockData';
import type { DashboardStats, Activity } from '../types/common';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    console.log('--- MOCK API: getDashboardStats ---');
    await mockApiDelay();
    return mockDashboardStats;
  }
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export const getRecentActivity = async (): Promise<Activity[]> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    console.log('--- MOCK API: getRecentActivity ---');
    await mockApiDelay();
    return mockActivities;
  }
  const response = await api.get('/dashboard/recent-activity');
  return response.data;
};