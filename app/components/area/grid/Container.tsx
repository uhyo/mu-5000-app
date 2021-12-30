import React, { CSSProperties } from "react";
import { LinksFunction } from "remix";
import { mapSize } from "~/logic/area/params";
import styles from "./Container.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const MapGridContainer: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cellSize = `min(32px, 80vw / ${mapSize})`;
  return (
    <div
      style={
        {
          "--cell-size": cellSize,
          "--map-size": mapSize,
        } as CSSProperties
      }
      className="map-grid-container"
    >
      {children}
    </div>
  );
};
