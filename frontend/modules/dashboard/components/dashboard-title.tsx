'use client';

import { useAuth } from '@/modules/auth/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export const DashboardTitle: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto mb-10 mt-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && user.role === 'ADMIN' && (
        <Button className="font-bold" asChild>
          <Link href={ROUTES.CREATE}>Create User</Link>
        </Button>
      )}
    </div>
  );
};
