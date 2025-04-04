import { SearchStoryCard } from "@/app/components/Share/SearchStoryCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, BookOpen, Users, Settings } from "lucide-react";
import Link from "next/link";
import { Facebook, Twitter } from "lucide-react";
import FollowUserCard from "@/app/components/Share/FollowUserCard";

const stories = [
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Hero's Journey",
    description:
      "An epic tale of a young hero who embarks on an incredible journey to save the world from an ancient evil force. Along the way, he will face unimaginable challenges, forge alliances, and discover the true power within himself. Will he succeed or fall to the darkness that threatens to consume everything?",
    reads: "120K",
    votes: "15K",
    parts: "35",
    time: "2h ago",
    isComplete: false,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Villain's Redemption",
    description:
      "After years of wreaking havoc and causing destruction, a notorious villain begins to question his choices. Driven by a sudden change of heart, he sets out to redeem himself and seek forgiveness from those he wronged. But the path to redemption is not easy, and he must face both internal and external battles to reclaim his humanity.",
    reads: "98K",
    votes: "10K",
    parts: "40",
    time: "1d ago",
    isComplete: true,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Lost in Time",
    description:
      "A young scientist accidentally discovers a time portal, sending her on a thrilling adventure through different time periods. From ancient civilizations to a dystopian future, she must navigate each era to find her way back home. Along the journey, she uncovers secrets that could alter the course of history forever.",
    reads: "200K",
    votes: "30K",
    parts: "50",
    time: "5h ago",
    isComplete: false,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "The Shadow Warrior",
    description:
      "A skilled ninja, trained in the ancient ways of shadow warfare, is called upon to defeat a dangerous warlord threatening his homeland. However, his journey is more than just about battle—it’s a test of honor, courage, and loyalty. Will he overcome the darkness within himself to protect the ones he loves?",
    reads: "150K",
    votes: "20K",
    parts: "45",
    time: "3h ago",
    isComplete: true,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "A Dream to Remember",
    description:
      "A teenager struggles with nightmares that blur the line between reality and fantasy. As the dreams become more vivid and intense, she begins to uncover a hidden world that exists within her subconscious mind. Along the way, she must confront her deepest fears and unravel the mystery behind these terrifying visions.",
    reads: "85K",
    votes: "12K",
    parts: "20",
    time: "7h ago",
    isComplete: false,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Wings of Fire",
    description:
      "In a world where humans coexist with mystical creatures, a young girl discovers that she has the ability to communicate with dragons. As she forms a bond with a dragon, she is thrust into an ancient war between humans and these majestic beings. Will she be able to stop the conflict, or will she be forced to choose a side?",
    reads: "102K",
    votes: "8K",
    parts: "25",
    time: "2d ago",
    isComplete: false,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "The Lost City",
    description:
      "An expedition team sets off to find a long-lost city that was thought to be just a myth. However, the deeper they go, the more they realize that the city holds dark secrets and deadly traps. As they uncover ancient mysteries, they must race against time to escape before it’s too late.",
    reads: "250K",
    votes: "45K",
    parts: "60",
    time: "1w ago",
    isComplete: true,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Echoes of the Past",
    description:
      "A detective investigating a cold case begins to unravel a connection to her own family’s past. As she digs deeper, she finds herself drawn into a web of conspiracy, betrayal, and murder. The deeper she goes, the more dangerous the investigation becomes, and she must decide how far she’s willing to go to uncover the truth.",
    reads: "175K",
    votes: "40K",
    parts: "30",
    time: "6h ago",
    isComplete: false,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "The Forbidden Forest",
    description:
      "A group of explorers venture into a mystical forest that has been off-limits for centuries. Legends speak of magical creatures and ancient ruins hidden within the trees. But as they journey deeper into the forest, they begin to experience strange occurrences, and they realize they might not be alone.",
    reads: "95K",
    votes: "5K",
    parts: "18",
    time: "3d ago",
    isComplete: true,
  },
  {
    cover:
      "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Beyond the Horizon",
    description:
      "A group of astronauts embarks on a dangerous mission to explore a new planet beyond the horizon of known space. As they encounter alien species and uncover the mysteries of the planet, they must confront their own fears and doubts. Will they find hope, or will they discover a fate worse than death?",
    reads: "300K",
    votes: "60K",
    parts: "70",
    time: "1d ago",
    isComplete: false,
  },
];

const UserProfile = () => {
  return (
    <div>
      <div
        className="flex justify-center items-center h-[400px] p-6"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1739268515254-631fda640a1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md border-none  bg-transparent text-white  p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage
                src="https://images.unsplash.com/photo-1739325755246-0000aca42302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
                alt="User Image"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className=" flex items-center gap-2">
              <Mail size={16} /> john.doe@example.com
            </p>
          </div>
          <div className="mt-6 flex justify-between text-center">
            <div className="flex flex-col items-center gap-1">
              <Briefcase size={20} />
              <span>Software Engineer</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BookOpen size={20} />
              <span>Reading List</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users size={20} />
              <span>Followers: 120</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around border-b items-center  p-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Conversation</Link>
          <Link href={"#"}>Following</Link>
        </div>

        <Button>
          <Settings /> Edit
        </Button>
      </div>
      <div className="min-h-screen">
        <div>
          <div className="container mx-auto  flex flex-col justify-center items-center">
            <div className="flex flex-row px-4 py-2 w-[650px] justify-between items-center">
              <div>Stories By Yel</div>
              <Button>
                <Settings />
              </Button>
            </div>
            {/* {stories.map((story, index) => (
              <SearchStoryCard
                key={index}
                cover={story.cover}
                title={story.title}
                description={story.description}
                reads={story.reads}
                votes={story.votes}
                parts={story.parts}
                time={story.time}
                isComplete={story.isComplete}
              />
            ))} */}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <FollowUserCard />
      </div>
    </div>
  );
};

export default UserProfile;
