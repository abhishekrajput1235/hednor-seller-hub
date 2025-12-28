// Mock data for catalog products
export interface ProductVariant {
  sku: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
  reservedStock: number;
  status: 'Active' | 'Inactive';
}

export interface Product {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  skuCount: number;
  variants?: ProductVariant[];
  priceMin: number;
  priceMax?: number;
  totalStock: number;
  reservedStock: number;
  status: 'Active' | 'Inactive' | 'Draft' | 'Blocked';
  visibility: 'Published' | 'Unpublished';
  lastUpdated: string;
}

export const mockProducts: Product[] = [
  {
    id: 'PRD-001',
    title: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    category: 'Electronics',
    skuCount: 3,
    variants: [
      { sku: 'WH-BLK-001', color: 'Black', price: 129.99, stock: 45, reservedStock: 5, status: 'Active' },
      { sku: 'WH-WHT-001', color: 'White', price: 139.99, stock: 32, reservedStock: 8, status: 'Active' },
      { sku: 'WH-BLU-001', color: 'Blue', price: 149.99, stock: 28, reservedStock: 3, status: 'Active' }
    ],
    priceMin: 129.99,
    priceMax: 149.99,
    totalStock: 105,
    reservedStock: 16,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'PRD-002',
    title: 'Organic Cotton T-Shirt - Classic Fit',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    category: 'Clothing',
    skuCount: 5,
    variants: [
      { sku: 'TS-BLK-S', size: 'S', color: 'Black', price: 24.99, stock: 12, reservedStock: 2, status: 'Active' },
      { sku: 'TS-BLK-M', size: 'M', color: 'Black', price: 24.99, stock: 8, reservedStock: 1, status: 'Active' },
      { sku: 'TS-BLK-L', size: 'L', color: 'Black', price: 24.99, stock: 15, reservedStock: 3, status: 'Active' },
      { sku: 'TS-WHT-M', size: 'M', color: 'White', price: 29.99, stock: 20, reservedStock: 5, status: 'Active' },
      { sku: 'TS-WHT-L', size: 'L', color: 'White', price: 29.99, stock: 10, reservedStock: 2, status: 'Active' }
    ],
    priceMin: 24.99,
    priceMax: 29.99,
    totalStock: 65,
    reservedStock: 13,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-14T15:45:00Z'
  },
  {
    id: 'PRD-003',
    title: 'Stainless Steel Water Bottle 32oz',
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
    category: 'Home & Kitchen',
    skuCount: 1,
    priceMin: 19.99,
    totalStock: 0,
    reservedStock: 0,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-13T09:20:00Z'
  },
  {
    id: 'PRD-004',
    title: 'Professional DSLR Camera Kit with 18-55mm Lens',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop',
    category: 'Electronics',
    skuCount: 2,
    variants: [
      { sku: 'CAM-KIT-001', color: 'Black', price: 599.99, stock: 8, reservedStock: 2, status: 'Active' },
      { sku: 'CAM-KIT-002', color: 'Silver', price: 649.99, stock: 5, reservedStock: 1, status: 'Active' }
    ],
    priceMin: 599.99,
    priceMax: 649.99,
    totalStock: 13,
    reservedStock: 3,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-16T11:00:00Z'
  },
  {
    id: 'PRD-005',
    title: 'Yoga Mat - Extra Thick Non-Slip Exercise Mat',
    thumbnail: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
    category: 'Sports & Fitness',
    skuCount: 4,
    variants: [
      { sku: 'YM-PNK-01', color: 'Pink', price: 34.99, stock: 25, reservedStock: 4, status: 'Active' },
      { sku: 'YM-BLU-01', color: 'Blue', price: 34.99, stock: 30, reservedStock: 6, status: 'Active' },
      { sku: 'YM-GRN-01', color: 'Green', price: 39.99, stock: 22, reservedStock: 3, status: 'Active' },
      { sku: 'YM-PRP-01', color: 'Purple', price: 39.99, stock: 18, reservedStock: 2, status: 'Active' }
    ],
    priceMin: 34.99,
    priceMax: 39.99,
    totalStock: 95,
    reservedStock: 15,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-12T14:30:00Z'
  },
  {
    id: 'PRD-006',
    title: 'Leather Laptop Backpack - 15.6 inch',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
    category: 'Bags & Accessories',
    skuCount: 2,
    variants: [
      { sku: 'BP-BRN-01', color: 'Brown', price: 79.99, stock: 3, reservedStock: 1, status: 'Active' },
      { sku: 'BP-BLK-01', color: 'Black', price: 89.99, stock: 5, reservedStock: 2, status: 'Active' }
    ],
    priceMin: 79.99,
    priceMax: 89.99,
    totalStock: 8,
    reservedStock: 3,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-11T16:15:00Z'
  },
  {
    id: 'PRD-007',
    title: 'Smart Watch - Fitness Tracker with Heart Rate Monitor',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    category: 'Electronics',
    skuCount: 1,
    priceMin: 89.99,
    totalStock: 42,
    reservedStock: 6,
    status: 'Inactive',
    visibility: 'Unpublished',
    lastUpdated: '2024-01-10T08:45:00Z'
  },
  {
    id: 'PRD-008',
    title: 'Ceramic Non-Stick Cookware Set - 10 Pieces',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=100&h=100&fit=crop',
    category: 'Home & Kitchen',
    skuCount: 1,
    priceMin: 149.99,
    totalStock: 18,
    reservedStock: 4,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-09T13:20:00Z'
  },
  {
    id: 'PRD-009',
    title: 'Gaming Mouse - RGB LED with Programmable Buttons',
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
    category: 'Electronics',
    skuCount: 1,
    priceMin: 49.99,
    totalStock: 67,
    reservedStock: 12,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-17T10:00:00Z'
  },
  {
    id: 'PRD-010',
    title: 'Portable Bluetooth Speaker - Waterproof IPX7',
    thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
    category: 'Electronics',
    skuCount: 3,
    variants: [
      { sku: 'SPK-BLK-01', color: 'Black', price: 39.99, stock: 0, reservedStock: 0, status: 'Inactive' },
      { sku: 'SPK-BLU-01', color: 'Blue', price: 44.99, stock: 0, reservedStock: 0, status: 'Inactive' },
      { sku: 'SPK-RED-01', color: 'Red', price: 44.99, stock: 0, reservedStock: 0, status: 'Inactive' }
    ],
    priceMin: 39.99,
    priceMax: 44.99,
    totalStock: 0,
    reservedStock: 0,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-08T12:30:00Z'
  },
  {
    id: 'PRD-011',
    title: 'Ergonomic Office Chair - Lumbar Support',
    thumbnail: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop',
    category: 'Furniture',
    skuCount: 2,
    variants: [
      { sku: 'CHR-BLK-01', color: 'Black', price: 199.99, stock: 12, reservedStock: 3, status: 'Active' },
      { sku: 'CHR-GRY-01', color: 'Gray', price: 229.99, stock: 9, reservedStock: 2, status: 'Active' }
    ],
    priceMin: 199.99,
    priceMax: 229.99,
    totalStock: 21,
    reservedStock: 5,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-07T09:15:00Z'
  },
  {
    id: 'PRD-012',
    title: 'LED Desk Lamp - Adjustable Brightness',
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
    category: 'Home & Kitchen',
    skuCount: 1,
    priceMin: 29.99,
    totalStock: 54,
    reservedStock: 8,
    status: 'Draft',
    visibility: 'Unpublished',
    lastUpdated: '2024-01-18T14:00:00Z'
  },
  {
    id: 'PRD-013',
    title: 'Wireless Gaming Keyboard - Mechanical RGB',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop',
    category: 'Electronics',
    skuCount: 3,
    variants: [
      { sku: 'KB-BLK-MX', color: 'Black', size: 'Full Size', price: 119.99, stock: 2, reservedStock: 1, status: 'Active' },
      { sku: 'KB-WHT-MX', color: 'White', size: 'Full Size', price: 129.99, stock: 4, reservedStock: 0, status: 'Active' },
      { sku: 'KB-BLK-TKL', color: 'Black', size: 'TKL', price: 109.99, stock: 6, reservedStock: 2, status: 'Active' }
    ],
    priceMin: 109.99,
    priceMax: 129.99,
    totalStock: 12,
    reservedStock: 3,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-19T16:45:00Z'
  },
  {
    id: 'PRD-014',
    title: 'Premium Sunglasses - UV Protection',
    thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop',
    category: 'Bags & Accessories',
    skuCount: 4,
    variants: [
      { sku: 'SG-BLK-POL', color: 'Black', size: 'Polarized', price: 89.99, stock: 5, reservedStock: 1, status: 'Active' },
      { sku: 'SG-BRN-POL', color: 'Brown', size: 'Polarized', price: 89.99, stock: 3, reservedStock: 0, status: 'Active' },
      { sku: 'SG-BLK-MIR', color: 'Black', size: 'Mirrored', price: 99.99, stock: 7, reservedStock: 2, status: 'Active' },
      { sku: 'SG-BLU-MIR', color: 'Blue', size: 'Mirrored', price: 99.99, stock: 4, reservedStock: 1, status: 'Active' }
    ],
    priceMin: 89.99,
    priceMax: 99.99,
    totalStock: 19,
    reservedStock: 4,
    status: 'Active',
    visibility: 'Published',
    lastUpdated: '2024-01-16T13:20:00Z'
  },
  {
    id: 'PRD-015',
    title: 'Stainless Steel Coffee Maker - 12 Cup',
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop',
    category: 'Home & Kitchen',
    skuCount: 1,
    priceMin: 79.99,
    totalStock: 28,
    reservedStock: 5,
    status: 'Blocked',
    visibility: 'Unpublished',
    lastUpdated: '2024-01-05T11:30:00Z'
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports & Fitness',
  'Bags & Accessories',
  'Furniture'
];

export const statusOptions = [
  'All Status',
  'Active',
  'Inactive',
  'Draft',
  'Blocked'
];

export const inventoryOptions = [
  'All Inventory',
  'In Stock',
  'Low Stock',
  'Out of Stock'
];

export const visibilityOptions = [
  'All Visibility',
  'Published',
  'Unpublished'
];
