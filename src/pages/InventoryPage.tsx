import React from 'react';
import InventoryTable from '../components/inventory/InventoryTable';

const InventoryPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-2">
          Inventory Management
        </h2>
        <p className="text-sm text-[rgb(var(--c-neutral-600))]">
          Manage stock levels across all your products and variants. Click on stock values to edit them inline.
        </p>
      </div>
      <InventoryTable />
    </div>
  );
};

export default InventoryPage;
