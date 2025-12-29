import { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Wallet,
  Plus,
  Star,
  Trash2,
  Edit3,
  Shield,
  Check,
  AlertCircle,
  X
} from 'lucide-react';
import Modal from '../../../components/common/Modal';
import { PaymentMethodIcon, TransactionStatusBadge } from '../../../components/payments';
import { generatePaymentMethods } from '../../../utils/paymentMockData';

const VendorPaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState(generatePaymentMethods());
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMethodType, setAddMethodType] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Form states
  const [bankForm, setBankForm] = useState({
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    isPrimary: false,
  });

  const handleSetPrimary = (methodId) => {
    setPaymentMethods(methods => 
      methods.map(m => ({
        ...m,
        isPrimary: m.id === methodId
      }))
    );
  };

  const handleDelete = (method) => {
    setSelectedMethod(method);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setPaymentMethods(methods => methods.filter(m => m.id !== selectedMethod.id));
    setShowDeleteConfirm(false);
    setSelectedMethod(null);
  };

  const handleAddBankAccount = () => {
    const newMethod = {
      id: Date.now(),
      type: 'bank_account',
      isPrimary: bankForm.isPrimary,
      status: 'pending',
      details: {
        accountHolder: bankForm.accountHolder,
        accountNumber: `****${bankForm.accountNumber.slice(-4)}`,
        bankName: bankForm.bankName,
        accountType: bankForm.accountType,
        routingNumber: `****${bankForm.routingNumber.slice(-4)}`,
      },
      addedDate: new Date().toISOString().split('T')[0],
      lastUsed: null,
    };

    if (bankForm.isPrimary) {
      setPaymentMethods(methods => [
        newMethod,
        ...methods.map(m => ({ ...m, isPrimary: false }))
      ]);
    } else {
      setPaymentMethods(methods => [...methods, newMethod]);
    }

    setShowAddModal(false);
    setAddMethodType(null);
    setBankForm({
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      routingNumber: '',
      accountType: 'checking',
      isPrimary: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-600 mt-1">Manage your payout destinations and payment preferences.</p>
        </div>
      </div>

      {/* Connected Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div 
            key={method.id}
            className={`bg-white rounded-xl border p-6 ${
              method.isPrimary ? 'border-primary-300 ring-2 ring-primary-100' : 'border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <PaymentMethodIcon method={method.type} variant="icon-only" size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {method.type === 'bank_account' ? method.details.bankName : method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                    </h3>
                    {method.isPrimary && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                        <Star className="w-3 h-3" />
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {method.status === 'verified' ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-orange-600">
                        <AlertCircle className="w-3 h-3" />
                        Pending Verification
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isPrimary && method.status === 'verified' && (
                  <button
                    onClick={() => handleSetPrimary(method.id)}
                    className="px-3 py-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Set as Primary
                  </button>
                )}
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-4 h-4" />
                </button>
                {!method.isPrimary && (
                  <button 
                    onClick={() => handleDelete(method)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm">
              {method.type === 'bank_account' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Holder</span>
                    <span className="text-gray-900">{method.details.accountHolder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-mono text-gray-900">{method.details.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Type</span>
                    <span className="text-gray-900 capitalize">{method.details.accountType}</span>
                  </div>
                </>
              )}
              {method.type === 'paypal' && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-900">{method.details.email}</span>
                </div>
              )}
              {method.type === 'stripe' && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Account ID</span>
                  <span className="font-mono text-gray-900">{method.details.accountId}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500">Added</span>
                <span className="text-gray-900">{new Date(method.addedDate).toLocaleDateString()}</span>
              </div>
              {method.lastUsed && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Used</span>
                  <span className="text-gray-900">{new Date(method.lastUsed).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Verification Banner */}
            {method.status === 'pending' && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Verification Required</p>
                    <p className="text-xs text-orange-600 mt-1">
                      Complete verification to use this payment method.
                    </p>
                    <button className="text-xs font-medium text-orange-700 hover:text-orange-800 mt-2">
                      Complete Verification →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Payment Method Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => { setAddMethodType('bank_account'); setShowAddModal(true); }}
            className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Bank Account</span>
          </button>

          <button
            onClick={() => { setAddMethodType('paypal'); setShowAddModal(true); }}
            className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Connect PayPal</span>
          </button>

          <button
            onClick={() => { setAddMethodType('stripe'); setShowAddModal(true); }}
            className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Connect Stripe</span>
          </button>

          <button
            onClick={() => { setAddMethodType('other'); setShowAddModal(true); }}
            className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Other Method</span>
          </button>
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Your payment information is secure</p>
          <p className="text-sm text-blue-700 mt-1">
            We use bank-level encryption to protect your financial data. Your complete account 
            details are never stored on our servers.
          </p>
        </div>
      </div>

      {/* Add Bank Account Modal */}
      <Modal
        isOpen={showAddModal && addMethodType === 'bank_account'}
        onClose={() => { setShowAddModal(false); setAddMethodType(null); }}
        title="Add Bank Account"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name *
            </label>
            <input
              type="text"
              value={bankForm.accountHolder}
              onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter account holder name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              value={bankForm.bankName}
              onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter bank name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number *
            </label>
            <input
              type="text"
              value={bankForm.accountNumber}
              onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter account number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Account Number *
            </label>
            <input
              type="text"
              value={bankForm.confirmAccountNumber}
              onChange={(e) => setBankForm({ ...bankForm, confirmAccountNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Re-enter account number"
            />
            {bankForm.accountNumber && bankForm.confirmAccountNumber && 
             bankForm.accountNumber !== bankForm.confirmAccountNumber && (
              <p className="text-xs text-red-600 mt-1">Account numbers do not match</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Routing Number *
            </label>
            <input
              type="text"
              value={bankForm.routingNumber}
              onChange={(e) => setBankForm({ ...bankForm, routingNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter routing number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type *
            </label>
            <select
              value={bankForm.accountType}
              onChange={(e) => setBankForm({ ...bankForm, accountType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={bankForm.isPrimary}
              onChange={(e) => setBankForm({ ...bankForm, isPrimary: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Set as primary payment method</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => { setShowAddModal(false); setAddMethodType(null); }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBankAccount}
              disabled={
                !bankForm.accountHolder || 
                !bankForm.bankName || 
                !bankForm.accountNumber || 
                !bankForm.routingNumber ||
                bankForm.accountNumber !== bankForm.confirmAccountNumber
              }
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Bank Account
            </button>
          </div>
        </div>
      </Modal>

      {/* Connect PayPal Modal */}
      <Modal
        isOpen={showAddModal && addMethodType === 'paypal'}
        onClose={() => { setShowAddModal(false); setAddMethodType(null); }}
        title="Connect PayPal"
        size="md"
      >
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Connect Your PayPal Account</h3>
            <p className="text-sm text-gray-600 mt-2">
              Click the button below to securely connect your PayPal account for receiving payouts.
            </p>
          </div>
          <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Connect with PayPal
          </button>
          <p className="text-xs text-gray-500">
            You will be redirected to PayPal to authorize the connection.
          </p>
        </div>
      </Modal>

      {/* Connect Stripe Modal */}
      <Modal
        isOpen={showAddModal && addMethodType === 'stripe'}
        onClose={() => { setShowAddModal(false); setAddMethodType(null); }}
        title="Connect Stripe"
        size="md"
      >
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <CreditCard className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Connect Your Stripe Account</h3>
            <p className="text-sm text-gray-600 mt-2">
              Connect your Stripe account to receive payouts directly to your Stripe balance.
            </p>
          </div>
          <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
            Connect with Stripe
          </button>
          <p className="text-xs text-gray-500">
            You will be redirected to Stripe to authorize the connection.
          </p>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Remove Payment Method"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to remove this payment method? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VendorPaymentMethods;
