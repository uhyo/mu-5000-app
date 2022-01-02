import {
  json,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
  useParams,
  useTransition,
} from "remix";
import { Area, AreaMap, createArea } from "~/logic/area";
import { Map, links as mapLinks } from "~/components/area/Map";
import {
  MapLayout,
  links as mapLayoutLinks,
} from "~/components/area/grid/MapLayout";
import { useClientOnly } from "~/utils/useClientOnly";
import { Twemoji } from "~/components/utils/Twemoji";
import { usePlayer } from "~/components/area/player";
import { MainLoopProvider } from "~/components/area/mainloop";
import { useAreaTransition } from "~/components/area/transition/useAreaTransition";
import { useAreaEntranceLog } from "~/components/area/gamelog/areaEntranceLog";
import { useCallback, useEffect, useState } from "react";
import { useItemTouch } from "~/components/items/useItemTouch";
import { ItemMap, useItemsStore } from "~/components/items/ItemsStoreContext";
import { getPlayerIcon } from "~/logic/item/getPlayerIcon";
import { useKeyboardInput } from "~/components/area/player/useKeyboardInput";
import { getOrElse } from "~/utils/getOrElse";
import { mapSize } from "~/logic/area/params";
import { landDef } from "~/logic/area/landDef";

type LoaderType = {
  area: Area;
};

export const loader: LoaderFunction = ({ params }) => {
  if (!params.id) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const area = createArea(params.id);
  if (!area) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const responseBody: LoaderType = { area };
  return json(responseBody, {
    headers: {
      "Cache-Control": "public, max-age=360",
    },
  });
};

export const links: LinksFunction = () => [...mapLinks(), ...mapLayoutLinks()];

export default function AreaRoute() {
  const { area } = useLoaderData<LoaderType>();
  return (
    <MainLoopProvider>
      <AreaRouteInner area={area} />
    </MainLoopProvider>
  );
}

const AreaRouteInner: React.VFC<{
  area: Area;
}> = ({ area }) => {
  const { areaIsLoading, mapArea } = useAreaRouteLogic(area);
  return (
    <div
      style={{
        opacity: areaIsLoading ? "0.3" : "1",
        transition: "opacity 350ms ease-in-out",
      }}
    >
      {mapArea}
    </div>
  );
};

function useAreaRouteLogic(areaFromServer: Area) {
  const { items } = useItemsStore();
  const [clientModifiedMap, setClientModifiedMap] = useState<{
    areaId: string;
    map: AreaMap;
  }>(() => ({
    areaId: areaFromServer.id,
    map: clientModifyMap(areaFromServer.map, items),
  }));
  const map: AreaMap =
    clientModifiedMap.areaId === areaFromServer.id
      ? clientModifiedMap.map
      : areaFromServer.map;

  useEffect(() => {
    if (clientModifiedMap.areaId !== areaFromServer.id) {
      // Reset in useEffect to sync client and server map
      setClientModifiedMap({
        areaId: areaFromServer.id,
        map: clientModifyMap(areaFromServer.map, items),
      });
    }
  }, [clientModifiedMap.areaId, areaFromServer.id, items]);

  const transition = useTransition();
  const areaIsLoading = transition.state !== "idle";
  const { player, setPlayerPosition } = usePlayer({
    map,
    areaIsLoading,
  });
  useAreaTransition({ area: areaFromServer, player, items, setPlayerPosition });
  useAreaEntranceLog(areaFromServer);
  const updateMap = useCallback((x: number, y: number, land: number) => {
    setClientModifiedMap((map) => {
      const newMap = [...map.map];
      const newRow = [...newMap[y]];
      newRow[x] = land;
      newMap[y] = newRow;
      return { ...map, map: newMap };
    });
  }, []);
  useItemTouch(map, player, updateMap);
  useKeyboardInput();

  const mapArea = useClientOnly(
    <Twemoji wrapper="div">
      <MapLayout>
        <Map
          area={areaFromServer}
          map={map}
          player={player}
          playerIcon={getPlayerIcon(items)}
        />
      </MapLayout>
    </Twemoji>
  );

  return { areaIsLoading, mapArea };
}

function clientModifyMap(map: AreaMap, items: ItemMap): AreaMap {
  if (getOrElse(items, "mu", 0) >= 5000 && getOrElse(items, "tada", 0) === 0) {
    // goal reached
    const center = Math.floor(mapSize / 2);
    return modify(map, center, center - 2, landDef.tada);
  }
  return map;

  function modify(map: AreaMap, x: number, y: number, land: number) {
    const newMap = [...map];
    const newRow = [...newMap[y]];
    newRow[x] = land;
    newMap[y] = newRow;
    return newMap;
  }
}
