import Decimal from "decimal.js";
import { PercentageCalculator } from "./PercentageCalculator";

interface SellListProps {
  data: [];
  type: "buy" | "sell";
}

export const TransactionList = ({ data, type }: SellListProps) => {
  const lastTenItems = data.slice(-10);

  const totals = lastTenItems.reduce(
    (acc, item) => ({
      totalRemain: acc.totalRemain + Number(item.remain),
      totalValue: acc.totalValue + Number(item.value),
      totalPrice: acc.totalPrice + Number(item.price),
      count: acc.count + 1,
    }),
    { totalRemain: 0, totalValue: 0, totalPrice: 0, count: 0 }
  );

  const averagePrice =
    totals.count > 0 ? (totals.totalPrice / totals.count).toFixed(0) : 0;

  if (!data.length) return <div className="p-4 sm:p-6">No Data Found!</div>;
  return (
    <>
      <table className="text-sm table-fixed">
        <thead>
          <tr className="bg-gray-800 text-gray-400">
            <th className="px-4 py-3 text-left font-semibold">Remain</th>
            <th className="px-4 py-3 text-left font-semibold">Price</th>
            <th className="px-4 py-3 text-left font-semibold">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {lastTenItems.map((item, index) => (
            <tr
              key={index}
              className="text-gray-300 hover:bg-gray-800 transition-colors duration-150 ease-in-out"
            >
              <td className="px-4 py-2 text-left">
                <span className="font-mono">
                  {Number(item.remain).toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-2 text-left">
                <span className="font-mono">
                  {Number(item.price).toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-2 text-left">
                <span className="text-gray-400">{Number(item.value).toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-800 text-gray-200 font-medium">
            <td className="px-4 py-3 text-left">
              <div className="flex flex-col">
                <span className="font-mono">
                  {new Decimal(totals.totalRemain).toLocaleString()}
                </span>
              </div>
            </td>
            <td className="px-4 py-3 text-left">
              <div className="flex flex-col">
                <span className="font-mono">
                {Number(averagePrice).toLocaleString()}
                </span>
              </div>
            </td>
            <td className="px-4 py-3 text-left">
              <div className="flex flex-col">
                <span className="font-mono">
                {totals.totalValue.toLocaleString()}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <PercentageCalculator transactions={lastTenItems} type={type} />
    </>
  );
};
