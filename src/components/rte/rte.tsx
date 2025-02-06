import React, { useEffect } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TypographyExtension from "@tiptap/extension-typography";
import UnderlineExtension from "@tiptap/extension-underline";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Focus from "@tiptap/extension-focus";
import TextAlign from "@tiptap/extension-text-align";

import "./styles.css";

// import { styled } from "@mui/material/styles";

// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { RTEToolbar } from "./toolbar";
import { cn } from "@/utils/cn";

export function RichTextEditor({
  setContent,
  content,
  limit = 5000,
}: {
  setContent: (value: string) => void;
  content: string;
  limit?: number;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Highlight,
      TypographyExtension,
      UnderlineExtension,
      Document,
      Paragraph,
      Text,

      Dropcursor,
      Code,
      CharacterCount.configure({
        limit,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
    ],
    content: content,
  });

  useEffect(() => {
    if (editor) {
      // editor.getHTML();
      setContent(editor.getHTML());
    }
  }, [editor?.state]);

  // React.useMemo(() => {}, [editor?.getHTML()]);

  const percentage = editor
    ? (1 / limit) * editor.storage.characterCount.characters()
    : 0;

  return (
    <div className="flex flex-col w-full rounded-md border border-gray-300 focus:outline-2 focus:outline-blue-600 overflow-hidden  text-sm ">
      {editor ? (
        <RTEToolbar editor={editor} />
      ) : (
        <div role="status" className="w-full animate-pulse ">
          <div className="w-full h-24 lg:h-8 bg-gray-800 rounded-t-md  "></div>
        </div>
      )}
      <EditorContent
        onClick={() => editor?.commands.focus()}
        className="flex flex-col p-1 w-full wrap-words min-h-[140px]"
        editor={editor}
      />
      {editor ? (
        <div
          className={cn(
            "flex justify-center items-center bg-gray-800 p-1 rounded-b-md",
            editor.storage.characterCount.characters() >= limit &&
              "text-red-500"
          )}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            className="character-count__graph"
          >
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke={
                editor.storage.characterCount.characters() >= limit
                  ? "red"
                  : "green"
              }
              strokeWidth="8"
              strokeDasharray={`${percentage * 3.14 * 2 * 5}, 200`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          <div className="text-xs" style={{ marginLeft: 5 }}>
            {editor.storage.characterCount.characters()}/{limit} characters
          </div>
        </div>
      ) : (
        <div role="status" className="w-full animate-pulse ">
          <div className="w-full h-8 bg-gray-200 rounded-b-md"></div>
        </div>
      )}
    </div>
  );
}
