import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { DashboardCreateForm } from '@/modules/dashboard/components/dashboard-create-form';

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <Button className="mt-5 flex w-fit px-0 text-base" variant="link" asChild>
        <Link href={ROUTES.DASHBOARD}>
          <ChevronLeft className="!size-5" />
          back
        </Link>
      </Button>

      <div className="mx-auto mb-10 mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create</h1>
      </div>

      <DashboardCreateForm />
    </div>
  );
}
