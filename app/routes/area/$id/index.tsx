import { LinksFunction, LoaderFunction, useLoaderData, useParams } from "remix";
import { Area, createArea } from "~/logic/area";
import { Map, links as mapLinks } from "~/components/area/Map";
import {
  MapLayout,
  links as mapLayoutLinks,
} from "~/components/area/grid/MapLayout";
import { useClientOnly } from "~/utils/useClientOnly";
import { Twemoji } from "~/components/utils/Twemoji";

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
  console.log(area);
  const mapArea = useClientOnly(
    <Twemoji wrapper="div">
      <MapLayout>
        <Map area={area} />
      </MapLayout>
    </Twemoji>
  );

  return mapArea;
}
