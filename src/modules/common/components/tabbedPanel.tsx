import { FC } from "react";

interface TabPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

export const TabbedPanel: FC<TabPanelProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      {tabs.map((tab) => (
          <button
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 focus:outline-none rounded-none 
            ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
  );
};
