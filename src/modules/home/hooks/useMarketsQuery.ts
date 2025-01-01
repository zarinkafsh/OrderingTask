import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../utils";

export type Sort = 'asc' | 'desc'

interface useMarketsQueryParams {
  sort: Sort;
  category?: string;
}

export const useMarketsQuery = ({ sort, category }: useMarketsQueryParams) => {
    let url = `https://api.bitpin.ir/v1/mkt/markets/`;
  

    return useQuery({
    queryKey: ['markets', sort, category],
    queryFn: () => fetcher(`${url}`),
  });
};
