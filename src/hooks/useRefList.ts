import { useEffect, useRef } from "react";

export default function useRefList(): [
  list: React.RefObject<HTMLDivElement>[],
  addToList: (instance: HTMLDivElement | null) => void
] {
  const refList = useRef({
    list: [] as React.MutableRefObject<HTMLDivElement>[],
    _list: [] as React.MutableRefObject<HTMLDivElement>[],
  });

  const addToList = (instance: HTMLDivElement | null) => {
    if (instance) {
      refList.current._list.push({ current: instance });
    }
  };

  useEffect(() => {
    refList.current.list = refList.current._list;
    refList.current._list = [];
  });

  return [refList.current.list, addToList];
}
