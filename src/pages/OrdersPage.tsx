import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  mockOrders,
  getOrdersByStatus,
  getOrderCounts,
  Order,
  OrderStatus
} from '../components/orders/mockOrderData';
import StatusTabs from '../components/orders/StatusTabs';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetailsDrawer from '../components/orders/OrderDetailsDrawer';
import RejectOrderModal from '../components/orders/RejectOrderModal';
import ShipOrderModal from '../components/orders/ShipOrderModal';

const OrdersPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'All'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const [orderToReject, setOrderToReject] = useState<string>('');
  const [orderToShip, setOrderToShip] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = getOrderCounts();
  const filteredOrders = getOrdersByStatus(activeStatus).filter(order => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerEmail.toLowerCase().includes(query)
    );
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleAccept = (orderId: string) => {
    console.log('Accept order:', orderId);
    // UI only - no actual logic
  };

  const handleReject = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setOrderToReject(order.orderNumber);
      setIsRejectModalOpen(true);
    }
  };

  const handleConfirmReject = (reason: string) => {
    console.log('Reject order:', orderToReject, 'Reason:', reason);
    setIsRejectModalOpen(false);
    setOrderToReject('');
    // UI only - no actual logic
  };

  const handlePack = (orderId: string) => {
    console.log('Pack order:', orderId);
    // UI only - no actual logic
  };

  const handleShip = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setOrderToShip(order.orderNumber);
      setIsShipModalOpen(true);
    }
  };

  const handleConfirmShip = (trackingNumber: string, carrier: string) => {
    console.log('Ship order:', orderToShip, 'Tracking:', trackingNumber, 'Carrier:', carrier);
    setIsShipModalOpen(false);
    setOrderToShip('');
    // UI only - no actual logic
  };

  const handleViewDetails = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      handleOrderClick(order);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Order Fulfillment
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Manage and process customer orders efficiently
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 dark:border-[rgb(var(--c-neutral-600))]">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))]" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent text-sm dark:bg-black dark:border-[rgb(var(--c-neutral-600))] dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-700 transition-colors dark:bg-black dark:border-[rgb(var(--c-neutral-600))] dark:text-white">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Status Tabs */}
      <StatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        counts={counts}
      />

      {/* Orders Table */}
      <div className="mt-4">
        <OrdersTable
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
          onAccept={handleAccept}
          onReject={handleReject}
          onPack={handlePack}
          onShip={handleShip}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 dark:bg-black dark:border-[rgb(var(--c-neutral-600))]" >
        <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Showing {filteredOrders.length} of {filteredOrders.length} orders
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Next
          </button>
        </div>
      </div>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      {/* Reject Order Modal */}
      <RejectOrderModal
        isOpen={isRejectModalOpen}
        orderNumber={orderToReject}
        onClose={() => {
          setIsRejectModalOpen(false);
          setOrderToReject('');
        }}
        onConfirm={handleConfirmReject}
      />

      {/* Ship Order Modal */}
      <ShipOrderModal
        isOpen={isShipModalOpen}
        orderNumber={orderToShip}
        onClose={() => {
          setIsShipModalOpen(false);
          setOrderToShip('');
        }}
        onConfirm={handleConfirmShip}
      />
    </div>
  );
};

export default OrdersPage;
