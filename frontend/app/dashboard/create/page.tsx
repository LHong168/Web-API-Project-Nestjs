import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { DashboardCreateForm } from "@/modules/dashboard/components/dashboard-create-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <Button className="flex mt-5 w-fit px-0 text-base" variant="link" asChild>
        <Link href={ROUTES.DASHBOARD}>
          <ChevronLeft className="!size-5" />
          back
        </Link>
      </Button>

      <div className="flex justify-between items-center mx-auto mt-6 mb-10">
        <h1 className="text-2xl font-bold">Create</h1>
      </div>

      <DashboardCreateForm />
    </div>
  );
}
