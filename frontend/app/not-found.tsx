import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="relative grid min-h-[80vh] place-items-center px-6 lg:px-8">
      <div className="flex flex-col space-y-6 text-center">
        <p className="text-7xl font-bold text-primary md:text-8xl">404</p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>

        <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base">
          The page you are looking for is unavailable.
        </p>

        <Button size="lg" asChild>
          <Link
            href="/"
            className="bg-darkBlue mx-auto w-fit rounded-md px-5 py-3 font-sans text-base font-bold text-white duration-150 hover:border-primary-600 hover:bg-primary-600 lg:px-6 lg:py-4"
          >
            Go back home
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
