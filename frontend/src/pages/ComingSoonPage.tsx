import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon } from 'lucide-react';
import { ROUTES } from '../types/routes';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>
            {description || 'This feature is currently under development and will be available soon.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            We're working hard to bring you this feature. Check back soon for updates!
          </p>
          <Button asChild className="w-full">
            <Link to={ROUTES.DASHBOARD}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};