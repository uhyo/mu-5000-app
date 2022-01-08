import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "~/styles/app.css";
import { appOrigin } from "./logic/env";

export const meta: MetaFunction = () => {
  return {
    title: "The 無 Dungeon",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@uhyo_",
    "og:title": "The 無 Dungeon",
    "og:description": "Collect 5,000 🈚️s in a random-generated dungeon!",
    "og:image": `${appOrigin}/ogp-image.png`,
  };
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f21a.png" },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
