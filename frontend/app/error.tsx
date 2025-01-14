'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[80vh] place-items-center px-6 lg:px-8">
      <div className="flex flex-col space-y-6 text-center">
        <p className="text-7xl font-bold text-primary md:text-8xl">500</p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Server Error</h1>

        <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
          Oop something went wrong, Try to refresh this page or feel free contact us if the problems persists.
        </p>

        <Button className="w-fit self-center" asChild>
          <Link href="/">
            Back Home
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
