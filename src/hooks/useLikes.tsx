import countapi from "countapi-js";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Room } from "../Room";

const roomContext = createContext<Room>({ namespace: "", key: "" });
const likesContext = createContext<number | null>(0);
const errorContext = createContext<any>(null);
const refreshContext = createContext(() => {});

export const LikesProvider = ({
  room,
  children,
}: {
  room: Room;
  children: ReactNode;
}) => {
  const [likes, setLikes] = useState<number | null>(null);
  const [error, setError] = useState(null);
  const refresh = useCallback(() => {
    countapi
      .get(room.namespace, room.key)
      .then((r) => setLikes(r.value))
      .catch((err) => setError(err));
  }, [room.key, room.namespace]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const id = window.setInterval(refresh, 30000);
    return () => clearInterval(id);
  }, [refresh]);

  return (
    <roomContext.Provider value={room}>
      <likesContext.Provider value={likes}>
        <errorContext.Provider value={error}>
          <refreshContext.Provider value={refresh}>
            {children}
          </refreshContext.Provider>
        </errorContext.Provider>
      </likesContext.Provider>
    </roomContext.Provider>
  );
};

export const useLikes = () => {
  const room = useContext(roomContext);
  const likes = useContext(likesContext);
  const error = useContext(errorContext);
  const refresh = useContext(refreshContext);
  return { room, likes, error, refresh };
};
