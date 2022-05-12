import React, { useEffect, useRef } from "react";

export type ElementRefList = React.RefObject<{
  list: React.MutableRefObject<HTMLElement>[];
}>;

export default function useElementRefList(): [
  list: ElementRefList,
  addToList: React.RefCallback<HTMLElement | null>
] {
  const refList = useRef({
    list: [] as React.MutableRefObject<HTMLElement>[],
    _list: [] as React.MutableRefObject<HTMLElement>[],
  });

  function addToList(instance: HTMLElement | null) {
    if (instance) {
      refList.current._list.push({ current: instance });
    }
  }

  useEffect(() => {
    refList.current.list = refList.current._list;
    refList.current._list = [];
  });

  return [refList, addToList];
}
