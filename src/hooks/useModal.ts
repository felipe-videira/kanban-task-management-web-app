import { createContext, useContext } from "react";

type UseModalContext = {
  open: ({}: { title: string; children: React.ReactNode }) => void;
  close: () => void;
};

const Context = createContext<UseModalContext>({
  open: () => {},
  close: () => {},
});

export const ModalContext = Context;
export const ModalProvider = Context.Provider;

export default function useModal(): [
  open: UseModalContext["open"],
  close: UseModalContext["close"]
] {
  const { open, close } = useContext(ModalContext);

  return [open, close];
}
