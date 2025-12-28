import React from 'react';

const FinancePage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
        Finance & Payments
      </h2>
      <div className="bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] p-6">
        <p className="text-[rgb(var(--c-neutral-600))]">
          View your financial reports and payment information here. This is a placeholder page.
        </p>
      </div>
    </div>
  );
};

export default FinancePage;
