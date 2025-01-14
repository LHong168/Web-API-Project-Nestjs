import { getUsers } from "@/modules/dashboard/api";
import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";
import { DashboardTitle } from "@/modules/dashboard/components/dashboard-title";

export default async function Page() {
  const data = await getUsers();

  return (
    <>
      <DashboardTitle />
      <DashboardTable data={data} />
    </>
  );
}
