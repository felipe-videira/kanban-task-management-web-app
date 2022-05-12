import { SetStateAction, useState } from "react";

export default function useStateWithGetter<T>(
  initialState: T
): [state: T, setState: React.Dispatch<SetStateAction<T>>, getState: () => T] {
  const [state, setState] = useState(initialState);

  function getState() {
    let value = state;
    setState((currState) => {
      value = currState;
      return currState;
    });
    return value;
  }

  return [state, setState, getState];
}
