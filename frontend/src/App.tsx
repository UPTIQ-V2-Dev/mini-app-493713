import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { ROUTES } from './types/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent = () => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-background">
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route path={ROUTES.DASHBOARD} element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path={ROUTES.PROFILE} element={
              <ProtectedRoute>
                <ComingSoonPage 
                  title="Profile" 
                  description="Manage your profile information and settings." 
                />
              </ProtectedRoute>
            } />
            
            <Route path={ROUTES.SETTINGS} element={
              <ProtectedRoute>
                <ComingSoonPage 
                  title="Settings" 
                  description="Configure your application preferences." 
                />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path={ROUTES.HOME} element={
              <Navigate to={auth.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={
              <Navigate to={auth.isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />
            } />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthContext.Provider>
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};
