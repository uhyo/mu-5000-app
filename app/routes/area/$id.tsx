// Layout route

import { LinksFunction, Outlet } from "remix";
import { Logs } from "~/components/logs/Logs";
import styles from "./$id.css";

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

export default function AreaLayout() {
  return (
    <div className="area-layout">
      <div className="area-layout-game">
        <Outlet />
      </div>
      <div className="area-layout-logs">
        <Logs />
      </div>
    </div>
  );
}
