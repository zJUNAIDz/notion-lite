import { useIsClient } from "usehooks-ts";

export const useOrigin = () => {
  const isMounted = useIsClient();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  if (!isMounted) return "";
  return origin;
};
