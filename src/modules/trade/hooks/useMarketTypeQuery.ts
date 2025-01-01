import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../utils";

interface useMarketTypeQueryParams {
  id?: string;
  type?: string;
}

export const useMarketTypeQuery = ({ id, type }: useMarketTypeQueryParams) => {
  let url = `https://api.bitpin.org/v2/mth/actives/${id}/?type=${type?.toLocaleLowerCase()}`;

  if (type === "Trade") {
    url = `https://api.bitpin.org/v1/mth/matches/${id}/`;
  }

  return useQuery({
    queryKey: ["market-type", id, type],
    queryFn: () => fetcher(`${url}`),
    refetchInterval: 3000,
    refetchIntervalInBackground: true
  });
};
