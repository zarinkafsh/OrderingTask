import { useParams } from "react-router-dom";
import { useState } from "react";
import { TransactionList } from "../components/transactionList";
import { TradeList } from "../components/tradeList";
import { useMarketTypeQuery } from "../hooks/useMarketTypeQuery";
import { Loading } from "../../common/components/loading";
import { TabbedPanel } from "../../common/components/tabbedPanel";

const tabs = ["Sell", "Buy", "Trade"];

const Trade = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Sell");

  const marketTypeQuery = useMarketTypeQuery({ type: activeTab, id });

  return (
    <div className="p-4 sm:p-6 h-full">
      <div>
        <TabbedPanel
          activeTab={activeTab}
          tabs={tabs}
          onTabChange={(tab: string) => setActiveTab(tab)}
        />
        <div className="bg-gray-900/90 rounded-xl shadow-xl  border border-gray-800">
          {marketTypeQuery.isLoading ? (
            <Loading />
          ) : (
            <div className="w-full">
              <div className="">
                {activeTab === "Sell" && (
                  <TransactionList type="sell" data={marketTypeQuery.data?.orders || []} />
                )}
                {activeTab === "Buy" && (
                  <TransactionList type="buy" data={marketTypeQuery.data?.orders || []} />
                )}
                {activeTab === "Trade" && (
                  <TradeList data={marketTypeQuery.data || []} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade;
