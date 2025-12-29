import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown,
  Eye,
  Copy,
  Check,
  X
} from 'lucide-react';
import { 
  TransactionStatusBadge, 
  TransactionTypeBadge, 
  PaymentMethodIcon, 
  AmountDisplay,
  DateRangePicker
} from '../../../components/payments';
import Modal from '../../../components/common/Modal';
import { generateTransactions } from '../../../utils/paymentMockData';

const VendorTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const transactions = generateTransactions();

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate summary
  const totalCredit = filteredTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = filteredTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netAmount = totalCredit - totalDebit;

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-1">View and export your complete transaction history.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4" />
          Export Transactions
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Total Credit</span>
          </div>
          <p className="text-xl font-bold text-green-600 font-mono">
            +${totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">Total Debit</span>
          </div>
          <p className="text-xl font-bold text-red-600 font-mono">
            -${totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Net Amount</span>
          </div>
          <p className={`text-xl font-bold font-mono ${netAmount >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {netAmount >= 0 ? '+' : ''}${netAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Transactions</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{filteredTransactions.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, order, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="sale">Sales</option>
            <option value="refund">Refunds</option>
            <option value="payout">Payouts</option>
            <option value="commission">Commissions</option>
            <option value="adjustment">Adjustments</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          {/* Date Range */}
          <DateRangePicker onChange={() => {}} />

          {/* Clear Filters */}
          {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Debit
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className={`hover:bg-gray-50 ${transaction.amount > 0 ? 'bg-green-50/30' : transaction.amount < 0 ? 'bg-red-50/30' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-900">{transaction.id}</span>
                      <button
                        onClick={() => handleCopyId(transaction.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Copy ID"
                      >
                        {copiedId === transaction.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TransactionTypeBadge type={transaction.type} size="xs" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {transaction.orderId ? (
                        <Link to={`/orders/${transaction.orderId}`} className="text-primary-600 hover:underline">
                          {transaction.orderId}
                        </Link>
                      ) : (
                        transaction.description
                      )}
                    </div>
                    {transaction.customer && (
                      <div className="text-xs text-gray-500">{transaction.customer}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {transaction.amount < 0 && (
                      <AmountDisplay amount={Math.abs(transaction.amount)} type="debit" size="sm" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {transaction.amount > 0 && (
                      <AmountDisplay amount={transaction.amount} type="credit" size="sm" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-mono text-gray-900">
                      ${transaction.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TransactionStatusBadge status={transaction.status} size="xs" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredTransactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">1</span>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Transaction Details"
        size="md"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <TransactionTypeBadge type={selectedTransaction.type} size="md" />
                <div>
                  <p className="font-mono text-lg font-bold text-gray-900">{selectedTransaction.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedTransaction.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <TransactionStatusBadge status={selectedTransaction.status} size="md" />
            </div>

            {/* Amount */}
            <div className="text-center py-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Transaction Amount</p>
              <AmountDisplay 
                amount={selectedTransaction.amount} 
                type="auto" 
                size="3xl"
                showSign
              />
            </div>

            {/* Breakdown */}
            {selectedTransaction.type === 'sale' && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-gray-900">Amount Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Amount</span>
                    <span className="font-mono">${selectedTransaction.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Commission (15%)</span>
                    <span className="font-mono text-red-600">-${selectedTransaction.commission.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Net Earnings</span>
                      <span className="text-green-600 font-mono">${selectedTransaction.netAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Related Order */}
            {selectedTransaction.orderId && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Related Order</h4>
                <Link 
                  to={`/orders/${selectedTransaction.orderId}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-primary-600 font-medium">{selectedTransaction.orderId}</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            )}

            {/* Customer */}
            {selectedTransaction.customer && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer</h4>
                <p className="text-gray-600">{selectedTransaction.customer}</p>
              </div>
            )}

            {/* Payment Method */}
            {selectedTransaction.paymentMethod && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                <PaymentMethodIcon method={selectedTransaction.paymentMethod} size="md" />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              <button className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium">
                Report Issue
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorTransactions;
