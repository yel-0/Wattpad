import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookCarousel } from "./components/User/BookCarousel";
import ImageCarousel from "./components/User/ImageCarousel";

const books = [
  {
    imageUrl: "https://img.wattpad.com/cover/370885712-256-k364296.jpg",
    title: "The Mysterious Island Adventure",
    altText: "Book cover of The Mysterious Island Adventure",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/373735134-256-k921922.jpg",
    title: "Love in the Time of Dragons",
    altText: "Book cover of Love in the Time of Dragons",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/358333470-256-k293411.jpg",
    title: "Cyberpunk Dreams",
    altText: "Book cover of Cyberpunk Dreams",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/356871001-256-k483259.jpg",
    title: "The Last Starship",
    altText: "Book cover of The Last Starship",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/372133889-256-k483649.jpg",
    title: "Whispers in the Wind",
    altText: "Book cover of Whispers in the Wind",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/368841875-256-k102679.jpg",
    title: "Echoes of Eternity",
    altText: "Book cover of Echoes of Eternity",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/225858706-256-k896624.jpg",
    title: "The Alchemist's Daughter",
    altText: "Book cover of The Alchemist's Daughter",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/71858829-256-k649647.jpg",
    title: "Neon Nights",
    altText: "Book cover of Neon Nights",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container mx-auto p-4">
      <ImageCarousel />
      <div className="text-lg my-2 sm:text-xl font-semibold text-black">
        Featured Books
      </div>
      <BookCarousel books={books} />
    </main>
  );
}

{
  /* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
<h1 className="text-xl font-bold">Welcome to Next.js</h1>

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
</div> */
}

// import { User } from "@/types/User";

// async function getUsers(): Promise<User[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Failed to fetch users");

//   return res.json();
// }

// const users = await getUsers();
{
  /* <div className="w-full max-w-lg">
<h2 className="text-lg font-semibold">User List</h2>
<ul className="mt-4 space-y-2">
  {users.map((user) => (
    <li key={user._id} className="p-2 border rounded-lg">
      {user.name} - {user.email} - {user.isAdmin ? "Admin" : "User"}
    </li>
  ))}
</ul>
</div> */
}
