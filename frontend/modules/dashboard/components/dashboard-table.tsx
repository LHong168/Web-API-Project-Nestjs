'use client';

import { ROUTES } from '@/config/routes';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { deleteUsers } from '../api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { useGetUsers } from '../hooks/use-get-users';
import { invalidateQuery } from '@/provider';

export const DashboardTable: React.FC = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetUsers();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
          {!isLoading &&
            data?.map(x => (
              <tr key={x.id} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">{x.username}</th>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">{x.email}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">{x.role}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex gap-3">
                    <Link href={ROUTES.EDIT$(x.id)} className="underline-offset-2 hover:underline">
                      Edit
                    </Link>
                    {user && x.id !== user.id && <DeleteAlertDialog id={x.id} />}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const DeleteAlertDialog: React.FC<{ id: number }> = ({ id }) => {
  const { toast } = useToast();

  async function handleDelete() {
    await deleteUsers(id);
    invalidateQuery();
    toast({ title: 'Success', variant: 'success' });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-500 underline-offset-2 hover:underline">Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
