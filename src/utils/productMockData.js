// Mock data generators for products

// Generate enhanced products with all details
export const generateEnhancedProducts = (count = 50) => {
  const statuses = ['Active', 'Draft', 'Out of Stock', 'Pending'];
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'];
  const brands = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    slug: `product-${i + 1}`,
    sku: `SKU-${String(i + 1).padStart(6, '0')}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    subcategory: 'Subcategory',
    brand: brands[Math.floor(Math.random() * brands.length)],
    price: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
    comparePrice: parseFloat((Math.random() * 1200 + 50).toFixed(2)),
    cost: parseFloat((Math.random() * 500 + 5).toFixed(2)),
    stock: Math.floor(Math.random() * 200),
    lowStockThreshold: 10,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: `This is a description for Product ${i + 1}`,
    shortDescription: `Short description for Product ${i + 1}`,
    images: [
      { id: 1, url: `https://via.placeholder.com/400x400?text=Product+${i + 1}`, isPrimary: true },
      { id: 2, url: `https://via.placeholder.com/400x400?text=Image+2`, isPrimary: false }
    ],
    variants: [],
    specifications: [
      { key: 'Material', value: 'High Quality Material' },
      { key: 'Weight', value: '1.5 kg' }
    ],
    attributes: {
      weight: 1.5,
      dimensions: { length: 10, width: 10, height: 10, unit: 'cm' },
      material: 'Premium',
      warranty: '1 Year'
    },
    seo: {
      title: `Product ${i + 1} - SEO Title`,
      description: `SEO description for Product ${i + 1}`,
      keywords: ['product', 'quality']
    },
    tags: ['featured', 'bestseller'],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    updatedAt: new Date().toISOString()
  }));
};

// Generate product categories
export const generateProductCategories = () => {
  return [
    { id: 1, name: 'Electronics', slug: 'electronics', parentId: null },
    { id: 2, name: 'Smartphones', slug: 'smartphones', parentId: 1 },
    { id: 3, name: 'Laptops', slug: 'laptops', parentId: 1 },
    { id: 4, name: 'Fashion', slug: 'fashion', parentId: null },
    { id: 5, name: 'Men', slug: 'men', parentId: 4 },
    { id: 6, name: 'Women', slug: 'women', parentId: 4 },
    { id: 7, name: 'Home & Garden', slug: 'home-garden', parentId: null },
    { id: 8, name: 'Sports', slug: 'sports', parentId: null },
    { id: 9, name: 'Books', slug: 'books', parentId: null },
    { id: 10, name: 'Toys', slug: 'toys', parentId: null }
  ];
};

// Generate product attributes
export const generateProductAttributes = () => {
  return {
    colors: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    materials: ['Cotton', 'Polyester', 'Leather', 'Wool', 'Silk', 'Denim'],
    brands: ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE']
  };
};

// Get product statistics
export const getProductStats = () => {
  const products = generateEnhancedProducts();
  
  return {
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    draft: products.filter(p => p.status === 'Draft').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length,
    pending: products.filter(p => p.status === 'Pending').length
  };
};
