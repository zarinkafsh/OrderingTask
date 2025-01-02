interface TradeListProps {
  data: [];
}

export const TradeList = ({ data }: TradeListProps) => {
  const lastTenItems = data.slice(0, 10);

  const timeStamp = (time: number) => {
    const date = new Date(time * 1000); // Convert seconds to milliseconds

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedTime = date.toLocaleTimeString("en-US", options);
    return formattedTime;
  };

  if (!data.length)
    return <div className="p-4 sm:p-6">No Data Found!</div>;
  return (
    <table className="text-sm ">
      <thead>
        <tr className="bg-gray-800 text-gray-400">
          <th className="px-4 py-3 text-left font-semibold">Match Amount</th>
          <th className="px-4 py-3 text-left font-semibold">Price</th>
          <th className="px-4 py-3 text-left font-semibold">Time</th>
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
                {Number(item.match_amount).toLocaleString()}
              </span>
            </td>
            <td className="px-4 py-2 text-left">
              <span className="font-mono">
                {Number(item.price).toLocaleString()}
              </span>
            </td>
            <td className="px-4 py-2 text-left">
              <span className="text-gray-400">{timeStamp(item.time)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
