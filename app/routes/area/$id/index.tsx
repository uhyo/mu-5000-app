import { LoaderFunction, useLoaderData, useParams } from "remix";

type LoaderType = {};

export const loader: LoaderFunction = ({ params }): LoaderType => {
  if (!params.id) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  return {};
};

export default function AreaRoute() {
  const data = useLoaderData<LoaderType>();
  return null;
}
