"use client";

import { ROUTES } from "@/config/routes";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const DashboardHeader: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace(ROUTES.LOGIN);
  }

  return (
    <div className="bg-primary-700">
      <nav className="container flex flex-wrap items-center justify-end mx-auto p-4">
        <div className="w-fit">
          <ul className="text-white font-medium flex p-4 md:p-0 mt-4 space-x-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className="hover:underline underline-offset-4">
              <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
            </li>
            <li
              className="hover:underline underline-offset-4 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
