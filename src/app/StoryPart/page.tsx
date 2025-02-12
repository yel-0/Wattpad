"use client";

import { Heart, Share2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChapterSelect } from "../components/Share/ChapterSelect";

export default function StoryReader() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative px-4 border-b flex items-center justify-between gap-4 w-full">
        {/* Chapter Select */}
        <ChapterSelect />

        {/* Buttons + Vote with Star Icon */}
        <div className="flex gap-4">
          <Button variant="outline" className="px-4 py-2">
            +
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Vote
          </Button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Chapter 3.</h2>

        <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>👁️</span>
            <span>1.4M</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>70.7K</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>41K</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1738683987582-b52d371d2782?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D" />
              <AvatarFallback>HI</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">by HonorInTheRain</div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Follow
              </Button>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Story Text */}
          <div className="prose max-w-none  text-gray-800 leading-relaxed">
            <p className="mb-4">
              The phone rang at exactly 11:37 PM, as it had every night for the
              past two weeks. Amelia had been avoiding it, watching it ring from
              across the room. She knew it was the same untraceable number. But
              tonight, something felt different. There was an odd sense of
              urgency in the stillness of her apartment.
            </p>

            <p className="mb-4">
              With a deep breath, she picked up the phone.{" "}
              <span className="font-semibold">“Hello?”</span> Her voice was
              quiet, shaky.
            </p>

            <p className="mb-4">
              Static crackled on the other end, followed by a soft, haunting
              melody—a lullaby. Her mother had sung it to her when she was
              little, the one song that still echoed in her mind after all these
              years. The piano notes, slow and deliberate, filled her ears.
            </p>

            <p className="mb-4">
              The static cleared, and a voice whispered through the phone.{" "}
              <span className="font-semibold">
                “They’re waiting for you, Amelia. You know where to find us.”
              </span>
            </p>

            <p className="mb-4">
              Before she could respond, the line went dead. The melody lingered
              in her mind. Confused and scared, Amelia’s thoughts raced back to
              her childhood. Her mother had vanished without a trace when Amelia
              was just ten. The police had said it was a runaway case. But the
              stories in town, the whispers in the dark, said something
              different. Something darker. And tonight, the voice on the phone
              had reminded her of those unsettling memories.
            </p>

            <p className="mb-4">
              Without thinking, Amelia grabbed her coat and car keys and rushed
              out the door. The cold wind hit her as she drove through the quiet
              streets, her hands gripping the wheel tightly. Her heart pounded
              with each mile.
            </p>

            <p className="mb-4">
              She arrived at the old house on Elm Street, the one she had
              avoided for years. It had been abandoned, covered in vines, with
              windows that were too dark to peer through. The same house where
              her mother had lived before she disappeared.
            </p>

            <p className="mb-4">
              Amelia stepped out of the car, feeling the chill of the air seep
              into her bones. As she approached the house, the front door
              creaked open, as if waiting for her. The piano played softly
              again, just like in the phone call, from somewhere deep within the
              house. Her heart skipped a beat. Amelia hesitated, but something
              inside pushed her forward.
            </p>

            <p className="mb-4">
              Inside, the house smelled of dust and age. The floorboards groaned
              beneath her feet as she walked down the dim hallway. At the end of
              the room, there it was—the grand piano. The same one she
              remembered. She walked towards it, hands trembling as she sat down
              on the bench.
            </p>

            <p className="mb-4">
              Her fingers instinctively found the keys. The lullaby. She played
              the first few notes, a rush of memories flooding her mind. The
              melody filled the room, and just as she played the final note, the
              house shook.
            </p>

            <p className="mb-4">
              A hidden door in the wall opened, revealing a staircase leading
              down into darkness. The air around her seemed to grow heavier, as
              if the house itself were alive, watching her every move. Amelia’s
              breath caught in her throat, but she couldn’t turn back. She
              stepped down the staircase, the darkness swallowing her whole.
            </p>

            <p className="mb-4">
              At the bottom, she found a small room, its walls lined with
              photographs. But these weren’t just any photos—they were of
              Amelia, from different times in her life. But they weren’t her.
              They were images of her mother, standing just behind her, looking
              at her with sorrowful eyes.
            </p>

            <p className="mb-4">
              The final photograph showed a woman standing at a mirror. Amelia
              turned to face it. Her own reflection wasn’t what she expected. It
              was her mother, her face filled with a mixture of love and regret.
            </p>

            <p className="italic mb-4 text-gray-700">
              “Amelia…” the reflection whispered, her voice almost lost in the
              shadows. “You’ve finally come.”
            </p>

            <p className="mb-4">
              The room around her began to close in, the door slamming shut
              behind her. The air thickened. Amelia’s reflection in the mirror
              slowly began to fade, but her mother’s face remained, beckoning.
            </p>

            <p className="mb-4">
              <span className="font-semibold">
                “You’ve been looking for answers, haven’t you?”
              </span>{" "}
              Amelia stepped forward, her heart pounding, her past and her
              future colliding in that dark room. The truth was closer than she
              had ever imagined.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
