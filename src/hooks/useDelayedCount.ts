import { useEffect, useState } from "react";
import { useLikes } from "./useLikes";

export const useDelayedLikes = () => {
  const { likes } = useLikes();
  const [prev, setPrev] = useState<number | null>(null);
  const [view, setView] = useState<number | null>(null);

  useEffect(() => {
    if (likes === prev) return;

    setView(prev ?? likes);
    setPrev(likes);
  }, [likes, prev]);

  useEffect(() => {
    if (likes === view) return;

    const id = window.setTimeout(() => {
      setView((v) => (v == null ? v : v + 1));
    }, 50);

    return () => window.clearInterval(id);
  }, [likes, view]);

  return view;
};
