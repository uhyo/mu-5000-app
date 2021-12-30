import { LinksFunction } from "remix";
import styles from "./MapLayout.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const MapLayout: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="map-layout-container">{children}</div>;
};
