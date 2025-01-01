import { useState } from "react";
import { Decimal } from "decimal.js";
import { Link } from "react-router-dom";
import { useMarketsQuery } from "../hooks/useMarketsQuery"; // Assuming this hook exists
import { Pagination } from "../components/pagination";
import { Loading } from "../../common/components/loading";
import { TabbedPanel } from "../../common/components/tabbedPanel";

const tabs = ["USDT", "IRT"];

export const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [marketType, setMarketType] = useState("USDT");
  const pageSize = 10;

  const marketListQuery = useMarketsQuery({ sort: "asc" });

  const filteredMarkets = (marketListQuery.data?.results || []).filter(
    (market: any) => market.currency2.code === marketType
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMarkets = filteredMarkets.slice(startIndex, endIndex);

  if (marketListQuery.isLoading) {
    return <Loading />;
  }
  return (
    <div className="overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <TabbedPanel
          activeTab={marketType}
          tabs={tabs}
          onTabChange={(tab: string) => setMarketType(tab)}
        />
      </div>
      {marketListQuery.isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Currency Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentMarkets?.map((market: any) => (
                <tr
                  key={market.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <img
                        src={market?.currency2?.image}
                        alt={market.title}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="text-sm pl-2 font-medium text-gray-900 dark:text-gray-100">
                        {market.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {market.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full
                      ${
                        market.volume_24h >= 0
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {new Decimal(market.volume_24h).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/trade/${market?.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <Pagination
              currentPage={currentPage}
              totalItems={marketListQuery.data?.count || 0}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
