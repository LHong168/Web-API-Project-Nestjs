"use client";

import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";
import { DashboardTitle } from "@/modules/dashboard/components/dashboard-title";

export default function Page() {
  return (
    <>
      <DashboardTitle />
      <DashboardTable />
    </>
  );
}
