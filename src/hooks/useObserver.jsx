import { useEffect } from "react";

export const useObserver = (eventName, callback) =>
  useEffect(() => {
    document.addEventListener(eventName, callback);
    return () => document.removeEventListener(eventName, callback);
  }, [eventName, callback]);
