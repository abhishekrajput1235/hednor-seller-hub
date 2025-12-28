// Mock data for catalog products
export interface ProductVariant {
  sku: string;
  stock: number;
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
  status: 'Active' | 'Inactive' | 'Draft';
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
      { sku: 'WH-BLK-001', stock: 45 },
      { sku: 'WH-WHT-001', stock: 32 },
      { sku: 'WH-BLU-001', stock: 28 }
    ],
    priceMin: 129.99,
    priceMax: 149.99,
    totalStock: 105,
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
      { sku: 'TS-BLK-S', stock: 12 },
      { sku: 'TS-BLK-M', stock: 8 },
      { sku: 'TS-BLK-L', stock: 15 },
      { sku: 'TS-WHT-M', stock: 20 },
      { sku: 'TS-WHT-L', stock: 10 }
    ],
    priceMin: 24.99,
    priceMax: 29.99,
    totalStock: 65,
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
      { sku: 'CAM-KIT-001', stock: 8 },
      { sku: 'CAM-KIT-002', stock: 5 }
    ],
    priceMin: 599.99,
    priceMax: 649.99,
    totalStock: 13,
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
      { sku: 'YM-PNK-01', stock: 25 },
      { sku: 'YM-BLU-01', stock: 30 },
      { sku: 'YM-GRN-01', stock: 22 },
      { sku: 'YM-PRP-01', stock: 18 }
    ],
    priceMin: 34.99,
    priceMax: 39.99,
    totalStock: 95,
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
      { sku: 'BP-BRN-01', stock: 3 },
      { sku: 'BP-BLK-01', stock: 5 }
    ],
    priceMin: 79.99,
    priceMax: 89.99,
    totalStock: 8,
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
      { sku: 'SPK-BLK-01', stock: 0 },
      { sku: 'SPK-BLU-01', stock: 0 },
      { sku: 'SPK-RED-01', stock: 0 }
    ],
    priceMin: 39.99,
    priceMax: 44.99,
    totalStock: 0,
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
      { sku: 'CHR-BLK-01', stock: 12 },
      { sku: 'CHR-GRY-01', stock: 9 }
    ],
    priceMin: 199.99,
    priceMax: 229.99,
    totalStock: 21,
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
    status: 'Draft',
    visibility: 'Unpublished',
    lastUpdated: '2024-01-18T14:00:00Z'
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
  'Draft'
];

export const inventoryOptions = [
  'All Inventory',
  'In Stock',
  'Low Stock',
  'Out of Stock'
];
