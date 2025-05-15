import { useState, useCallback, useRef, createRef, useEffect } from "react";

export function useAnimatedList(initialValue: ToastItem[] = []) {
  const [items, setItems] = useState<ToastItem[]>(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<
    number[]
  >([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId: number) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((id) => id !== itemId)
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const elementRef = animatedRefs.current.get(itemId);
      const element = elementRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (element && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          element.removeEventListener("animationend", onAnimationEnd);
        };

        element.addEventListener("animationend", onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId: number) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    //@ts-expect-error: description in todo
    // TODO: Fix type error
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);

        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, {
          isLeaving,
          animatedRef
        });
      }),
    [getAnimatedRef, items, pendingRemovalItemsIds]
  );

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList
  };
}
