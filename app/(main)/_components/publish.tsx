"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
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
        <Button className=" bg-transparent" variant="outline" size="sm">
          Publish
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 text-blue-600 text-sm">
              <Globe className="h-4 w-4 animate-pulse" /> The note is live on
              web
            </div>
            <div className="flex gap-x-1 rounded-md overflow-hidden border">
              <input
                type="text"
                value={url}
                disabled
                className="p-1 truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className=" rounded-l-none"
                size="sm"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              onClick={onUnPublish}
              disabled={isSubmitting}
              className="w-full"
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-3">
            <Globe className="h-6 w-6" />
            <p className="text-sm font-medium">Publish this note</p>
            <span className="text-xs text-muted-foreground">
              Share your work with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              size="sm"
              className="w-full"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
