import { networkRoute } from "@/router/routes";

export const NetworkDetails = () => {
  const { networkId } = networkRoute.useParams();
  return <div>{networkId}</div>;
};
