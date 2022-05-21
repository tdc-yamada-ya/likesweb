import { useLikes } from "./useLikes";

export const useTitle = () => {
  const { likes } = useLikes();
  return `${likes ?? 0} - Likes Counter`;
};
