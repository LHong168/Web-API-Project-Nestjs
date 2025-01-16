'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Input, PasswordInput } from '@/components/atoms/input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useToast } from '@/hooks/use-toast';
import { invalidateQuery } from '@/provider';

import { updateUsers } from '../api';
import { EditFormData, useEditForm } from '../hooks/use-edit.form';
import { useGetSingleUser } from '../hooks/use-get-single-user';

export const DashboardEditForm: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useGetSingleUser(id);
  const { register, handleSubmit, formState, reset } = useEditForm();

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { errors, isDirty } = formState;

  const onSubmit = async (formData: EditFormData) => {
    setLoading(true);
    try {
      await updateUsers(id, formData);
      invalidateQuery();
      toast({ title: 'Success', variant: 'success' });
      router.push(ROUTES.DASHBOARD);
    } catch (e) {
      if (e instanceof Error) toast({ title: e.message, variant: 'destructive' });
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) reset({ ...data, password: '' });
  }, [data, reset]);

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" {...register('username')} error={errors.username?.message} placeholder="Ex: John Doe" />

      <Input
        label="Email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="username@gmail.com"
        disabled
      />

      <PasswordInput
        label="Password"
        {...register('password')}
        error={errors.newPassword?.message}
        placeholder="••••••••"
      />

      <PasswordInput
        label="New Password"
        {...register('newPassword')}
        error={errors.password?.message}
        placeholder="••••••••"
      />

      <PasswordInput
        label="Confirm password"
        {...register('confirm_password')}
        error={errors.confirm_password?.message}
        placeholder="••••••••"
      />

      <Button type="submit" className="w-full" disabled={loading || !isDirty}>
        Submit
      </Button>
    </form>
  );
};
