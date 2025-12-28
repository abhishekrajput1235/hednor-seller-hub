import React from 'react';
import { Check, X, Package, Truck, Eye } from 'lucide-react';
import { OrderStatus } from './mockOrderData';

interface OrderActionButtonsProps {
  orderId: string;
  status: OrderStatus;
  onAccept: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onPack: (orderId: string) => void;
  onShip: (orderId: string) => void;
  onViewDetails: (orderId: string) => void;
}

const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({
  orderId,
  status,
  onAccept,
  onReject,
  onPack,
  onShip,
  onViewDetails,
}) => {
  const renderActions = () => {
    switch (status) {
      case 'Pending':
        return (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAccept(orderId);
              }}
              className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors flex items-center gap-1"
              title="Accept Order"
            >
              <Check className="w-3.5 h-3.5" />
              Accept
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReject(orderId);
              }}
              className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors flex items-center gap-1"
              title="Reject Order"
            >
              <X className="w-3.5 h-3.5" />
              Reject
            </button>
          </>
        );
      case 'Processing':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPack(orderId);
            }}
            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors flex items-center gap-1"
            title="Mark as Packed"
          >
            <Package className="w-3.5 h-3.5" />
            Pack
          </button>
        );
      case 'Ready to Ship':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShip(orderId);
            }}
            className="px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded hover:bg-purple-100 transition-colors flex items-center gap-1"
            title="Mark as Shipped"
          >
            <Truck className="w-3.5 h-3.5" />
            Ship
          </button>
        );
      case 'Shipped':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(orderId);
            }}
            className="px-3 py-1.5 text-xs font-medium text-[rgb(var(--c-neutral-700))] bg-[rgb(var(--c-neutral-100))] border border-[rgb(var(--c-neutral-300))] rounded hover:bg-[rgb(var(--c-neutral-200))] transition-colors flex items-center gap-1"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
        );
      case 'Cancelled':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(orderId);
            }}
            className="px-3 py-1.5 text-xs font-medium text-[rgb(var(--c-neutral-700))] bg-[rgb(var(--c-neutral-100))] border border-[rgb(var(--c-neutral-300))] rounded hover:bg-[rgb(var(--c-neutral-200))] transition-colors flex items-center gap-1"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {renderActions()}
    </div>
  );
};

export default OrderActionButtons;
