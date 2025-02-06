import React from "react";

import { Editor } from "@tiptap/react";

// import { ImageRenderer } from "./renderer/image";
// import { VideoRenderer } from "./renderer/video";

import { List, Logs, PilcrowLeft, Redo, Undo } from "lucide-react";
// import { HeadingToolbarButtons } from "./headingButtons";
import { AlignmentToolbarButtons } from "./alignmentButtons";
import { ToggleButton } from "./toggleButton";
import { TextTransformToolbarButtons } from "./test.transformButtons";

export const RTEToolbar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap p-2    items-start  w-full  z-100 bg-gray-800 gap-1">
      <div className="flex items-center gap-2">
        <TextTransformToolbarButtons editor={editor} />
      </div>

      <div className="flex items-center gap-2">
        <AlignmentToolbarButtons editor={editor} />
        <div className="flex  gap-[2px] rounded overflow-hidden">
          <ToggleButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            selected={editor.isActive("paragraph")}
            value="paragraph"
            aria-label="paragraph"
          >
            <PilcrowLeft size={16} />
          </ToggleButton>
        </div>
      </div>
      <div className="flex items-center gap-[2px] rounded overflow-hidden">
        <ToggleButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          value="bullettList"
          aria-label="bullettList"
          selected={editor.isActive("bulletList")}
        >
          <List size={16} />
        </ToggleButton>
        <ToggleButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          value="orderedList"
          aria-label="orderedList"
          selected={editor.isActive("orderedList")}
        >
          <Logs size={16} />
        </ToggleButton>
        <ToggleButton
          onClick={() => editor.chain().focus().undo().run()}
          value="undo"
          aria-label="undo"
        >
          <Undo size={16} />
        </ToggleButton>
        <ToggleButton
          onClick={() => editor.chain().focus().redo().run()}
          value="redo"
          aria-label="redo"
        >
          <Redo size={16} />
        </ToggleButton>
      </div>
    </div>
  );
};
