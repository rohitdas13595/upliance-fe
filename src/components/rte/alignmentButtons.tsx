import { Editor } from "@tiptap/react";
import { ToggleButton } from "./toggleButton";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export function AlignmentToolbarButtons({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center gap-[2px] rounded-md overflow-hidden">
      <ToggleButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        selected={editor.isActive({ textAlign: "left" })}
        value="left"
        aria-label="left aligned"
      >
        <AlignLeft size={16} />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        selected={editor.isActive({ textAlign: "center" })}
        value="center"
        aria-label="Center aligned"
      >
        <AlignCenter size={16} />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        selected={editor.isActive({ textAlign: "right" })}
        value="right"
        aria-label="Right aligned"
      >
        <AlignRight size={16} />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        selected={editor.isActive({ textAlign: "justify" })}
        value="justify"
        aria-label="Justify aligned"
      >
        <AlignJustify size={16} />
      </ToggleButton>
    </div>
  );
}
