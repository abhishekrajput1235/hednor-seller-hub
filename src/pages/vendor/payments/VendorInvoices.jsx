import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  Filter,
  Search,
  Printer
} from 'lucide-react';
import Modal from '../../../components/common/Modal';
import { TransactionStatusBadge, DateRangePicker } from '../../../components/payments';
import { generateInvoices } from '../../../utils/paymentMockData';

const invoiceTypeIcons = {
  payout_invoice: '💰',
  commission_statement: '📊',
  tax_document: '📋',
};

const invoiceTypeLabels = {
  payout_invoice: 'Payout Invoice',
  commission_statement: 'Commission Statement',
  tax_document: 'Tax Document',
};

const VendorInvoices = () => {
  const [invoices] = useState(generateInvoices());
  const [typeFilter, setTypeFilter] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = typeFilter === 'all'
    ? invoices
    : invoices.filter(inv => inv.type === typeFilter);

  const handlePreview = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPreview(true);
  };

  // Tax summary data
  const currentYear = new Date().getFullYear();
  const totalEarnings = 156789.45;
  const totalCommission = 23518.42;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices & Tax Documents</h1>
          <p className="text-gray-600 mt-1">Access your invoices, commission statements, and tax documents.</p>
        </div>
      </div>

      {/* Tax Summary Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm text-purple-200">Tax Year {currentYear}</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-purple-200">Total Earnings</p>
                <p className="text-2xl font-bold font-mono">${totalEarnings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-purple-200">Total Commission Paid</p>
                <p className="text-2xl font-bold font-mono">${totalCommission.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Download Tax Summary
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              <FileText className="w-4 h-4" />
              View 1099-K
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Documents</option>
          <option value="payout_invoice">Payout Invoices</option>
          <option value="commission_statement">Commission Statements</option>
          <option value="tax_document">Tax Documents</option>
        </select>
        <DateRangePicker onChange={() => {}} />
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvoices.map((invoice) => (
          <div 
            key={invoice.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{invoiceTypeIcons[invoice.type]}</span>
                <div>
                  <p className="text-xs text-gray-500">{invoiceTypeLabels[invoice.type]}</p>
                  <p className="font-semibold text-gray-900">{invoice.id}</p>
                </div>
              </div>
              <TransactionStatusBadge status={invoice.status} size="xs" />
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{invoice.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{new Date(invoice.date).toLocaleDateString()}</span>
              {invoice.amount && (
                <span className="font-semibold text-gray-900 font-mono">
                  ${invoice.amount.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button 
                onClick={() => handlePreview(invoice)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      )}

      {/* Generate Custom Invoice Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Transaction Summary</option>
              <option>Commission Breakdown</option>
              <option>Payout History</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
              Generate Report
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
            Include detailed transactions
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
            Include commission breakdown
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            Include tax calculations
          </label>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Invoice Preview"
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="flex items-start justify-between pb-6 border-b border-gray-200">
              <div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-2xl">🏪</span>
                </div>
                <p className="font-bold text-gray-900">EcomAdmin Platform</p>
                <p className="text-sm text-gray-600">123 Commerce Street</p>
                <p className="text-sm text-gray-600">San Francisco, CA 94102</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{invoiceTypeLabels[selectedInvoice.type]}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedInvoice.id}</p>
                <p className="text-sm text-gray-600">Date: {new Date(selectedInvoice.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Bill To</p>
                <p className="font-medium text-gray-900">TechGear Pro LLC</p>
                <p className="text-sm text-gray-600">123 Tech Street</p>
                <p className="text-sm text-gray-600">Silicon Valley, CA 95110</p>
                <p className="text-sm text-gray-600">Tax ID: TAX-123456789</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Invoice Details</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">Period: {selectedInvoice.description}</p>
                  <p className="text-gray-600">Status: <span className="font-medium text-green-600">Paid</span></p>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Gross Earnings</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">$7,000.00</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Platform Commission (15%)</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-mono">-$1,050.00</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Processing Fee</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-mono">-$30.00</td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">Net Payout</td>
                    <td className="px-4 py-3 text-lg text-right font-bold text-green-600 font-mono">
                      ${selectedInvoice.amount?.toLocaleString() || '5,920.00'}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Payment Terms</p>
              <p>Payment has been processed to the primary payment method on file.</p>
              <p className="mt-2 text-xs text-gray-500">
                This is a computer-generated document. No signature required.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorInvoices;
