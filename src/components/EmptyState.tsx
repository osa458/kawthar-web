import { Search, Calendar, Store, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: 'search' | 'calendar' | 'store' | 'users';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon = 'search', 
  title, 
  description, 
  action, 
  className 
}: EmptyStateProps) {
  const icons = {
    search: Search,
    calendar: Calendar,
    store: Store,
    users: Users
  };

  const IconComponent = icons[icon];

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <IconComponent className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

