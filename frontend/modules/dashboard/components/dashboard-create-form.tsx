'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input, PasswordInput } from '@/components/atoms/input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { useToast } from '@/hooks/use-toast';
import { invalidateQuery } from '@/provider';

import { createUsers } from '../api';
import { CreateFormData, useCreateForm } from '../hooks/use-create-form';

export const DashboardCreateForm: React.FC = () => {
  const { register, handleSubmit, formState } = useCreateForm();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { errors } = formState;

  async function onSubmit(data: CreateFormData) {
    try {
      setLoading(true);
      await createUsers(data);
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
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" {...register('username')} error={errors.username?.message} placeholder="Ex: John Doe" />

      <Input label="Email" {...register('email')} error={errors.email?.message} placeholder="username@gmail.com" />

      <PasswordInput
        label="Password"
        {...register('password')}
        error={errors.password?.message}
        placeholder="••••••••"
      />

      <PasswordInput
        label="Confirm Password"
        {...register('confirm_password')}
        error={errors.confirm_password?.message}
        placeholder="••••••••"
      />

      <Button type="submit" className="w-full" disabled={loading}>
        Submit
      </Button>
    </form>
  );
};
