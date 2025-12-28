// Mock data for inventory management
export interface InventoryVariant {
  sku: string;
  variant: string; // e.g., "Black / Large", "32oz"
  availableStock: number;
  reservedStock: number;
  status: 'In stock' | 'Low stock' | 'Out of stock';
}

export interface InventoryProduct {
  id: string;
  productName: string;
  thumbnail: string;
  variants: InventoryVariant[];
}

const getStockStatus = (available: number): 'In stock' | 'Low stock' | 'Out of stock' => {
  if (available === 0) return 'Out of stock';
  if (available <= 10) return 'Low stock';
  return 'In stock';
};

export const mockInventoryData: InventoryProduct[] = [
  {
    id: 'PRD-001',
    productName: 'Premium Wireless Bluetooth Headphones',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'WH-BLK-001',
        variant: 'Black',
        availableStock: 45,
        reservedStock: 5,
        status: getStockStatus(45)
      },
      {
        sku: 'WH-WHT-001',
        variant: 'White',
        availableStock: 32,
        reservedStock: 3,
        status: getStockStatus(32)
      },
      {
        sku: 'WH-BLU-001',
        variant: 'Blue',
        availableStock: 8,
        reservedStock: 2,
        status: getStockStatus(8)
      }
    ]
  },
  {
    id: 'PRD-002',
    productName: 'Organic Cotton T-Shirt - Classic Fit',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'TS-BLK-S',
        variant: 'Black / Small',
        availableStock: 12,
        reservedStock: 1,
        status: getStockStatus(12)
      },
      {
        sku: 'TS-BLK-M',
        variant: 'Black / Medium',
        availableStock: 5,
        reservedStock: 3,
        status: getStockStatus(5)
      },
      {
        sku: 'TS-BLK-L',
        variant: 'Black / Large',
        availableStock: 15,
        reservedStock: 2,
        status: getStockStatus(15)
      },
      {
        sku: 'TS-WHT-M',
        variant: 'White / Medium',
        availableStock: 20,
        reservedStock: 0,
        status: getStockStatus(20)
      },
      {
        sku: 'TS-WHT-L',
        variant: 'White / Large',
        availableStock: 3,
        reservedStock: 7,
        status: getStockStatus(3)
      }
    ]
  },
  {
    id: 'PRD-003',
    productName: 'Stainless Steel Water Bottle',
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'WB-32OZ-BLK',
        variant: '32oz / Black',
        availableStock: 0,
        reservedStock: 0,
        status: getStockStatus(0)
      },
      {
        sku: 'WB-32OZ-SLV',
        variant: '32oz / Silver',
        availableStock: 0,
        reservedStock: 2,
        status: getStockStatus(0)
      }
    ]
  },
  {
    id: 'PRD-004',
    productName: 'Professional DSLR Camera Kit',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'CAM-KIT-001',
        variant: 'Body + 18-55mm',
        availableStock: 8,
        reservedStock: 1,
        status: getStockStatus(8)
      },
      {
        sku: 'CAM-KIT-002',
        variant: 'Body + 18-55mm + 55-200mm',
        availableStock: 5,
        reservedStock: 0,
        status: getStockStatus(5)
      }
    ]
  },
  {
    id: 'PRD-005',
    productName: 'Yoga Mat - Extra Thick Non-Slip',
    thumbnail: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'YM-PNK-01',
        variant: 'Pink',
        availableStock: 25,
        reservedStock: 3,
        status: getStockStatus(25)
      },
      {
        sku: 'YM-BLU-01',
        variant: 'Blue',
        availableStock: 30,
        reservedStock: 5,
        status: getStockStatus(30)
      },
      {
        sku: 'YM-GRN-01',
        variant: 'Green',
        availableStock: 22,
        reservedStock: 2,
        status: getStockStatus(22)
      },
      {
        sku: 'YM-PRP-01',
        variant: 'Purple',
        availableStock: 6,
        reservedStock: 4,
        status: getStockStatus(6)
      }
    ]
  },
  {
    id: 'PRD-006',
    productName: 'Leather Laptop Backpack - 15.6 inch',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'BP-BRN-01',
        variant: 'Brown',
        availableStock: 3,
        reservedStock: 1,
        status: getStockStatus(3)
      },
      {
        sku: 'BP-BLK-01',
        variant: 'Black',
        availableStock: 5,
        reservedStock: 0,
        status: getStockStatus(5)
      }
    ]
  },
  {
    id: 'PRD-007',
    productName: 'Smart Watch - Fitness Tracker',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'SW-BLK-01',
        variant: 'Black',
        availableStock: 42,
        reservedStock: 8,
        status: getStockStatus(42)
      },
      {
        sku: 'SW-SLV-01',
        variant: 'Silver',
        availableStock: 35,
        reservedStock: 5,
        status: getStockStatus(35)
      }
    ]
  },
  {
    id: 'PRD-008',
    productName: 'Ceramic Non-Stick Cookware Set',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'CW-10PC-01',
        variant: '10 Pieces',
        availableStock: 18,
        reservedStock: 2,
        status: getStockStatus(18)
      }
    ]
  },
  {
    id: 'PRD-009',
    productName: 'Gaming Mouse - RGB LED',
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'GM-RGB-01',
        variant: 'RGB Black',
        availableStock: 67,
        reservedStock: 10,
        status: getStockStatus(67)
      }
    ]
  },
  {
    id: 'PRD-010',
    productName: 'Portable Bluetooth Speaker',
    thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'SPK-BLK-01',
        variant: 'Black',
        availableStock: 0,
        reservedStock: 0,
        status: getStockStatus(0)
      },
      {
        sku: 'SPK-BLU-01',
        variant: 'Blue',
        availableStock: 0,
        reservedStock: 3,
        status: getStockStatus(0)
      },
      {
        sku: 'SPK-RED-01',
        variant: 'Red',
        availableStock: 2,
        reservedStock: 1,
        status: getStockStatus(2)
      }
    ]
  },
  {
    id: 'PRD-011',
    productName: 'Ergonomic Office Chair',
    thumbnail: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'CHR-BLK-01',
        variant: 'Black',
        availableStock: 12,
        reservedStock: 3,
        status: getStockStatus(12)
      },
      {
        sku: 'CHR-GRY-01',
        variant: 'Gray',
        availableStock: 9,
        reservedStock: 1,
        status: getStockStatus(9)
      }
    ]
  },
  {
    id: 'PRD-012',
    productName: 'LED Desk Lamp',
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
    variants: [
      {
        sku: 'LMP-WHT-01',
        variant: 'White',
        availableStock: 54,
        reservedStock: 6,
        status: getStockStatus(54)
      },
      {
        sku: 'LMP-BLK-01',
        variant: 'Black',
        availableStock: 41,
        reservedStock: 4,
        status: getStockStatus(41)
      }
    ]
  }
];
