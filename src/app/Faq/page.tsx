"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const faq = [
  {
    question: "What is Wattpad?",
    answer:
      "Wattpad is a platform where writers can share their stories, readers can explore a vast library of content, and communities can come together to discuss their favorite books. Whether you're an aspiring author or an avid reader, Wattpad offers tools to enhance your experience, from real-time feedback to customizable reading modes.",
  },
  {
    question: "How can I publish my stories?",
    answer:
      "Publishing on Wattpad is simple. Create an account, navigate to the 'Write' section, and start drafting your story. You can add chapters, format text, and even include images to enhance your storytelling. Once you're ready, hit 'Publish' to share your work with the community!",
  },
  {
    question: "Can I read stories offline?",
    answer:
      "Yes! Wattpad offers an offline reading mode that allows you to download your favorite stories and access them without an internet connection. Simply tap the download icon on a story, and it will be available in your offline library.",
  },
  {
    question: "How do I support my favorite writers?",
    answer:
      "Supporting writers on Wattpad can be done in multiple ways. You can leave comments and reviews on their stories, share their work with others, or even contribute through our Writer Support Program, which allows fans to send direct monetary support to their favorite authors.",
  },
  {
    question: "Are there premium features?",
    answer:
      "Yes! Wattpad offers a premium membership that includes ad-free reading, exclusive early access to select stories, and enhanced customization options such as different fonts, themes, and background music for immersive reading experiences.",
  },
  {
    question: "Is Wattpad free to use?",
    answer:
      "Absolutely! Wattpad is free for both readers and writers. However, we do offer optional premium features and in-app purchases that enhance the experience for those who want extra perks.",
  },
  {
    question: "How do I interact with other readers and writers?",
    answer:
      "Engage with the community through story comments, private messages, and discussion boards. Wattpad also hosts regular writing contests and book clubs where users can connect, share feedback, and discuss trending stories.",
  },
  {
    question: "What genres are available?",
    answer:
      "Wattpad boasts a wide range of genres, including fantasy, sci-fi, romance, mystery, horror, and more. No matter your taste, you'll find something to love. You can browse trending stories or use our advanced filtering system to discover hidden gems.",
  },
  {
    question: "Can I customize my reading experience?",
    answer:
      "Yes! Our reading interface allows users to change font sizes, switch between light and dark modes, and adjust background colors for optimal comfort. Premium members can even enable audio narration and ambient background music.",
  },
  {
    question: "How can I report inappropriate content?",
    answer:
      "If you come across any content that violates our community guidelines, you can report it directly from the story page. Our moderation team reviews all reports carefully to maintain a safe and respectful platform for all users.",
  },
];

const WattpadFAQ = () => {
  const [value, setValue] = useState<string>();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-screen-lg">
        <h2 className="text-4xl text-orange-500 md:text-5xl !leading-[1.15] font-black tracking-tight">
          Wattpad Help Center
        </h2>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-10">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(0, 5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index + 5}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1  items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default WattpadFAQ;
