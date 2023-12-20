import { create } from "zustand";
interface PublishStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const usePublish = create<PublishStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePublish;
