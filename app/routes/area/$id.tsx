// Layout route

import { CSSProperties, useEffect, useRef } from "react";
import { LinksFunction, Outlet } from "remix";
import {
  ControlPad,
  links as controlPadLinks,
} from "~/components/control/ControlPad";
import { InputContextProvider } from "~/components/control/InputContext";
import { Items } from "~/components/items/Items";
import { ItemsStoreProvider } from "~/components/items/ItemsStoreContext";
import { Logs } from "~/components/logs/Logs";
import { LogsProvider, useLogs } from "~/components/logs/LogsContext";
import { AreaNav } from "~/components/nav/AreaNav";
import { mapSize } from "~/logic/area/params";
import styles from "~/styles/routes/area/$id.css";

export const links: LinksFunction = () => [
  ...controlPadLinks(),
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

const cellGap = "2px";
const cellSize = `min(40px, (100vw - ${cellGap} * ${
  mapSize - 1
})  / ${mapSize})`;
const areaSize = `calc(var(--cell-size) * ${mapSize} + var(--cell-gap) * ${
  mapSize - 1
})`;

export default function AreaLayout() {
  return (
    <LogsProvider>
      <ItemsStoreProvider>
        <InputContextProvider>
          <AreaLayoutInner />
        </InputContextProvider>
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
          "--area-size": areaSize,
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
      <div className="area-layout-input">
        <ControlPad />
      </div>
      <nav className="area-layout-nav">
        <AreaNav />
      </nav>
    </div>
  );
};
