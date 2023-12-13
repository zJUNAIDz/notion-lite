"use client";
import { BlockNoteEditor, InlineContent, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
interface Props {
  onChange: (value: string) => void;
  initialContent: string | undefined;
  editable?: boolean;
}
// type PartialBlock = {
//   id?: string;
//   type?: string;
//   props?: Partial<Record<string, string>>;
//   content?: string | InlineContent[];
//   children?: BlockSpec[];
// };

export const Editor = ({ onChange, initialContent, editable }: Props) => {
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      console.log(JSON.stringify(editor.topLevelBlocks));
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });
  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};
