// Layout route

import { CSSProperties, useEffect, useRef } from "react";
import { LinksFunction, Outlet } from "remix";
import { Items } from "~/components/items/Items";
import { ItemsStoreProvider } from "~/components/items/ItemsStoreContext";
import { Logs } from "~/components/logs/Logs";
import { LogsProvider, useLogs } from "~/components/logs/LogsContext";
import { mapSize } from "~/logic/area/params";
import styles from "~/styles/routes/area/$id.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=VT323&display=swap",
  },
];

const cellSize = `min(40px, 80vw / ${mapSize})`;
const cellGap = "2px";

export default function AreaLayout() {
  return (
    <LogsProvider>
      <ItemsStoreProvider>
        <AreaLayoutInner />
      </ItemsStoreProvider>
    </LogsProvider>
  );
}

const AreaLayoutInner: React.VFC = () => {
  const logsAreaRef = useRef<HTMLDivElement>(null);
  const { logs } = useLogs();

  useEffect(() => {
    logsAreaRef.current?.scrollTo({
      top: 1_000_000,
      left: 0,
      behavior: "smooth",
    });
  }, [logs]);

  return (
    <div
      className="area-layout"
      style={
        {
          "--cell-size": cellSize,
          "--cell-gap": cellGap,
          "--map-size": mapSize,
        } as CSSProperties
      }
    >
      <div className="area-layout-game">
        <Outlet />
      </div>
      <div className="area-layout-logs" ref={logsAreaRef}>
        <Logs />
      </div>
      <div className="area-layout-item">
        <Items />
      </div>
    </div>
  );
};
