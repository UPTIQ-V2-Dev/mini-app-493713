import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  UsersIcon, 
  UserCheckIcon, 
  DollarSignIcon, 
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
  SettingsIcon,
  BarChart3Icon,
  UserPlusIcon
} from 'lucide-react';
import { getDashboardStats, getRecentActivity } from '../services/dashboard';
import { mockQuickActions } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { formatDistance } from 'date-fns';

export const DashboardPage = () => {
  const { user } = useAuth();
  
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: getRecentActivity,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPercentageIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUpIcon className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDownIcon className="h-4 w-4 text-red-600" />
    );
  };

  const getPercentageColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getIconByName = (iconName: string) => {
    const icons = {
      UserPlus: UserPlusIcon,
      BarChart3: BarChart3Icon,
      Settings: SettingsIcon,
    };
    return icons[iconName as keyof typeof icons] || UserPlusIcon;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : formatNumber(stats?.totalUsers || 0)}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {!statsLoading && stats && (
                  <>
                    {getPercentageIcon(stats.percentChanges.users)}
                    <span className={getPercentageColor(stats.percentChanges.users)}>
                      {Math.abs(stats.percentChanges.users)}% from last month
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : formatNumber(stats?.activeUsers || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Active this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : formatCurrency(stats?.totalRevenue || 0)}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {!statsLoading && stats && (
                  <>
                    {getPercentageIcon(stats.percentChanges.revenue)}
                    <span className={getPercentageColor(stats.percentChanges.revenue)}>
                      {Math.abs(stats.percentChanges.revenue)}% from last month
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? '...' : `${stats?.conversionRate || 0}%`}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {!statsLoading && stats && (
                  <>
                    {getPercentageIcon(stats.percentChanges.conversionRate)}
                    <span className={getPercentageColor(stats.percentChanges.conversionRate)}>
                      {Math.abs(stats.percentChanges.conversionRate)}% from last month
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates from your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activitiesLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {activities?.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {activity.type.replace('_', ' ')}
                          </Badge>
                          {activity.user && (
                            <span className="text-sm font-medium">{activity.user}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistance(new Date(activity.timestamp), new Date(), { addSuffix: true })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockQuickActions.map((action) => {
                const IconComponent = getIconByName(action.icon);
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <div className="cursor-pointer">
                      <IconComponent className="mr-3 h-5 w-5 flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};