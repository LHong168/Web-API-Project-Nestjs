import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { getUserById } from "@/modules/dashboard/api";
import { DashboardEditForm } from "@/modules/dashboard/components/dashboard-edit-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getUserById(+id);

  return (
    <div className="max-w-3xl mx-auto">
      <Button className="flex mt-5 w-fit px-0 text-base" variant="link" asChild>
        <Link href={ROUTES.DASHBOARD}>
          <ChevronLeft className="!size-5" />
          back
        </Link>
      </Button>

      <div className="flex justify-between items-center mx-auto mt-6 mb-10">
        <h1 className="text-2xl font-bold">Edit</h1>
      </div>

      <DashboardEditForm data={data} />
    </div>
  );
}
