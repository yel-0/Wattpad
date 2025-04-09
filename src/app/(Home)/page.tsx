import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { BookCarousel } from "../components/User/BookCarousel";
import { StoryCarousel } from "../components/User/StoryCarousel";
import ImageCarousel from "../components/User/ImageCarousel";
import { FetchStoriesByCategoryName } from "../(acttion)/Story/action";
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

const stories = [
  {
    imageUrl: "https://img.wattpad.com/cover/94569890-256-k537385.jpg",
    title: "Only You",
    altText: "Only You Cover",
    reads: "7.4M",
    description:
      "Charlotte agrees to fake date bad boy Mason to make her best friend jealous. But as lines blur, feelings change, and rules are broken. What starts as a harmless arrangement quickly escalates, and Charlotte finds herself falling for Mason, despite all the reasons she shouldn't. As their fake relationship becomes more complicated, Charlotte must navigate her growing feelings and the pressure of keeping up the lie.",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/94569890-256-k537385.jpg",
    title: "The Last Night",
    altText: "The Last Night Cover",
    reads: "3.2M",
    description:
      "A mysterious stranger appears in town, changing everything. His arrival brings secrets to light, unraveling the quiet life of the town and introducing dangerous new dynamics. As the night unfolds, alliances are tested, and hidden truths are revealed, leading to a series of events that no one could have predicted. Will the stranger’s presence be a blessing or a curse for those involved?",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/94569890-256-k537385.jpg",
    title: "Only You",
    altText: "Only You Cover",
    reads: "7.4M",
    description:
      "Charlotte agrees to fake date bad boy Mason to make her best friend jealous. However, as their fake romance progresses, Charlotte begins to see another side of Mason—one that makes her question everything she thought she knew about him. The line between fake and real becomes increasingly hard to distinguish, and Charlotte must decide whether she is still in control of the situation or if her feelings are now in charge.",
  },
  {
    imageUrl: "https://img.wattpad.com/cover/94569890-256-k537385.jpg",
    title: "The Last Night",
    altText: "The Last Night Cover",
    reads: "3.2M",
    description:
      "A mysterious stranger appears in town, changing everything. As tensions rise, the town's calm facade starts to crack, revealing dark secrets buried deep within. With every passing hour, the stranger’s true motives come into question, and the town must come together to confront the truth—before it's too late. Can anyone trust the stranger, or has their arrival set in motion a series of irreversible events?",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { stories } = await FetchStoriesByCategoryName(1, "");
  const { stories: Adventure } = await FetchStoriesByCategoryName(
    1,
    "adventure"
  );
  const { stories: editorPick } = await FetchStoriesByCategoryName(1, "", 4);

  const actionStories = JSON.parse(JSON.stringify(stories));

  const adv = JSON.parse(JSON.stringify(Adventure));

  const editor = JSON.parse(JSON.stringify(editorPick));

  return (
    <main className="container mx-auto px-4 md:px-10 lg:px-20 mt-5">
      <ImageCarousel />
      <div className="text-lg my-6 sm:text-xl font-semibold text-black">
        Featured Books
      </div>
      <BookCarousel books={actionStories} />

      <div className="text-sm mt-6  text-black opacity-75">
        Fall head over heels
      </div>
      <div className="text-lg sm:text-xl font-semibold text-black">
        Love at first sentence 📖💘
      </div>
      <BookCarousel books={actionStories} />

      <StoryCarousel stories={editor} />

      <div className="text-sm mt-6  text-black opacity-75">
        Fall head over heels
      </div>
      <div className="text-lg sm:text-xl font-semibold text-black">
        Love at first sentence 📖💘
      </div>
      <BookCarousel books={actionStories} />
      <StoryCarousel stories={editor} />

      <div className="text-sm mt-6  text-black opacity-75">
        Fall head over heels
      </div>

      <div className="text-lg sm:text-xl font-semibold text-black">
        Love at first sentence 📖💘
      </div>
      <BookCarousel books={actionStories} />
    </main>
  );
}
