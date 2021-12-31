import { LinksFunction } from "remix";
import { Area } from "~/logic/area";
import { FloorType } from "~/logic/area/floor";
import { landChars } from "~/logic/area/landDef";
import { mapSize } from "~/logic/area/params";
import { range } from "~/utils/range";
import {
  MapGridContainer,
  links as mapGridContainerLinks,
} from "./grid/Container";
import { PlayerInfo } from "./player";

type Props = {
  area: Area;
  player: PlayerInfo;
};

export const links: LinksFunction = () => [...mapGridContainerLinks()];

export const Map: React.VFC<Props> = ({ area, player }) => {
  return (
    <>
      {/* floor */}
      <div style={{ opacity: 0.5 }}>
        <MapGridContainer>
          {Array.from(range(0, mapSize), (y) => {
            return Array.from(range(0, mapSize), (x) => {
              return (
                <span key={`${x}-${y}`}>{floorChars[area.floorType]}</span>
              );
            });
          })}
        </MapGridContainer>
      </div>
      {/* walls */}
      <div style={{ zIndex: 0 }}>
        <MapGridContainer>
          {Array.from(range(0, mapSize), (y) => {
            return Array.from(range(0, mapSize), (x) => {
              const cell = area.map[y][x];
              if (!cell) {
                // 0 is nothing
                return null;
              }
              const landChar = landChars[cell];
              if (!landChar) {
                return null;
              }
              return (
                <span
                  key={`${x}-${y}`}
                  style={{
                    gridArea: `${y + 1} / ${x + 1}`,
                  }}
                >
                  {landChar}
                </span>
              );
            });
          })}
        </MapGridContainer>
      </div>
      {/* player */}
      <div style={{ zIndex: 0 }}>
        <MapGridContainer>
          <span
            style={{
              gridArea: `${player.y + 1} / ${player.x + 1}`,
            }}
          >
            🏃
          </span>
        </MapGridContainer>
      </div>
    </>
  );
};

const floorChars: Record<FloorType, string> = {
  green: "\u{1f7e9}",
  red: "\u{1f7e5}",
  orange: "\u{1f7e7}",
  blue: "\u{1f7e6}",
  purple: "\u{1f7ea}",
  yellow: "\u{1f7e8}",
  brown: "\u{1f7eb}",
  white: "\u{2b1c}",
  black: "\u{2b1b}",
};
