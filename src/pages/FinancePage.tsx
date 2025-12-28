import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  DollarSign,
  CreditCard,
  Edit,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Mock data for wallet overview
const walletData = {
  availableBalance: 125450.75,
  pendingBalance: 23890.50,
  totalEarnings: 567890.25
};

// Mock data for bank account
const bankAccount = {
  bankName: 'HDFC Bank',
  accountNumber: '****7890',
  ifsc: 'HDFC0001234',
  accountHolder: 'Seller Business Name'
};

// Mock data for transactions
const mockTransactions = [
  { id: 'TXN1234567890', date: '2024-01-15', type: 'Order', amount: 12500.00, status: 'Completed', description: 'Order #ORD001234' },
  { id: 'TXN1234567891', date: '2024-01-15', type: 'Order', amount: 8750.50, status: 'Completed', description: 'Order #ORD001235' },
  { id: 'TXN1234567892', date: '2024-01-14', type: 'Payout', amount: -45000.00, status: 'Completed', description: 'Bank Transfer' },
  { id: 'TXN1234567893', date: '2024-01-14', type: 'Order', amount: 15200.00, status: 'Pending', description: 'Order #ORD001236' },
  { id: 'TXN1234567894', date: '2024-01-13', type: 'Refund', amount: -2500.00, status: 'Completed', description: 'Refund #REF001234' },
  { id: 'TXN1234567895', date: '2024-01-13', type: 'Order', amount: 6890.00, status: 'Completed', description: 'Order #ORD001237' },
  { id: 'TXN1234567896', date: '2024-01-12', type: 'Order', amount: 9450.25, status: 'Pending', description: 'Order #ORD001238' },
  { id: 'TXN1234567897', date: '2024-01-12', type: 'Order', amount: 11230.00, status: 'Completed', description: 'Order #ORD001239' },
  { id: 'TXN1234567898', date: '2024-01-11', type: 'Payout', amount: -50000.00, status: 'Completed', description: 'Bank Transfer' },
  { id: 'TXN1234567899', date: '2024-01-11', type: 'Refund', amount: -1500.00, status: 'Completed', description: 'Refund #REF001235' },
  { id: 'TXN1234567900', date: '2024-01-10', type: 'Order', amount: 7800.00, status: 'Completed', description: 'Order #ORD001240' },
  { id: 'TXN1234567901', date: '2024-01-10', type: 'Order', amount: 13450.75, status: 'Completed', description: 'Order #ORD001241' }
];

