import React from 'react';
import { Order } from './mockOrderData';
import OrderStatusBadge from './OrderStatusBadge';
import OrderActionButtons from './OrderActionButtons';
import { Package } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
  onAccept: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onPack: (orderId: string) => void;
  onShip: (orderId: string) => void;
  onViewDetails: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onOrderClick,
  onAccept,
  onReject,
  onPack,
  onShip,
  onViewDetails,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const isUrgent = (shipByDate: string) => {
    const now = new Date();
    const shipBy = new Date(shipByDate);
    const hoursUntilShip = (shipBy.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilShip <= 24 && hoursUntilShip > 0;
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] p-12 text-center dark:bg-[rgb(var(--c-bg-secondary))] dark:border-[rgb(var(--c-neutral-600))]">
        <Package className="w-12 h-12 mx-auto text-[rgb(var(--c-neutral-400))] mb-3" />
        <p className="text-[rgb(var(--c-neutral-600))] text-sm">No orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] overflow-hidden dark:bg-[rgb(var(--c-bg-secondary))] dark:border-[rgb(var(--c-neutral-600))] dark:text-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[rgb(var(--c-neutral-50))] sticky top-0 z-10 dark:bg-[rgb(var(--c-bg-secondary))] dark:border-[rgb(var(--c-neutral-600))]">
            <tr className="border-b border-[rgb(var(--c-neutral-200))]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Order Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Customer
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Items
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Order Value
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Ship By
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgb(var(--c-neutral-200))]">
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => onOrderClick(order)}
                className="hover:bg-[rgb(var(--c-neutral-50))] cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 dark:text-white">
                  <div className="text-sm font-medium text-[rgb(var(--c-neutral-900))]">
                    {order.orderNumber}
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-white">
                  <div className="text-sm text-[rgb(var(--c-neutral-900))]">
                    {formatDate(order.orderDate)}
                  </div>
                  <div className="text-xs text-[rgb(var(--c-neutral-500))]">
                    {formatTime(order.orderDate)}
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-white">
                  <div className="text-sm font-medium text-[rgb(var(--c-neutral-900))]">
                    {order.customerName}
                  </div>
                  <div className="text-xs text-[rgb(var(--c-neutral-500))]">
                    {order.customerEmail}
                  </div>
                </td>
                <td className="px-4 py-3 text-center dark:text-white">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[rgb(var(--c-neutral-100))] text-sm font-medium text-[rgb(var(--c-neutral-700))]">
                    {order.itemCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-right dark:text-white">
                  <div className="text-sm font-semibold text-[rgb(var(--c-neutral-900))]">
                    {formatCurrency(order.orderValue)}
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-white">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 dark:text-white">
                  <div
                    className={`text-sm ${isUrgent(order.shipByDate)
                      ? 'text-red-600 font-semibold'
                      : 'text-[rgb(var(--c-neutral-900))]'
                      }`}
                  >
                    {formatDate(order.shipByDate)}
                  </div>
                  {isUrgent(order.shipByDate) && (
                    <div className="text-xs text-red-600">Urgent!</div>
                  )}
                </td>
                <td className="px-4 py-3 dark:text-white">
                  <div className="flex justify-end">
                    <OrderActionButtons
                      orderId={order.id}
                      status={order.status}
                      onAccept={onAccept}
                      onReject={onReject}
                      onPack={onPack}
                      onShip={onShip}
                      onViewDetails={onViewDetails}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
