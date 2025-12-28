import React from 'react';

const InventoryPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
        Inventory Management
      </h2>
      <div className="bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] p-6">
        <p className="text-[rgb(var(--c-neutral-600))]">
          Track and manage your inventory levels here. This is a placeholder page.
        </p>
      </div>
    </div>
  );
};

export default InventoryPage;
