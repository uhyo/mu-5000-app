import { eventmit, Eventmitter } from "eventmit";
import { createContext, useContext, useMemo, useState } from "react";

export type KeyType = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";

export type InputEvent = {
  key: KeyType;
};

type InputContextValue = {
  inputDownEvent: Eventmitter<InputEvent>;
  inputUpEvent: Eventmitter<InputEvent>;
  inputUp: (key: KeyType) => void;
  inputDown: (key: KeyType) => void;
};

const InputContext = createContext<InputContextValue>({
  inputDownEvent: eventmit<InputEvent>(),
  inputUpEvent: eventmit<InputEvent>(),
  inputUp: () => {},
  inputDown: () => {},
});

export const useInputContext = () => {
  return useContext(InputContext);
};

export const InputContextProvider: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useInputContextLogic();
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

function useInputContextLogic(): InputContextValue {
  const [inputDownEvent] = useState(() => eventmit<InputEvent>());
  const [inputUpEvent] = useState(() => eventmit<InputEvent>());

  const { inputDown, inputUp } = useMemo(
    () => ({
      inputDown: (key: KeyType) => {
        inputDownEvent.emit({ key });
      },
      inputUp: (key: KeyType) => {
        inputUpEvent.emit({ key });
      },
    }),
    [inputDownEvent, inputUpEvent]
  );
  return {
    inputDownEvent,
    inputUpEvent,
    inputDown,
    inputUp,
  };
}
