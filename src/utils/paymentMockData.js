// Mock data for payments
export const generateVendorPayouts = (count = 20) => {
  const statuses = ['Completed', 'Pending', 'Processing', 'Failed'];
  const methods = ['Bank Transfer', 'PayPal', 'Stripe', 'Wire Transfer'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    amount: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
    currency: 'INR',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    referenceNumber: `PAY-${String(i + 1).padStart(8, '0')}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    processedDate: Math.random() > 0.5 ? new Date().toISOString() : null,
    description: `Payout for period ${i + 1}`
  }));
};

export const generateVendorTransactions = (count = 50) => {
  const types = ['Sale', 'Refund', 'Commission', 'Fee', 'Adjustment'];
  const statuses = ['Completed', 'Pending', 'Failed'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: types[Math.floor(Math.random() * types.length)],
    amount: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
    currency: 'INR',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    referenceNumber: `TXN-${String(i + 1).padStart(10, '0')}`,
    orderId: Math.floor(Math.random() * 1000) + 1,
    date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: `Transaction ${i + 1}`
  }));
};

export const generateVendorInvoices = (count = 30) => {
  const statuses = ['Paid', 'Pending', 'Overdue', 'Cancelled'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    invoiceNumber: `INV-${String(i + 1).padStart(6, '0')}`,
    amount: parseFloat((Math.random() * 10000 + 500).toFixed(2)),
    currency: 'INR',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    issueDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    paidDate: Math.random() > 0.5 ? new Date().toISOString() : null,
    items: Math.floor(Math.random() * 10) + 1,
    customer: `Customer ${Math.floor(Math.random() * 100) + 1}`
  }));
};

export const generateVendorPaymentMethods = () => {
  return [
    {
      id: 1,
      type: 'Bank Account',
      name: 'HDFC Bank',
      accountNumber: '****1234',
      isDefault: true,
      isVerified: true,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      type: 'PayPal',
      name: 'vendor@example.com',
      accountNumber: 'vendor@example.com',
      isDefault: false,
      isVerified: true,
      addedDate: '2024-02-20'
    },
    {
      id: 3,
      type: 'UPI',
      name: 'vendor@upi',
      accountNumber: 'vendor@paytm',
      isDefault: false,
      isVerified: false,
      addedDate: '2024-03-10'
    }
  ];
};

export const getPaymentStats = () => {
  const payouts = generateVendorPayouts();
  const transactions = generateVendorTransactions();
  
  return {
    totalEarnings: transactions
      .filter(t => t.type === 'Sale' && t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingPayouts: payouts
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0),
    completedPayouts: payouts
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: transactions.length,
    successfulTransactions: transactions.filter(t => t.status === 'Completed').length,
    failedTransactions: transactions.filter(t => t.status === 'Failed').length
  };
};

// Export aliases for backward compatibility
export const generatePayouts = generateVendorPayouts;
export const generateTransactions = generateVendorTransactions;
export const generateInvoices = generateVendorInvoices;
export const generatePaymentMethods = generateVendorPaymentMethods;
export const generateVendorEarnings = getPaymentStats;

// Commission structure generator
export const generateCommissionStructure = () => {
  return {
    baseRate: 15,
    tieredRates: [
      { minAmount: 0, maxAmount: 10000, rate: 15 },
      { minAmount: 10000, maxAmount: 50000, rate: 12 },
      { minAmount: 50000, maxAmount: 100000, rate: 10 },
      { minAmount: 100000, maxAmount: null, rate: 8 }
    ],
    categoryRates: {
      'Electronics': 12,
      'Fashion': 15,
      'Home & Garden': 10,
      'Sports': 13,
      'Books': 8
    },
    lastUpdated: '2024-01-01'
  };
};
