"use client";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/ui/hover-card";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import usePublish from "@/hooks/use-publish";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { useMutation } from "convex/react";
import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: Props) => {
  const params = useParams();
  const publish = useMutation(api.documents.update);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onOpen } = usePublish();

  const onPublish = () => {
    setIsSubmitting(true);
    const id = params.documentId as Id<"documents">;
    const promise = publish({ id, isPublished: true }).finally(() => {
      setIsSubmitting(false);
      onOpen();
    });

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

  const togglePublish = () =>
    initialData.isPublished ? onUnPublish() : onPublish();

  return (
    <HoverCard>
      <HoverCardTrigger onClick={togglePublish} asChild>
        <Button className="border rounded-sm" disabled={isSubmitting} variant="ghost" size="icon">
          <Globe
            className={cn(
              "h-6 w-6",
              initialData.isPublished
                ? "text-blue-600 animate-pulse"
                : "text-muted-foreground"
            )}
          />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="hidden md:block" align="end">
        <div className="  px-2 py-1 mt-2 border rounded-sm text-xs text-muted-foreground">
          {initialData.isPublished
            ? "Click to make it private"
            : "Click to make it Public"}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Publish;
