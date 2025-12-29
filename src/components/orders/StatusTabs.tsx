import React from 'react';
import { OrderStatus } from './mockOrderData';

interface StatusTabsProps {
  activeStatus: OrderStatus | 'All';
  onStatusChange: (status: OrderStatus | 'All') => void;
  counts: {
    All: number;
    Pending: number;
    Processing: number;
    'Ready to Ship': number;
    Shipped: number;
    Cancelled: number;
  };
}

const StatusTabs: React.FC<StatusTabsProps> = ({ activeStatus, onStatusChange, counts }) => {
  const tabs: Array<{ label: string; value: OrderStatus | 'All'; count: number }> = [
    { label: 'All Orders', value: 'All', count: counts.All },
    { label: 'Pending', value: 'Pending', count: counts.Pending },
    { label: 'Processing', value: 'Processing', count: counts.Processing },
    { label: 'Ready to Ship', value: 'Ready to Ship', count: counts['Ready to Ship'] },
    { label: 'Shipped', value: 'Shipped', count: counts.Shipped },
    { label: 'Cancelled', value: 'Cancelled', count: counts.Cancelled },
  ];

  return (
    <div className="border-b border-[rgb(var(--c-neutral-200))] bg-white dark:bg-black dark:border-[rgb(var(--c-neutral-600))]">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onStatusChange(tab.value)}
            className={`
              relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${activeStatus === tab.value
                ? 'text-[rgb(var(--c-primary-500))] border-b-2 border-[rgb(var(--c-primary-500))]'
                : 'text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))]'
              }
            `}
          >
            <span>{tab.label}</span>
            <span
              className={`
                ml-2 px-2 py-0.5 text-xs font-semibold rounded-full
                ${activeStatus === tab.value
                  ? 'bg-[rgb(var(--c-primary-500))] text-[rgb(var(--c-neutral-900))] dark:bg-[rgb(var(--c-primary-500))] dark:text-[rgb(var(--c-neutral-900))]' : 'bg-[rgb(var(--c-neutral-200))] text-[rgb(var(--c-neutral-600))] dark:bg-[rgb(var(--c-neutral-200))] dark:text-[rgb(var(--c-neutral-600))]'}
              `}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTabs;
