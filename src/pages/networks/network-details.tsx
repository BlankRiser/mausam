import { networkRoute } from "@/router/routes";

export const NetworkDetailsPage = () => {
  const { networkId } = networkRoute.useParams();
  return <div>{networkId}</div>;
};
