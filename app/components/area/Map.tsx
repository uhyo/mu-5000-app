import { LinksFunction } from "remix";
import { Area } from "~/logic/area";
import { FloorType } from "~/logic/area/floor";
import { mapSize } from "~/logic/area/params";
import { range } from "~/utils/range";
import { Twemoji } from "../utils/Twemoji";
import {
  MapGridContainer,
  links as mapGridContainerLinks,
} from "./grid/Container";

type Props = {
  area: Area;
};

export const links: LinksFunction = () => [...mapGridContainerLinks()];

export const Map: React.VFC<Props> = ({ area }) => {
  return (
    <Twemoji wrapper="div">
      <MapGridContainer>
        {Array.from(range(0, mapSize), (y) => {
          return Array.from(range(0, mapSize), (x) => {
            return <span key={`${x}-${y}`}>{floorChars[area.floorType]}</span>;
          });
        })}
      </MapGridContainer>
    </Twemoji>
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
