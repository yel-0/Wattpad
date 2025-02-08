import { User } from "@/types/User";

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

export default async function Home() {
  const users = await getUsers(); // Server-side fetch

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-xl font-bold">Welcome to Next.js</h1>

      <div className="w-full max-w-lg">
        <h2 className="text-lg font-semibold">User List</h2>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user._id} className="p-2 border rounded-lg">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
