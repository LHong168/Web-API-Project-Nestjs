import { DashboardHeader } from '@/modules/dashboard/components/dashboard-header';

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <DashboardHeader />
      <div className="container">{children}</div>
    </>
  );
}
