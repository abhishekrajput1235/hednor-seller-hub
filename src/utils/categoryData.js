// Category hierarchy and data

export const categoryHierarchy = {
  'Electronics': {
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Cameras', 'Accessories'],
    attributes: ['Brand', 'Model', 'Color', 'Storage', 'RAM', 'Screen Size']
  },
  'Fashion': {
    subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'],
    attributes: ['Size', 'Color', 'Material', 'Brand', 'Pattern']
  },
  'Home & Garden': {
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Garden Tools'],
    attributes: ['Material', 'Color', 'Dimensions', 'Brand']
  },
  'Sports': {
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'],
    attributes: ['Size', 'Color', 'Material', 'Brand', 'Weight']
  },
  'Books': {
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children'],
    attributes: ['Author', 'Publisher', 'Language', 'Format', 'Pages']
  },
  'Toys': {
    subcategories: ['Action Figures', 'Dolls', 'Board Games', 'Educational'],
    attributes: ['Age Range', 'Brand', 'Material', 'Color']
  }
};

export const sizeOptions = {
  'Clothing': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
  'Shoes': ['6', '7', '8', '9', '10', '11', '12', '13'],
  'Kids': ['2T', '3T', '4T', '5T', '6', '7', '8', '10', '12', '14', '16'],
  'Accessories': ['One Size', 'Small', 'Medium', 'Large']
};

export const countries = [
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹' },
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£' },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: '$' },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: '$' },
  { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€' },
  { code: 'FR', name: 'France', currency: 'EUR', symbol: '€' },
  { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥' },
  { code: 'CN', name: 'China', currency: 'CNY', symbol: '¥' }
];

export const colorOptions = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Navy', hex: '#000080' }
];

export const materialOptions = [
  'Cotton',
  'Polyester',
  'Leather',
  'Wool',
  'Silk',
  'Denim',
  'Linen',
  'Nylon',
  'Spandex',
  'Velvet',
  'Suede',
  'Canvas'
];
