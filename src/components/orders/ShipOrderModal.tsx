import React, { useState } from 'react';
import { X, Truck, Package } from 'lucide-react';

interface ShipOrderModalProps {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
  onConfirm: (trackingNumber: string, carrier: string) => void;
}

const ShipOrderModal: React.FC<ShipOrderModalProps> = ({
  isOpen,
  orderNumber,
  onClose,
  onConfirm,
}) => {
  const [carrier, setCarrier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const carriers = ['UPS', 'FedEx', 'USPS', 'DHL', 'Amazon Logistics', 'Other'];

  const handleConfirm = () => {
    if (!carrier || !trackingNumber.trim()) return;
    onConfirm(trackingNumber.trim(), carrier);
    setCarrier('');
    setTrackingNumber('');
  };

  const handleClose = () => {
    setCarrier('');
    setTrackingNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgb(var(--c-neutral-900))]/40"
      onClick={handleClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-xl shadow-xl border border-[rgb(var(--c-neutral-200))] bg-[rgb(var(--c-neutral-100))] dark:bg-black"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--c-neutral-200))]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))]">
                Ship Order
              </h3>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                {orderNumber}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-[rgb(var(--c-neutral-100))]"
          >
            <X className="w-5 h-5 text-[rgb(var(--c-neutral-600))]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="flex gap-3 p-3 mb-4 rounded-lg bg-[rgb(var(--c-neutral-100))] border border-[rgb(var(--c-neutral-200))]">
            <Package className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              Enter tracking details to mark this order as shipped.
              The customer will be notified automatically.
            </p>
          </div>

          {/* Carrier */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
              Shipping Carrier <span className="text-red-500">*</span>
            </label>
            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[rgb(var(--c-neutral-100))] border border-[rgb(var(--c-neutral-300))] rounded-lg focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:outline-none"
            >
              <option value="">Select a carrier</option>
              {carriers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Tracking */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-1">
              Tracking Number <span className="text-red-500">*</span>
            </label>
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className="w-full px-3 py-2 text-sm bg-[rgb(var(--c-neutral-100))] border border-[rgb(var(--c-neutral-300))] rounded-lg focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:outline-none"
            />
          </div>

          <p className="text-xs text-[rgb(var(--c-neutral-600))]">
            Tracking details cannot be changed once submitted.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[rgb(var(--c-neutral-200))]">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-[rgb(var(--c-neutral-700))] bg-[rgb(var(--c-neutral-100))] border border-[rgb(var(--c-neutral-300))] rounded-lg hover:bg-[rgb(var(--c-neutral-50))]"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!carrier || !trackingNumber.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            Mark as Shipped
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipOrderModal;

