import { ReactNode } from "react";

export interface ModalData {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  modalRootId?: string;
  isOpen: boolean;
}
