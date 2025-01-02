import { ChangeEvent, useState } from "react";

interface Transaction {
  remain: number;
  price: number;
  value: number;
}

interface PercentageCalculatorProps {
  transactions: Transaction[];
  type: "buy" | "sell";
}

export const PercentageCalculator = ({
  transactions,
  type,
}: PercentageCalculatorProps) => {
  const [percentage, setPercentage] = useState<number>(0);

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 100) {
      setPercentage(value);
    }
  };

  const calculateResults = () => {
    if (!transactions.length) return null;

    const results = transactions.reduce(
      (acc, item) => {
        const remainValue = Number(item.remain);
        const priceValue = Number(item.price);
        const percentageAdjustedRemain = (remainValue * percentage) / 100;

        return {
          totalRemain: acc.totalRemain + percentageAdjustedRemain,
          totalPrice: acc.totalPrice + priceValue,
          count: acc.count + 1,
        };
      },
      { totalRemain: 0, totalPrice: 0, count: 0 }
    );

    const averagePrice =
      results.count > 0 ? (results.totalPrice / results.count).toFixed(0) : "0";

    return {
      totalRemain: results.totalRemain,
      averagePrice: averagePrice,
    };
  };

  const results = calculateResults();

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-6">
      <h3 className="text-gray-200 font-medium mb-4">
        Calculate {type.charAt(0).toUpperCase() + type.slice(1)} Percentage
      </h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <input
            id="percentage"
            value={percentage}
            onChange={handlePercentageChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
            min="0"
            placeholder="Enter Percentage"
            max="100"
            required
          />
        </div>
      </div>
      <div className="bg-gray-800 rounded p-4 mt-2">
        <h4 className="text-gray-300 text-sm font-medium mb-3">
          Results for {percentage}%
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Total receivable volume:</span>
            <span className="text-gray-200 font-mono">
              {results.totalRemain.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">Average price:</span>
            <span className="text-gray-200 font-mono">
              {Number(results.averagePrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
