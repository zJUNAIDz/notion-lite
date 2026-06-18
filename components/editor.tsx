"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

interface Props {
  onChange: (value: string) => void;
  initialContent: string | undefined;
  editable?: boolean;
  // When set, the editor joins a real-time collaboration room for this
  // document. When omitted it behaves as a plain single-user editor.
  documentId?: string;
}

const Editor = (props: Props) => {
  // `documentId` is stable for the lifetime of a mounted editor (it comes from
  // the route), so switching components here never breaks the rules of hooks.
  if (props.documentId) {
    return <CollaborativeEditor {...props} documentId={props.documentId} />;
  }
  return <BasicEditor {...props} />;
};

export default Editor;

// Single-user editor: content lives in local state and is saved via onChange.
const BasicEditor = ({ onChange, initialContent, editable }: Props) => {
  const { resolvedTheme } = useTheme();
  const uploadFile = useUploadFile();

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
    />
  );
};

// Collaborative editor: a Yjs (CRDT) document is synced over a websocket so
// every connected user sees the same content in real time and edits merge
// without conflicts. The websocket server is the self-hosted one in
// `collaboration-server/`.
const CollaborativeEditor = ({
  onChange,
  initialContent,
  editable,
  documentId,
}: Required<Pick<Props, "documentId">> & Props) => {
  const { resolvedTheme } = useTheme();
  const { user } = useUser();
  const uploadFile = useUploadFile();

  // Create the Yjs doc and websocket provider once per mounted editor. Using
  // lazy initial state keeps them stable across re-renders.
  const [{ doc, provider }] = useState(() => {
    const doc = new Y.Doc();
    const wsUrl =
      process.env.NEXT_PUBLIC_COLLAB_WS_URL || "ws://localhost:8787";
    const provider = new WebsocketProvider(wsUrl, documentId, doc);
    return { doc, provider };
  });

  // Tear the connection down when the editor unmounts (e.g. navigating away).
  useEffect(() => {
    return () => {
      provider.destroy();
      doc.destroy();
    };
  }, [doc, provider]);

  const editor = useCreateBlockNote({
    uploadFile,
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: user?.fullName || user?.username || "Anonymous",
        color: colorFromString(user?.id || "anonymous"),
      },
      showCursorLabels: "activity",
    },
  });

  // Seed the shared document the first time it's ever opened. Once any content
  // exists in the CRDT (loaded from the server) we leave it untouched, so we
  // never clobber collaborative history with the stale DB snapshot.
  useEffect(() => {
    const fragment = doc.getXmlFragment("document-store");
    const seed = (isSynced: boolean) => {
      if (!isSynced || fragment.length > 0 || !initialContent) return;
      editor.replaceBlocks(
        editor.document,
        JSON.parse(initialContent) as PartialBlock[],
      );
    };
    provider.on("sync", seed);
    return () => provider.off("sync", seed);
  }, [doc, provider, editor, initialContent]);

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
    />
  );
};

// Shared image/file upload handler backed by EdgeStore.
const useUploadFile = () => {
  const { edgestore } = useEdgeStore();
  return async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };
};

// Deterministic, readable cursor color derived from a user id, so the same
// user always shows up in the same color for everyone.
const colorFromString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360}, 70%, 50%)`;
};
