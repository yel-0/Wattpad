import Link from "next/link";

export default function Component() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl text-orange-500 font-bold tracking-tighter sm:text-5xl animate-bounce">
            404
          </h1>
          <p className="text-gray-500">
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md bg-orange-500 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Return to website
        </Link>
      </div>
    </div>
  );
}
