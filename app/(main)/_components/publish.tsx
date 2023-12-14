"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: Props) => {
  const params = useParams();
  const publish = useMutation(api.documents.update);
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const id = params.documentId as Id<"documents">;
    const promise = publish({ id, isPublished: true }).finally(() =>
      setIsSubmitting(false)
    );

    toast.promise(promise, {
      loading: "Publishing document...",
      success: "Document Published!",
      error: "Failed to publish document",
    });
  };
  const onUnPublish = () => {
    setIsSubmitting(true);
    const id = params.documentId as Id<"documents">;
    const promise = publish({ id, isPublished: false }).finally(() =>
      setIsSubmitting(false)
    );

    toast.promise(promise, {
      loading: "Unpublishing document...",
      success: "Document unublished!",
      error: "Failed to unpublish document",
    });
  };

  const onCopy = () => {
    window.navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className=" bg-transparent"
          onClick={onPublish}
          variant="outline"
          size="sm"
        >
          Publish
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};

export default Publish;
