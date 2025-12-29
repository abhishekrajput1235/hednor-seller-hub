import { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  Settings, 
  Eye,
  X,
  Download,
  Calendar,
  Check,
  AlertCircle
} from 'lucide-react';
import Modal from '../../../components/common/Modal';
import { 
  FinancialCard, 
  TransactionStatusBadge, 
  PaymentMethodIcon, 
  AmountDisplay,
  StatusTimeline,
  DateRangePicker
} from '../../../components/payments';
import { 
  generateVendorEarnings, 
  generatePayouts, 
  generatePaymentMethods 
} from '../../../utils/paymentMockData';

const VendorPayouts = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(false);

  const earnings = generateVendorEarnings();
  const payouts = generatePayouts().filter(p => p.vendorId === 1);
  const paymentMethods = generatePaymentMethods().filter(pm => pm.status === 'verified');

  const filteredPayouts = statusFilter === 'all' 
    ? payouts 
    : payouts.filter(p => p.status === statusFilter);

  const handleViewDetails = (payout) => {
    setSelectedPayout(payout);
    setShowDetailsModal(true);
  };

  const handleRequestPayout = () => {
    // Handle payout request logic
    setShowRequestModal(false);
    setPayoutAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-gray-600 mt-1">Request payouts and view your payout history.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <Wallet className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-green-600">Available Balance</p>
              <p className="text-lg font-bold text-green-700 font-mono">
                ${earnings.availableBalance.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
          >
            <ArrowUpRight className="w-4 h-4" />
            Request New Payout
          </button>
        </div>
      </div>

      {/* Auto-payout Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Automatic Payouts</h3>
            <p className="text-sm text-gray-600 mt-1">
              Automatically request payouts when your balance exceeds the threshold.
            </p>
          </div>
          <button
            onClick={() => setAutoPayoutEnabled(!autoPayoutEnabled)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              autoPayoutEnabled ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          >
            <span 
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                autoPayoutEnabled ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {autoPayoutEnabled && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Threshold
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payout Frequency
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payout Day
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <DateRangePicker onChange={() => {}} />
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 ml-auto">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Payout History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expected Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{payout.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {new Date(payout.requestDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <AmountDisplay amount={payout.amount} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm text-gray-600 font-mono">
                      ${payout.processingFee.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <AmountDisplay amount={payout.netAmount} type="credit" size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PaymentMethodIcon method={payout.paymentMethod} size="xs" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TransactionStatusBadge status={payout.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {payout.completionDate 
                        ? new Date(payout.completionDate).toLocaleDateString()
                        : new Date(payout.expectedDate).toLocaleDateString()
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleViewDetails(payout)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                    {payout.status === 'pending' && (
                      <button className="ml-3 text-red-600 hover:text-red-700 text-sm font-medium">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayouts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Wallet className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No payout requests found.</p>
          </div>
        )}
      </div>

      {/* Request Payout Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request Payout"
        size="md"
      >
        <div className="space-y-6">
          {/* Available Balance */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-sm text-green-600 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-green-700 font-mono">
              ${earnings.availableBalance.toLocaleString()}
            </p>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Withdraw
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                max={earnings.availableBalance}
                className="w-full pl-10 pr-20 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                placeholder="0.00"
              />
              <button
                onClick={() => setPayoutAmount(earnings.availableBalance.toString())}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Max
              </button>
            </div>
            {payoutAmount && (
              <p className="mt-2 text-sm text-gray-500">
                Remaining balance: ${(earnings.availableBalance - parseFloat(payoutAmount || 0)).toFixed(2)}
              </p>
            )}
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedMethod === method.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <PaymentMethodIcon method={method.type} size="sm" />
                    {method.isPrimary && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {method.type === 'bank_account' && `${method.details.bankName} • ${method.details.accountNumber}`}
                    {method.type === 'paypal' && method.details.email}
                    {method.type === 'stripe' && method.details.accountId}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Fee & Summary */}
          {payoutAmount && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Requested Amount</span>
                <span className="font-medium">${parseFloat(payoutAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Processing Fee (0.5%)</span>
                <span className="font-medium text-red-600">
                  -${(parseFloat(payoutAmount) * 0.005).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">You Will Receive</span>
                  <span className="font-bold text-green-600 font-mono">
                    ${(parseFloat(payoutAmount) * 0.995).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Expected delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          {/* Terms */}
          <label className="flex items-start gap-3">
            <input 
              type="checkbox" 
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600">
              I understand that payout requests are processed within 2-3 business days and are subject to the platform's terms and conditions.
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowRequestModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleRequestPayout}
              disabled={!payoutAmount || parseFloat(payoutAmount) <= 0}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirm Payout Request
            </button>
          </div>
        </div>
      </Modal>

      {/* Payout Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Payout Details"
        size="md"
      >
        {selectedPayout && (
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Request ID</p>
                <p className="text-lg font-bold text-gray-900">{selectedPayout.id}</p>
              </div>
              <TransactionStatusBadge status={selectedPayout.status} size="md" />
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Status Timeline</h4>
              <StatusTimeline events={selectedPayout.timeline} />
            </div>

            {/* Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-900">Payment Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Amount</span>
                  <span className="font-mono">${selectedPayout.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-mono text-red-600">-${selectedPayout.processingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Net Received</span>
                    <span className="text-green-600 font-mono">${selectedPayout.netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <PaymentMethodIcon method={selectedPayout.paymentMethod} variant="icon-only" />
                <div>
                  {selectedPayout.bankDetails.bankName && (
                    <p className="text-sm text-gray-900">{selectedPayout.bankDetails.bankName}</p>
                  )}
                  {selectedPayout.bankDetails.accountNumber && (
                    <p className="text-sm text-gray-600">{selectedPayout.bankDetails.accountNumber}</p>
                  )}
                  {selectedPayout.bankDetails.email && (
                    <p className="text-sm text-gray-600">{selectedPayout.bankDetails.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedPayout.notes && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedPayout.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              <button className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium">
                Contact Support
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorPayouts;
