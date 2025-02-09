import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/types/User";

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions); // Get session data
  const users = await getUsers(); // Fetch users
  console.log(session);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-xl font-bold">Welcome to Next.js</h1>

      {/* Display session info */}
      <div className="p-4 border rounded-lg bg-gray-100 w-full max-w-lg text-center">
        {session ? (
          <>
            <p className="font-semibold">Logged in as:</p>
            <p>
              {session.user?.name} ({session.user?.email}):(
              {session.user?.isAdmin ? "admin" : "user"})
            </p>
          </>
        ) : (
          <p className="text-red-500">Not logged in</p>
        )}
      </div>

      {/* User List */}
      <div className="w-full max-w-lg">
        <h2 className="text-lg font-semibold">User List</h2>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user._id} className="p-2 border rounded-lg">
              {user.name} - {user.email} - {user.isAdmin ? "Admin" : "User"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
