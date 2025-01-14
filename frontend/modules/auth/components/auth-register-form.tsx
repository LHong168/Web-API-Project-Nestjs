'use client';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import Link from 'next/link';
import { RegisterFormData, useRegisterForm } from '../hooks/use-register-form';
import { Input, PasswordInput } from '@/components/atoms/input';
import { useAuth } from '../hooks/use-auth';
import { useRouter } from 'next/navigation';

export const AuthRegisterForm: React.FC = () => {
  const { register, handleSubmit, formState } = useRegisterForm();
  const { register: authRegister, loading } = useAuth();
  const router = useRouter();

  const { errors } = formState;

  async function onSubmit(data: RegisterFormData) {
    const res = await authRegister({ ...data });
    if (res) router.push(ROUTES.DASHBOARD);
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
        Create an account
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
          Login here
        </Link>
      </p>
    </form>
  );
};
