import { LinksFunction, LoaderFunction, useLoaderData, useParams } from "remix";
import { Area, createArea } from "~/logic/area";
import { Map, links as mapLinks } from "~/components/area/Map";
import {
  MapLayout,
  links as mapLayoutLinks,
} from "~/components/area/grid/MapLayout";
import { useClientOnly } from "~/utils/useClientOnly";
import { Twemoji } from "~/components/utils/Twemoji";
import { usePlayer } from "~/components/area/player";
import { MainLoopProvider } from "~/components/area/mainloop";

type LoaderType = {
  area: Area;
};

export const loader: LoaderFunction = ({ params }): LoaderType => {
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
  return { area };
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
  const player = usePlayer();

  const mapArea = useClientOnly(
    <Twemoji wrapper="div">
      <MapLayout>
        <Map area={area} player={player} />
      </MapLayout>
    </Twemoji>
  );

  return <>{mapArea}</>;
};
