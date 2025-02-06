import { Editor } from "@tiptap/react";
import { ToggleButton } from "./toggleButton";
import {
  Superscript,
  Subscript,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from "lucide-react";

export function TextTransformToolbarButtons({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center gap-[2px] rounded-md overflow-hidden">
      <ToggleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        selected={editor.isActive("bold")}
        value="bold"
        aria-label="bold"
      >
        <Bold size={16} />
      </ToggleButton>

      <ToggleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        value="italic"
        aria-label="italic"
        selected={editor.isActive("italic")}
      >
        <Italic size={16} />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        selected={editor.isActive("underline")}
        value="underline"
        aria-label="underline"
      >
        <Underline size={16} />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        value="strike"
        aria-label="strike"
        selected={editor.isActive("strike")}
      >
        <Strikethrough size={16} />
      </ToggleButton>
    </div>
  );
}
