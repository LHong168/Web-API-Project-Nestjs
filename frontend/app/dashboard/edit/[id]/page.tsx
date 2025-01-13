import { Input, PasswordInput } from "@/components/atoms/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
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
        <h1 className="text-2xl font-bold">Edit</h1>
      </div>

      <form className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <Input placeholder="Ex: John Doe" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <Input placeholder="username@gmail.com" disabled />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <PasswordInput placeholder="••••••••" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm password
          </label>
          <PasswordInput placeholder="••••••••" />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
