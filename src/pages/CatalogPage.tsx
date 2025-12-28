import React from 'react';
import CatalogTable from '../components/catalog/CatalogTable';

const CatalogPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
        Catalog Management
      </h2>
      <CatalogTable />
    </div>
  );
};

export default CatalogPage;
