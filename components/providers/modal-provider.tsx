import { useEffect, useState } from "react";
import { SettingsModal } from "../modals/settings-modal";
import { CoverModal } from "../modals/cover-image-modal";
import PublishLinkModal from "../modals/publish-link-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverModal />
      <PublishLinkModal />
    </>
  );
};
