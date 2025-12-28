import React from 'react';

interface InventoryStatusBadgeProps {
  status: 'In stock' | 'Low stock' | 'Out of stock';
}

const InventoryStatusBadge: React.FC<InventoryStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'In stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Low stock':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out of stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

export default InventoryStatusBadge;