const FinancePage: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [transactionType, setTransactionType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter transactions based on selected filters
  const filteredTransactions = mockTransactions.filter(txn => {
    if (transactionType !== 'all' && txn.type !== transactionType) return false;
    if (statusFilter !== 'all' && txn.status !== statusFilter) return false;
    return true;
  });

  const formatCurrency = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[rgb(var(--c-secondary-500))]/10 text-[rgb(var(--c-secondary-500))]';
      case 'Pending':
        return 'bg-[rgb(var(--c-warning-500))]/10 text-[rgb(var(--c-warning-500))]';
      default:
        return 'bg-[rgb(var(--c-neutral-400))]/10 text-[rgb(var(--c-neutral-600))]';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Order':
        return 'text-[rgb(var(--c-secondary-500))]';
      case 'Payout':
        return 'text-[rgb(var(--c-neutral-700))]';
      case 'Refund':
        return 'text-[rgb(var(--c-error-500))]';
      default:
        return 'text-[rgb(var(--c-neutral-600))]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-1">
          Finance & Payouts
        </h1>
        <p className="text-sm text-[rgb(var(--c-neutral-600))]">
          Track your earnings, payouts, and transaction history
        </p>
      </motion.div>

      {/* Wallet Overview Section */}
      <div>
        <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
          Wallet Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Available Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-6 hover:border-[rgb(var(--c-neutral-300))] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-[rgb(var(--c-secondary-500))]/10">
                <Wallet className="h-5 w-5 text-[rgb(var(--c-secondary-500))]" />
              </div>
              <div className="flex items-center text-xs font-medium text-[rgb(var(--c-secondary-500))]">
                <TrendingUp className="h-3 w-3 mr-1" />
                Ready to withdraw
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[rgb(var(--c-neutral-900))]">
                {formatCurrency(walletData.availableBalance)}
              </p>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                Available Balance
              </p>
              <p className="text-xs text-[rgb(var(--c-neutral-500))]">
                Funds available for payout to your bank account
              </p>
            </div>
          </motion.div>

          {/* Pending Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-6 hover:border-[rgb(var(--c-neutral-300))] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-[rgb(var(--c-warning-500))]/10">
                <Clock className="h-5 w-5 text-[rgb(var(--c-warning-500))]" />
              </div>
              <div className="flex items-center text-xs font-medium text-[rgb(var(--c-warning-500))]">
                <AlertCircle className="h-3 w-3 mr-1" />
                In clearing
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[rgb(var(--c-neutral-900))]">
                {formatCurrency(walletData.pendingBalance)}
              </p>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                Pending Balance
              </p>
              <p className="text-xs text-[rgb(var(--c-neutral-500))]">
                Frozen until orders are delivered and confirmed
              </p>
            </div>
          </motion.div>

          {/* Total Earnings Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-6 hover:border-[rgb(var(--c-neutral-300))] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-[rgb(var(--c-primary-500))]/10">
                <DollarSign className="h-5 w-5 text-[rgb(var(--c-primary-500))]" />
              </div>
              <div className="flex items-center text-xs font-medium text-[rgb(var(--c-primary-500))]">
                <TrendingUp className="h-3 w-3 mr-1" />
                All time
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[rgb(var(--c-neutral-900))]">
                {formatCurrency(walletData.totalEarnings)}
              </p>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                Total Earnings
              </p>
              <p className="text-xs text-[rgb(var(--c-neutral-500))]">
                Cumulative earnings from all completed orders
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payout Information Section */}
      <div>
        <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
          Payout Information
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-[rgb(var(--c-neutral-100))]">
                <CreditCard className="h-6 w-6 text-[rgb(var(--c-neutral-700))]" />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-[rgb(var(--c-neutral-900))]">
                    {bankAccount.bankName}
                  </h3>
                  <p className="text-sm text-[rgb(var(--c-neutral-600))] mt-1">
                    {bankAccount.accountHolder}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-[rgb(var(--c-neutral-500))]">Account:</span>
                    <span className="font-medium text-[rgb(var(--c-neutral-900))]">{bankAccount.accountNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-[rgb(var(--c-neutral-500))]">IFSC:</span>
                    <span className="font-medium text-[rgb(var(--c-neutral-900))]">{bankAccount.ifsc}</span>
                  </div>
                </div>
                <p className="text-xs text-[rgb(var(--c-neutral-500))]">
                  Payouts are processed to this account automatically on schedule
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-[rgb(var(--c-neutral-300))] rounded-lg hover:bg-[rgb(var(--c-neutral-50))] transition-colors text-sm font-medium text-[rgb(var(--c-neutral-700))]">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Filters & Controls Section */}
      <div>
        <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
          Transaction History
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <div>
              <label className="block text-xs font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                Date Range
              </label>
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-[rgb(var(--c-neutral-300))] rounded-lg text-sm text-[rgb(var(--c-neutral-900))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent appearance-none bg-white"
                >
                  <option value="today">Today</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                  <option value="thismonth">This Month</option>
                  <option value="lastmonth">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--c-neutral-500))] pointer-events-none" />
              </div>
            </div>

            {/* Transaction Type Filter */}
            <div>
              <label className="block text-xs font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                Transaction Type
              </label>
              <div className="relative">
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-[rgb(var(--c-neutral-300))] rounded-lg text-sm text-[rgb(var(--c-neutral-900))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="Order">Orders</option>
                  <option value="Payout">Payouts</option>
                  <option value="Refund">Refunds</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--c-neutral-500))] pointer-events-none" />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-[rgb(var(--c-neutral-300))] rounded-lg text-sm text-[rgb(var(--c-neutral-900))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--c-neutral-500))] pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transactions Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[rgb(var(--c-neutral-50))] sticky top-0">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--c-neutral-200))]">
                {filteredTransactions.map((txn, index) => (
                  <motion.tr
                    key={txn.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    className="hover:bg-[rgb(var(--c-neutral-50))] transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-[rgb(var(--c-neutral-900))]">
                      {new Date(txn.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-[rgb(var(--c-neutral-600))]">
                      {txn.id}
                    </td>
                    <td className="px-5 py-4 text-sm text-[rgb(var(--c-neutral-900))]">
                      {txn.description}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-medium ${getTypeColor(txn.type)}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {txn.amount > 0 ? (
                          <>
                            <ArrowUpRight className="h-4 w-4 text-[rgb(var(--c-secondary-500))]" />
                            <span className="text-sm font-semibold text-[rgb(var(--c-secondary-500))]">
                              +{formatCurrency(txn.amount)}
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-4 w-4 text-[rgb(var(--c-error-500))]" />
                            <span className="text-sm font-semibold text-[rgb(var(--c-error-500))]">
                              {formatCurrency(txn.amount)}
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(txn.status)}`}>
                          {getStatusIcon(txn.status)}
                          <span>{txn.status}</span>
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTransactions.length === 0 && (
            <div className="px-5 py-12 text-center">
              <AlertCircle className="h-12 w-12 text-[rgb(var(--c-neutral-400))] mx-auto mb-3" />
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                No transactions found for the selected filters
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FinancePage;
