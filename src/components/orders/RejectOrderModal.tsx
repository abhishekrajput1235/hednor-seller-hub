import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface RejectOrderModalProps {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const RejectOrderModal: React.FC<RejectOrderModalProps> = ({
  isOpen,
  orderNumber,
  onClose,
  onConfirm,
}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    'Out of Stock',
    'Price Error',
    'Unable to Ship to Location',
    'Product Discontinued',
    'Duplicate Order',
    'Fraudulent Order',
    'Other',
  ];

  const handleConfirm = () => {
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    if (reason) {
      onConfirm(reason);
      setSelectedReason('');
      setCustomReason('');
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--c-neutral-200))]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[rgb(var(--c-neutral-900))]">
                  Reject Order
                </h3>
                <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                  {orderNumber}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-[rgb(var(--c-neutral-600))]" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <p className="text-sm text-[rgb(var(--c-neutral-700))] mb-4">
              Please select a reason for rejecting this order. This information will be logged for your records.
            </p>

            <div className="space-y-2 mb-4">
              {reasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center p-3 border border-[rgb(var(--c-neutral-200))] rounded-lg cursor-pointer hover:bg-[rgb(var(--c-neutral-50))] transition-colors"
                >
                  <input
                    type="radio"
                    name="reject-reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-[rgb(var(--c-primary-500))] focus:ring-2 focus:ring-[rgb(var(--c-primary-500))]"
                  />
                  <span className="ml-3 text-sm text-[rgb(var(--c-neutral-900))]">
                    {reason}
                  </span>
                </label>
              ))}
            </div>

            {selectedReason === 'Other' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                  Please specify the reason
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                  placeholder="Enter your reason here..."
                  className="w-full px-3 py-2 border border-[rgb(var(--c-neutral-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent text-sm"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgb(var(--c-neutral-200))]">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-[rgb(var(--c-neutral-700))] bg-white border border-[rgb(var(--c-neutral-300))] rounded-lg hover:bg-[rgb(var(--c-neutral-50))] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedReason || (selectedReason === 'Other' && !customReason.trim())}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectOrderModal;
