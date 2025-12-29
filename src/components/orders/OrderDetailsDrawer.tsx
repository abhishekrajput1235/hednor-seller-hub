// import React from 'react';
// import { X, MapPin, CreditCard, Package, Truck } from 'lucide-react';
// import { Order } from './mockOrderData';
// import OrderStatusBadge from './OrderStatusBadge';

// interface OrderDetailsDrawerProps {
//   order: Order | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({ order, isOpen, onClose }) => {
//   if (!order) return null;

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (value: number) => {
//     return `$${value.toFixed(2)}`;
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity dark:bg-[rgb(var(--c-neutral-900))]"
//           onClick={onClose}
//         />
//       )}

//       {/* Drawer */}
//       <div
//         className={`
//           fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 dark:bg-[rgb(var(--c-bg-secondary))]
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? 'translate-x-0' : 'translate-x-full'}
//         `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--c-neutral-200))]">
//             <div>
//               <h2 className="text-xl font-bold text-[rgb(var(--c-neutral-900))]">
//                 Order Details
//               </h2>
//               <p className="text-sm text-[rgb(var(--c-neutral-600))]">
//                 {order.orderNumber}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors dark:bg-[rgb(var(--c-neutral-900))] dark:hover:bg-[rgb(var(--c-neutral-100))]"
//               title="Close"
//             >
//               <X className="w-5 h-5 text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-900))]" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {/* Order Summary */}
//             <section className="mb-6 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//               <h3 className="text-sm font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider mb-3 dark:text-[rgb(var(--c-neutral-100))]">
//                 Order Summary
//               </h3>
//               <div className="bg-[rgb(var(--c-neutral-50))] rounded-lg p-4 space-y-3 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-100))]">Order Date</p>
//                     <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-neutral-100))]">
//                       {formatDate(order.orderDate)}
//                     </p>
//                   </div>
//                   <OrderStatusBadge status={order.status} />
//                 </div>
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-100))]">Customer</p>
//                     <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-neutral-100))]">
//                       {order.customerName}
//                     </p>
//                     <p className="text-xs text-[rgb(var(--c-neutral-500))] dark:text-[rgb(var(--c-neutral-100))]">
//                       {order.customerEmail}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-100))]">Order Value</p>
//                     <p className="text-lg font-bold text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-neutral-100))]">
//                       {formatCurrency(order.orderValue)}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-100))]">Ship By Date</p>
//                   <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-neutral-100))]">
//                     {formatDate(order.shipByDate)}
//                   </p>
//                 </div>
//                 {order.trackingNumber && (
//                   <div>
//                     <p className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-100))]">Tracking Number</p>
//                     <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-neutral-100))] flex items-center gap-2">
//                       <Truck className="w-4 h-4" />
//                       {order.trackingNumber}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Items to Fulfill */}
//             <section className="mb-6 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//               <h3 className="text-sm font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider mb-3 flex items-center gap-2 dark:text-[rgb(var(--c-neutral-100))]">
//                 <Package className="w-4 h-4" />
//                 Items to Fulfill ({order.items.length})
//               </h3>
//               <div className="space-y-3">
//                 {order.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex gap-4 p-4 bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]"
//                   >
//                     {item.image ? (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 bg-[rgb(var(--c-neutral-200))] rounded flex items-center justify-center">
//                         <Package className="w-8 h-8 text-[rgb(var(--c-neutral-400))]" />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <h4 className="text-sm font-medium text-[rgb(var(--c-neutral-900))] mb-1 dark:text-[rgb(var(--c-neutral-100))]">
//                         {item.name}
//                       </h4>
//                       <p className="text-xs text-[rgb(var(--c-neutral-600))] mb-2 dark:text-[rgb(var(--c-neutral-100))]">
//                         SKU: {item.sku}
//                       </p>
//                       <div className="flex justify-between items-center">
//                         <span className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-neutral-100))]">
//                           Qty: <span className="font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-neutral-100))]">{item.quantity}</span>
//                         </span>
//                         <span className="text-sm font-semibold text-[rgb(var(--c-neutral-900))]">
//                           {formatCurrency(item.price * item.quantity)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Shipping Address */}
//             <section className="mb-6 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//               <h3 className="text-sm font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider mb-3 flex items-center gap-2 dark:text-[rgb(var(--c-neutral-100))]">
//                 <MapPin className="w-4 h-4" />
//                 Shipping Address
//               </h3>
//               <div className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//                 <p className="font-medium text-[rgb(var(--c-neutral-900))] mb-2">
//                   {order.shippingAddress.name}
//                 </p>
//                 <p className="text-sm text-[rgb(var(--c-neutral-700))]">
//                   {order.shippingAddress.addressLine1}
//                 </p>
//                 {order.shippingAddress.addressLine2 && (
//                   <p className="text-sm text-[rgb(var(--c-neutral-700))]">
//                     {order.shippingAddress.addressLine2}
//                   </p>
//                 )}
//                 <p className="text-sm text-[rgb(var(--c-neutral-700))]">
//                   {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
//                 </p>
//                 <p className="text-sm text-[rgb(var(--c-neutral-700))] mt-2">
//                   Phone: {order.shippingAddress.phone}
//                 </p>
//               </div>
//             </section>

