import { Twemoji } from "~/components/utils/Twemoji";
import { useLogs } from "../LogsContext";

export const Logs: React.VFC = () => {
  const { logs } = useLogs();
  return (
    <div
      style={{
        padding: "4px",
        lineHeight: "1.1",
        fontFeatureSettings: '"liga" 0',
      }}
    >
      {logs.map((log) => (
        <p style={{ margin: "0" }} key={log.id}>
          <Twemoji wrapper="span">{log.content}</Twemoji>
        </p>
      ))}
    </div>
  );
};
