import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import countapi from "countapi-js";
import { maxLikeAmount } from "../maxLikeAmount";

export const useCreateRoom = () => {
  const createRoom = useCallback(async () => {
    const { namespace, key } = await countapi.create({
      namespace: uuidv4(),
      update_lowerbound: 0,
      update_upperbound: maxLikeAmount,
    });
    window.location.href = `?ns=${namespace}&k=${key}`;
  }, []);

  return createRoom;
};