//             {/* Payment Method */}
//             <section className="mb-6 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//               <h3 className="text-sm font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider mb-3 flex items-center gap-2 dark:text-[rgb(var(--c-neutral-100))]">
//                 <CreditCard className="w-4 h-4" />
//                 Payment Method
//               </h3>
//               <div className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-4 dark:bg-[rgb(var(--c-neutral-900))] dark:border-[rgb(var(--c-neutral-600))]">
//                 <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))]">
//                   {order.paymentMethod}
//                 </p>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderDetailsDrawer;


import React from 'react';
import { X, MapPin, CreditCard, Package, Truck } from 'lucide-react';
import { Order } from './mockOrderData';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderDetailsDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!order) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70 transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full md:w-[600px]
        bg-white dark:bg-[rgb(var(--c-neutral-900))]
        shadow-2xl transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b
            border-[rgb(var(--c-neutral-200))]
            dark:border-[rgb(var(--c-neutral-800))]">

            <div>
              <h2 className="text-xl font-semibold text-[rgb(var(--c-neutral-900))]
                dark:text-[rgb(var(--c-neutral-100))]">
                Order Details
              </h2>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]
                dark:text-[rgb(var(--c-neutral-400))]">
                {order.orderNumber}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg
                hover:bg-[rgb(var(--c-neutral-100))]
                dark:hover:bg-[rgb(var(--c-neutral-800))]">
              <X className="w-5 h-5 text-[rgb(var(--c-neutral-600))]
                dark:text-[rgb(var(--c-neutral-300))]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Order Summary */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider
                text-[rgb(var(--c-neutral-600))]
                dark:text-[rgb(var(--c-neutral-400))] mb-3">
                Order Summary
              </h3>

              <div className="rounded-lg p-4 space-y-3
                bg-[rgb(var(--c-neutral-50))]
                dark:bg-[rgb(var(--c-neutral-800))]">

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-[rgb(var(--c-neutral-500))]
                      dark:text-[rgb(var(--c-neutral-400))]">
                      Order Date
                    </p>
                    <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))]
                      dark:text-[rgb(var(--c-neutral-100))]">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-[rgb(var(--c-neutral-500))]
                      dark:text-[rgb(var(--c-neutral-400))]">
                      Customer
                    </p>
                    <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))]
                      dark:text-[rgb(var(--c-neutral-100))]">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-[rgb(var(--c-neutral-500))]
                      dark:text-[rgb(var(--c-neutral-400))]">
                      {order.customerEmail}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[rgb(var(--c-neutral-500))]
                      dark:text-[rgb(var(--c-neutral-400))]">
                      Order Value
                    </p>
                    <p className="text-lg font-semibold text-[rgb(var(--c-neutral-900))]
                      dark:text-[rgb(var(--c-neutral-100))]">
                      {formatCurrency(order.orderValue)}
                    </p>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="flex items-center gap-2 text-sm
                    text-[rgb(var(--c-neutral-700))]
                    dark:text-[rgb(var(--c-neutral-300))]">
                    <Truck className="w-4 h-4" />
                    {order.trackingNumber}
                  </div>
                )}
              </div>
            </section>

            {/* Items */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3
                text-[rgb(var(--c-neutral-600))]
                dark:text-[rgb(var(--c-neutral-400))] flex items-center gap-2">
                <Package className="w-4 h-4" />
                Items ({order.items.length})
              </h3>

              <div className="space-y-3">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border
                      bg-white border-[rgb(var(--c-neutral-200))]
                      dark:bg-[rgb(var(--c-neutral-800))]
                      dark:border-[rgb(var(--c-neutral-700))]">

                    <img
                      src={item.image || ''}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover bg-gray-200"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium
                        text-[rgb(var(--c-neutral-900))]
                        dark:text-[rgb(var(--c-neutral-100))]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[rgb(var(--c-neutral-500))]
                        dark:text-[rgb(var(--c-neutral-400))]">
                        SKU: {item.sku}
                      </p>

                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-[rgb(var(--c-neutral-600))]
                          dark:text-[rgb(var(--c-neutral-300))]">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-semibold
                          text-[rgb(var(--c-neutral-900))]
                          dark:text-[rgb(var(--c-neutral-100))]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Address & Payment */}
            {[{
              title: 'Shipping Address',
              icon: MapPin,
              content: `${order.shippingAddress.name},
              ${order.shippingAddress.addressLine1},
              ${order.shippingAddress.city}`
            }, {
              title: 'Payment Method',
              icon: CreditCard,
              content: order.paymentMethod
            }].map(({ title, icon: Icon, content }) => (
              <section key={title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3
                  text-[rgb(var(--c-neutral-600))]
                  dark:text-[rgb(var(--c-neutral-400))] flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {title}
                </h3>

                <div className="p-4 rounded-lg border
                  bg-white border-[rgb(var(--c-neutral-200))]
                  dark:bg-[rgb(var(--c-neutral-800))]
                  dark:border-[rgb(var(--c-neutral-700))]
                  text-sm text-[rgb(var(--c-neutral-700))]
                  dark:text-[rgb(var(--c-neutral-300))]">
                  {content}
                </div>
              </section>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsDrawer;

