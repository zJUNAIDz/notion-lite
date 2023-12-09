"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogHeader, DialogContent } from "../ui/dialog";

export const CoverModal = () => {
  const coverImage = useCoverImage();

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className=" flex text-center text-bold">Cover Image</h2>aien
        </DialogHeader>
        <div>TODO: Upload Image</div>
      </DialogContent>
    </Dialog>
  );
};
