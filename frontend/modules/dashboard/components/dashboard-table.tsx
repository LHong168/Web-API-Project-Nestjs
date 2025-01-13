import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { User } from "../interface";

export const DashboardTable: React.FC<{ data: User[] }> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr
              key={x.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {x.username}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {x.email}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {x.role}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex gap-3">
                  <Link
                    href={ROUTES.EDIT$(x.id)}
                    className="hover:underline underline-offset-2"
                  >
                    Edit
                  </Link>
                  <Link
                    href="#"
                    className="text-red-500 hover:underline underline-offset-2"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
