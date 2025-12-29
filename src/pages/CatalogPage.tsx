import React from 'react';
import EnhancedCatalogTable from '../components/catalog/EnhancedCatalogTable';

const CatalogPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))]">
          Product Management
        </h2>
        <p className="text-sm text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))] mt-1">
          Manage your product catalog, variants, inventory, and pricing
        </p>
      </div>
      <EnhancedCatalogTable />
    </div>
  );
};

export default CatalogPage;
