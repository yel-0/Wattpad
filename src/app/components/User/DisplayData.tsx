"use client";

import React, { useEffect, useState } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const DisplayData: React.FC<{ content: any }> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    if (content) {
      // Generate HTML from the Tiptap JSON content
      const html = generateHTML(content, [StarterKit]);
      setHtmlContent(html);
    }
  }, [content]);

  return (
    <div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default DisplayData;
