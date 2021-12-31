import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Log = {
  id: number;
  content: string;
};

type Logs = {
  logs: Log[];
  addLog: (content: string) => void;
};

const LogsContext = createContext<Logs>({
  logs: [],
  addLog: () => {},
});

export const useLogs = () => {
  return useContext(LogsContext);
};

export const LogsProvider: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useLogsLogic();
  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};

function useLogsLogic(): Logs {
  type LogsState = {
    logs: Log[];
    nextId: number;
  };
  const [logs, setLogs] = useState<LogsState>(() => ({
    logs: [],
    nextId: 1,
  }));

  const addLog = useCallback((content: string) => {
    setLogs((logs) => ({
      logs: [
        ...logs.logs,
        {
          id: logs.nextId,
          content,
        },
      ],
      nextId: logs.nextId + 1,
    }));
  }, []);

  return useMemo(
    () => ({
      logs: logs.logs,
      addLog,
    }),
    [logs.logs]
  );
}
