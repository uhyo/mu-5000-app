import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { mainLoopInterval } from "~/logic/mainloop";

type MainLoopContext = {
  registerMainLoopCallback: (callback: () => void) => void;
  unregisterMainLoopCallback: (callback: () => void) => void;
};

const MainLoopContext = createContext<MainLoopContext>({
  registerMainLoopCallback: () => {},
  unregisterMainLoopCallback: () => {},
});

export const useMainLoopContext = () => {
  return useContext(MainLoopContext);
};

export const MainLoopProvider: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const mainLoopCallbacks = useRef<(() => void)[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      for (const callback of mainLoopCallbacks.current) {
        callback();
      }
    }, mainLoopInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const value: MainLoopContext = useMemo(() => {
    const registerMainLoopCallback = (callback: () => void) => {
      mainLoopCallbacks.current.push(callback);
    };
    const unregisterMainLoopCallback = (callback: () => void) => {
      mainLoopCallbacks.current = mainLoopCallbacks.current.filter(
        (cb) => cb !== callback
      );
    };
    return {
      registerMainLoopCallback,
      unregisterMainLoopCallback,
    };
  }, []);

  return (
    <MainLoopContext.Provider value={value}>
      {children}
    </MainLoopContext.Provider>
  );
};
