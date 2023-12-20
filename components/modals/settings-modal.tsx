import { useSettings } from "@/hooks/use-settings";
import { ModeToggle } from "../mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader
} from "../ui/dialog";
import { Label } from "../ui/label";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className=" text-xl font-semibold">My Settings</h2>
        </DialogHeader>
        <div className=" flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <Label className=" text-xl">Appearance</Label>
            <p className=" text-muted-foreground">
              Change Color Theme of Application
            </p>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
