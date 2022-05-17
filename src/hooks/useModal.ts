import { createContext, useContext } from "react";

type UseModalContext = {
  toggle: ({}: { title: string; children: React.ReactNode }) => boolean;
};

const Context = createContext<UseModalContext>({
  toggle: () => false,
});

export const ModalContext = Context;
export const ModalProvider = Context.Provider;

export default function useModal() {
  const { toggle } = useContext(ModalContext);

  return toggle;
}
