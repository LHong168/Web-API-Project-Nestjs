import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { getUsers } from "@/modules/dashboard/api/get-user";
import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";
import Link from "next/link";

export default async function Page() {
  const data = await getUsers();

  return (
    <>
      <div className="flex justify-between items-center mx-auto mt-6 mb-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button className="font-bold" asChild>
          <Link href={ROUTES.CREATE}>Create User</Link>
        </Button>
      </div>
      <DashboardTable data={data} />
    </>
  );
}
