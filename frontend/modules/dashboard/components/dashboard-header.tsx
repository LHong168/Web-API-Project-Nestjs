'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/config/routes';
import { useAuth } from '@/modules/auth/hooks/use-auth';

export const DashboardHeader: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace(ROUTES.LOGIN);
  }

  return (
    <div className="bg-primary-700">
      <nav className="container mx-auto flex flex-wrap items-center justify-end p-4">
        <div className="w-fit">
          <ul className="mt-4 flex space-x-4 p-4 font-medium text-white md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
            <li className="underline-offset-4 hover:underline">
              <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
            </li>
            <li className="cursor-pointer underline-offset-4 hover:underline" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
