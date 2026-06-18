import { useIsClient } from "usehooks-ts";
import { SettingsModal } from "../modals/settings-modal";
import { CoverModal } from "../modals/cover-image-modal";
import PublishLinkModal from "../modals/publish-link-modal";

export const ModalProvider = () => {
  const isMounted = useIsClient();

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverModal />
      <PublishLinkModal />
    </>
  );
};
