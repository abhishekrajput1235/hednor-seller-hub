// Mock data for orders
export type OrderStatus = 'Pending' | 'Processing' | 'Ready to Ship' | 'Shipped' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ShippingAddress {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  itemCount: number;
  orderValue: number;
  status: OrderStatus;
  shipByDate: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber?: string;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    orderNumber: 'ORD-2024-001',
    orderDate: '2024-01-18T10:30:00Z',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    items: [
      {
        id: 'ITEM-001',
        name: 'Premium Wireless Headphones',
        sku: 'WH-BLK-001',
        quantity: 1,
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 1,
    orderValue: 129.99,
    status: 'Pending',
    shipByDate: '2024-01-20T23:59:59Z',
    shippingAddress: {
      name: 'John Smith',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-002',
    orderNumber: 'ORD-2024-002',
    orderDate: '2024-01-18T09:15:00Z',
    customerName: 'Emily Johnson',
    customerEmail: 'emily.j@example.com',
    items: [
      {
        id: 'ITEM-002',
        name: 'Organic Cotton T-Shirt',
        sku: 'TS-BLK-M',
        quantity: 2,
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
      },
      {
        id: 'ITEM-003',
        name: 'Stainless Steel Water Bottle',
        sku: 'WB-BLU-001',
        quantity: 1,
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 3,
    orderValue: 69.97,
    status: 'Pending',
    shipByDate: '2024-01-20T23:59:59Z',
    shippingAddress: {
      name: 'Emily Johnson',
      addressLine1: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      phone: '+1 (555) 234-5678'
    },
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    orderNumber: 'ORD-2024-003',
    orderDate: '2024-01-17T16:45:00Z',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown@example.com',
    items: [
      {
        id: 'ITEM-004',
        name: 'Professional DSLR Camera Kit',
        sku: 'CAM-KIT-001',
        quantity: 1,
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 1,
    orderValue: 599.99,
    status: 'Processing',
    shipByDate: '2024-01-19T23:59:59Z',
    shippingAddress: {
      name: 'Michael Brown',
      addressLine1: '789 Pine Road',
      addressLine2: 'Suite 200',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      phone: '+1 (555) 345-6789'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-004',
    orderNumber: 'ORD-2024-004',
    orderDate: '2024-01-17T14:20:00Z',
    customerName: 'Sarah Davis',
    customerEmail: 'sarah.d@example.com',
    items: [
      {
        id: 'ITEM-005',
        name: 'Yoga Mat - Extra Thick',
        sku: 'YM-PNK-01',
        quantity: 1,
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop'
      },
      {
        id: 'ITEM-006',
        name: 'Resistance Bands Set',
        sku: 'RB-SET-01',
        quantity: 1,
        price: 29.99
      }
    ],
    itemCount: 2,
    orderValue: 64.98,
    status: 'Processing',
    shipByDate: '2024-01-19T23:59:59Z',
    shippingAddress: {
      name: 'Sarah Davis',
      addressLine1: '321 Elm Street',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      phone: '+1 (555) 456-7890'
    },
    paymentMethod: 'Debit Card'
  },
  {
    id: 'ORD-005',
    orderNumber: 'ORD-2024-005',
    orderDate: '2024-01-17T11:00:00Z',
    customerName: 'David Wilson',
    customerEmail: 'dwilson@example.com',
    items: [
      {
        id: 'ITEM-007',
        name: 'Gaming Mouse - RGB LED',
        sku: 'GM-BLK-01',
        quantity: 1,
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 1,
    orderValue: 49.99,
    status: 'Ready to Ship',
    shipByDate: '2024-01-19T23:59:59Z',
    shippingAddress: {
      name: 'David Wilson',
      addressLine1: '654 Maple Drive',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      phone: '+1 (555) 567-8901'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-006',
    orderNumber: 'ORD-2024-006',
    orderDate: '2024-01-16T15:30:00Z',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.a@example.com',
    items: [
      {
        id: 'ITEM-008',
        name: 'Leather Laptop Backpack',
        sku: 'BP-BRN-01',
        quantity: 1,
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 1,
    orderValue: 79.99,
    status: 'Ready to Ship',
    shipByDate: '2024-01-18T23:59:59Z',
    shippingAddress: {
      name: 'Lisa Anderson',
      addressLine1: '987 Cedar Lane',
      city: 'Philadelphia',
      state: 'PA',
      zipCode: '19101',
      phone: '+1 (555) 678-9012'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-007',
    orderNumber: 'ORD-2024-007',
    orderDate: '2024-01-16T10:15:00Z',
    customerName: 'Robert Taylor',
    customerEmail: 'rtaylor@example.com',
    items: [
      {
        id: 'ITEM-009',
        name: 'Portable Bluetooth Speaker',
        sku: 'SPK-BLK-01',
        quantity: 2,
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 2,
    orderValue: 79.98,
    status: 'Shipped',
    shipByDate: '2024-01-18T23:59:59Z',
    shippingAddress: {
      name: 'Robert Taylor',
      addressLine1: '147 Birch Avenue',
      city: 'San Antonio',
      state: 'TX',
      zipCode: '78201',
      phone: '+1 (555) 789-0123'
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK1234567890'
  },
  {
    id: 'ORD-008',
    orderNumber: 'ORD-2024-008',
    orderDate: '2024-01-15T13:45:00Z',
    customerName: 'Jennifer Martinez',
    customerEmail: 'jmartinez@example.com',
    items: [
      {
        id: 'ITEM-010',
        name: 'Ergonomic Office Chair',
        sku: 'CHR-BLK-01',
        quantity: 1,
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 1,
    orderValue: 199.99,
    status: 'Shipped',
    shipByDate: '2024-01-17T23:59:59Z',
    shippingAddress: {
      name: 'Jennifer Martinez',
      addressLine1: '258 Walnut Street',
      addressLine2: 'Unit 12',
      city: 'San Diego',
      state: 'CA',
      zipCode: '92101',
      phone: '+1 (555) 890-1234'
    },
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK0987654321'
  },
  {
    id: 'ORD-009',
    orderNumber: 'ORD-2024-009',
    orderDate: '2024-01-15T09:30:00Z',
    customerName: 'Christopher Lee',
    customerEmail: 'clee@example.com',
    items: [
      {
        id: 'ITEM-011',
        name: 'Smart Watch Fitness Tracker',
        sku: 'SW-BLK-01',
        quantity: 1,
        price: 89.99
      }
    ],
    itemCount: 1,
    orderValue: 89.99,
    status: 'Cancelled',
    shipByDate: '2024-01-17T23:59:59Z',
    shippingAddress: {
      name: 'Christopher Lee',
      addressLine1: '369 Spruce Court',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      phone: '+1 (555) 901-2345'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-010',
    orderNumber: 'ORD-2024-010',
    orderDate: '2024-01-14T16:00:00Z',
    customerName: 'Amanda White',
    customerEmail: 'awhite@example.com',
    items: [
      {
        id: 'ITEM-012',
        name: 'Ceramic Cookware Set',
        sku: 'CKW-SET-01',
        quantity: 1,
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=100&h=100&fit=crop'
      }
    ],
    itemCount: 1,
    orderValue: 149.99,
    status: 'Shipped',
    shipByDate: '2024-01-16T23:59:59Z',
    shippingAddress: {
      name: 'Amanda White',
      addressLine1: '741 Ash Boulevard',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95101',
      phone: '+1 (555) 012-3456'
    },
    paymentMethod: 'Debit Card',
    trackingNumber: 'TRK1122334455'
  },
  {
    id: 'ORD-011',
    orderNumber: 'ORD-2024-011',
    orderDate: '2024-01-18T12:00:00Z',
    customerName: 'Thomas Harris',
    customerEmail: 'tharris@example.com',
    items: [
      {
        id: 'ITEM-013',
        name: 'LED Desk Lamp',
        sku: 'LMP-WHT-01',
        quantity: 2,
        price: 29.99
      }
    ],
    itemCount: 2,
    orderValue: 59.98,
    status: 'Pending',
    shipByDate: '2024-01-20T23:59:59Z',
    shippingAddress: {
      name: 'Thomas Harris',
      addressLine1: '852 Cherry Lane',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      phone: '+1 (555) 123-7890'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-012',
    orderNumber: 'ORD-2024-012',
    orderDate: '2024-01-17T08:30:00Z',
    customerName: 'Patricia Clark',
    customerEmail: 'pclark@example.com',
    items: [
      {
        id: 'ITEM-014',
        name: 'Wireless Keyboard & Mouse Combo',
        sku: 'KBD-BLK-01',
        quantity: 1,
        price: 59.99
      }
    ],
    itemCount: 1,
    orderValue: 59.99,
    status: 'Ready to Ship',
    shipByDate: '2024-01-19T23:59:59Z',
    shippingAddress: {
      name: 'Patricia Clark',
      addressLine1: '963 Hickory Way',
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32099',
      phone: '+1 (555) 234-8901'
    },
    paymentMethod: 'PayPal'
  }
];

// Helper function to get orders by status
export const getOrdersByStatus = (status: OrderStatus | 'All'): Order[] => {
  if (status === 'All') return mockOrders;
  return mockOrders.filter(order => order.status === status);
};

// Helper function to get order counts by status
export const getOrderCounts = () => {
  return {
    All: mockOrders.length,
    Pending: mockOrders.filter(o => o.status === 'Pending').length,
    Processing: mockOrders.filter(o => o.status === 'Processing').length,
    'Ready to Ship': mockOrders.filter(o => o.status === 'Ready to Ship').length,
    Shipped: mockOrders.filter(o => o.status === 'Shipped').length,
    Cancelled: mockOrders.filter(o => o.status === 'Cancelled').length,
  };
};
