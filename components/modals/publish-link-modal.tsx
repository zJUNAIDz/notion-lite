import usePublish from "@/hooks/use-publish";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

const PublishLinkModal = () => {
  const publish = usePublish();
  const params = useParams();
  const origin = useOrigin();
  const url = `${origin}/preview/${params.documentId}`;
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    window.navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Dialog open={publish.isOpen} onOpenChange={publish.onClose}>
      <DialogContent>
        <div className="flex flex-col gap-y-2">
          <h2 className=" text-sm text-blue-400">Your document is now publically available!</h2>
          <div className="flex border rounded-md">
            <input
              className="truncate w-full p-2"
              value={url}
              type="text"
              disabled
            />
            <Button disabled={copied} onClick={onCopy}>
              <Copy className="w-4 h-4 rounded-none" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishLinkModal;
