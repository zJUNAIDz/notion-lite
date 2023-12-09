"use client";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export const CoverModal = () => {
  const { documentId } = useParams();
  const update = useMutation(api.documents.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      const res = await edgestore.publicFiles.upload({ file });
      await update({ id: documentId as Id<"documents">, coverImage: res.url });
      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className=" flex text-center text-bold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
