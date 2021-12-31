import { useLogs } from "../LogsContext";

export const Logs: React.VFC = () => {
  const { logs } = useLogs();
  return (
    <div
      style={{
        height: "100%",
        padding: "4px",
      }}
    >
      {logs.map((log) => (
        <p key={log.id}>{log.content}</p>
      ))}
    </div>
  );
};
