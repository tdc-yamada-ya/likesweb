import { useCallback, useEffect, useState } from "react";
import countapi from "countapi-js";
import { Room } from "../Room";
import { maxLikeAmount } from "../maxLikeAmount";

export const useLike = (room: Room, callback: (value: number) => void) => {
  const [amount, setAmount] = useState(0);
  const like = useCallback(() => setAmount((c) => c + 1), []);

  useEffect(() => {
    const id = window.setTimeout(async () => {
      if (amount === 0) return;

      const c = amount;
      setAmount(0);

      const { value } = await countapi.update(
        room.namespace,
        room.key,
        Math.min(c, maxLikeAmount)
      );
      callback(value);
    }, 500);

    return () => window.clearTimeout(id);
  }, [callback, amount, room.key, room.namespace]);

  return like;
};
