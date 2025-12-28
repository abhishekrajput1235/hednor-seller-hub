import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AlertTriangle,
  PackagePlus,
  FileText,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  MessageCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ProductModal from '../components/ProductModal';

// Mock data for charts
const revenueData = [
  { date: 'Jan', revenue: 24000 },
  { date: 'Feb', revenue: 28000 },
  { date: 'Mar', revenue: 32000 },
  { date: 'Apr', revenue: 29000 },
  { date: 'May', revenue: 35000 },
  { date: 'Jun', revenue: 42000 },
  { date: 'Jul', revenue: 45670 },
];

const ordersData = [
  { date: 'Jan', orders: 120 },
  { date: 'Feb', orders: 145 },
  { date: 'Mar', orders: 160 },
  { date: 'Apr', orders: 140 },
  { date: 'May', orders: 180 },
  { date: 'Jun', orders: 210 },
  { date: 'Jul', orders: 234 },
];

// Mock data for top selling products
const topSellingProducts = [
  { name: 'Wireless Headphones', unitsSold: 245, revenue: '₹7,34,755' },
  { name: 'Smartphone Case', unitsSold: 189, revenue: '₹1,32,111' },
  { name: 'Laptop Stand', unitsSold: 156, revenue: '₹2,02,644' },
  { name: 'Bluetooth Speaker', unitsSold: 142, revenue: '₹2,69,658' },
  { name: 'USB-C Cable', unitsSold: 98, revenue: '₹29,302' },
];

// Mock data for low stock alerts
const lowStockAlerts = [
  { name: 'Wireless Mouse', stock: 5, threshold: 20 },
  { name: 'Phone Charger', stock: 8, threshold: 25 },
  { name: 'Screen Protector', stock: 3, threshold: 30 },
  { name: 'Power Bank', stock: 12, threshold: 40 },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null); // product object
  const [showEditModal, setShowEditModal] = useState(null); // product object

  // Summary stats with trend indicators
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹45,670',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-[rgb(var(--c-secondary-500))]',
      bgColor: 'bg-[rgb(var(--c-secondary-500))]/10'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-[rgb(var(--c-primary-500))]',
      bgColor: 'bg-[rgb(var(--c-primary-500))]/10'
    },
    {
      title: 'Units Sold',
      value: '3,456',
      change: '+15.3%',
      trend: 'up',
      icon: Package,
      color: 'text-[rgb(var(--c-primary-500))]',
      bgColor: 'bg-[rgb(var(--c-primary-500))]/10'
    },
    {
      title: 'Pending Orders',
      value: '23',
      change: '-5.4%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-[rgb(var(--c-warning-500))]',
      bgColor: 'bg-[rgb(var(--c-warning-500))]/10'
    }
  ];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: '₹2,999',
      stock: 25,
      status: 'Active',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Smartphone Case',
      price: '₹699',
      stock: 50,
      status: 'Active',
      image: 'https://via.placeholder.com/150'
    },
  ]);

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: FileText },
    { id: 'promotions', label: 'Promotions', icon: TrendingUp },
    { id: 'support', label: 'Support', icon: MessageCircle },
  ];

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Top Summary Section */}
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
                Performance Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-5 hover:border-[rgb(var(--c-neutral-300))] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center text-xs font-medium px-2 py-1 rounded ${
                        stat.trend === 'up' 
                          ? 'bg-[rgb(var(--c-secondary-500))]/10 text-[rgb(var(--c-secondary-500))]' 
                          : 'bg-[rgb(var(--c-error-500))]/10 text-[rgb(var(--c-error-500))]'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-[rgb(var(--c-neutral-900))]">
                        {stat.value}
                      </p>
                      <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                        {stat.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Analytics Section */}
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
                Sales Analytics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Revenue Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-5"
                >
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-[rgb(var(--c-neutral-900))]">
                      Revenue Trend
                    </h3>
                    <p className="text-xs text-[rgb(var(--c-neutral-600))] mt-1">
                      Last 7 months performance
                    </p>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--c-neutral-200))" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        stroke="rgb(var(--c-neutral-400))"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="rgb(var(--c-neutral-400))"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          border: '1px solid rgb(var(--c-neutral-200))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="rgb(var(--c-secondary-500))" 
                        strokeWidth={2}
                        dot={{ fill: 'rgb(var(--c-secondary-500))', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Orders Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                  className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg p-5"
                >
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-[rgb(var(--c-neutral-900))]">
                      Orders Trend
                    </h3>
                    <p className="text-xs text-[rgb(var(--c-neutral-600))] mt-1">
                      Last 7 months performance
                    </p>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={ordersData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--c-neutral-200))" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        stroke="rgb(var(--c-neutral-400))"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="rgb(var(--c-neutral-400))"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          border: '1px solid rgb(var(--c-neutral-200))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar 
                        dataKey="orders" 
                        fill="rgb(var(--c-primary-500))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </div>

            {/* Operational Widgets */}
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
                Operational Insights
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Top Selling Products */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg overflow-hidden"
                >
                  <div className="p-5 border-b border-[rgb(var(--c-neutral-200))]">
                    <h3 className="text-base font-semibold text-[rgb(var(--c-neutral-900))]">
                      Top Selling Products
                    </h3>
                    <p className="text-xs text-[rgb(var(--c-neutral-600))] mt-1">
                      Best performers this month
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[rgb(var(--c-neutral-50))]">
                        <tr>
                          <th className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-600))] uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-5 py-3 text-right text-xs font-medium text-[rgb(var(--c-neutral-600))] uppercase tracking-wider">
                            Units Sold
                          </th>
                          <th className="px-5 py-3 text-right text-xs font-medium text-[rgb(var(--c-neutral-600))] uppercase tracking-wider">
                            Revenue
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgb(var(--c-neutral-200))]">
                        {topSellingProducts.map((product, index) => (
                          <tr key={index} className="hover:bg-[rgb(var(--c-neutral-50))] transition-colors">
                            <td className="px-5 py-3 text-sm text-[rgb(var(--c-neutral-900))]">
                              {product.name}
                            </td>
                            <td className="px-5 py-3 text-sm text-[rgb(var(--c-neutral-900))] text-right font-medium">
                              {product.unitsSold}
                            </td>
                            <td className="px-5 py-3 text-sm text-[rgb(var(--c-neutral-900))] text-right font-medium">
                              {product.revenue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {topSellingProducts.length === 0 && (
                      <div className="px-5 py-8 text-center text-sm text-[rgb(var(--c-neutral-500))]">
                        No sales data available
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Low Stock Alerts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-lg overflow-hidden"
                >
                  <div className="p-5 border-b border-[rgb(var(--c-neutral-200))]">
                    <h3 className="text-base font-semibold text-[rgb(var(--c-neutral-900))]">
                      Low Stock Alerts
                    </h3>
                    <p className="text-xs text-[rgb(var(--c-neutral-600))] mt-1">
                      Products requiring attention
                    </p>
                  </div>
                  <div className="divide-y divide-[rgb(var(--c-neutral-200))]">
                    {lowStockAlerts.map((item, index) => (
                      <div 
                        key={index} 
                        className="px-5 py-4 hover:bg-[rgb(var(--c-neutral-50))] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[rgb(var(--c-neutral-900))]">
                              {item.name}
                            </p>
                            <p className="text-xs text-[rgb(var(--c-neutral-600))] mt-0.5">
                              Threshold: {item.threshold} units
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[rgb(var(--c-warning-500))]/10 text-[rgb(var(--c-warning-500))]">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {item.stock} left
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {lowStockAlerts.length === 0 && (
                      <div className="px-5 py-8 text-center text-sm text-[rgb(var(--c-neutral-500))]">
                        All products are well stocked
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Seller Action Panel */}
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4 pb-2 border-b border-[rgb(var(--c-neutral-200))]">
                Quick Actions
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-white border-2 border-[rgb(var(--c-primary-500))] hover:bg-[rgb(var(--c-primary-500))]/5 text-[rgb(var(--c-primary-500))] rounded-lg p-4 transition-all flex items-center justify-center space-x-3 font-medium"
                >
                  <PackagePlus className="h-5 w-5" />
                  <span>Add Product</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="bg-white border-2 border-[rgb(var(--c-neutral-300))] hover:border-[rgb(var(--c-neutral-400))] hover:bg-[rgb(var(--c-neutral-50))] text-[rgb(var(--c-neutral-700))] rounded-lg p-4 transition-all flex items-center justify-center space-x-3 font-medium"
                >
                  <FileText className="h-5 w-5" />
                  <span>View Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-white border-2 border-[rgb(var(--c-neutral-300))] hover:border-[rgb(var(--c-neutral-400))] hover:bg-[rgb(var(--c-neutral-50))] text-[rgb(var(--c-neutral-700))] rounded-lg p-4 transition-all flex items-center justify-center space-x-3 font-medium"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Update Inventory</span>
                </button>
              </motion.div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))]">
                Product Management
              </h3>
              <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </button>
            </div>

            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[rgb(var(--c-neutral-100))]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[rgb(var(--c-neutral-200))]">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[rgb(var(--c-neutral-100))]">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--c-neutral-900))]">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--c-neutral-600))]">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--c-neutral-600))]">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.status === 'Active' ? 'bg-[rgb(var(--c-secondary-500))]/10 text-[rgb(var(--c-secondary-500))]' :
                            product.status === 'Low Stock' ? 'bg-[rgb(var(--c-warning-500))]/10 text-[rgb(var(--c-warning-500))]' :
                              'bg-[rgb(var(--c-error-500))]/10 text-[rgb(var(--c-error-500))]'
                            }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--c-neutral-500))]">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setShowViewModal(product)}
                              className="text-[rgb(var(--c-primary-500))] hover:text-[rgb(var(--c-primary-500))]/80"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowEditModal(product)}
                              className="text-[rgb(var(--c-secondary-500))] hover:text-[rgb(var(--c-secondary-500))]/80"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-[rgb(var(--c-error-500))] hover:text-[rgb(var(--c-error-500))]/80"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showAddModal && (
  <ProductModal title="Add New Product" onClose={() => setShowAddModal(false)}>
    <AddProductForm
      onAdd={(newProduct) => setProducts(prev => [...prev, newProduct])}
      onClose={() => setShowAddModal(false)}
    />
  </ProductModal>
)}


{showViewModal && (
  <ProductModal title="View Product" onClose={() => setShowViewModal(null)}>
    <img
      src={showViewModal.image}
      alt={showViewModal.name}
      className="w-full h-48 object-cover rounded"
    />
    <p><strong>Name:</strong> {showViewModal.name}</p>
    <p><strong>Price:</strong> {showViewModal.price}</p>
    <p><strong>Stock:</strong> {showViewModal.stock}</p>
    <p><strong>Status:</strong> {showViewModal.status}</p>
  </ProductModal>
)}


{showEditModal && (
  <ProductModal title="Edit Product" onClose={() => setShowEditModal(null)}>
    <EditProductForm product={showEditModal} onUpdate={(updated) => {
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      setShowEditModal(null);
    }} />
  </ProductModal>
)}


          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Coming Soon
            </h3>
            <p className="text-[rgb(var(--c-neutral-600))]">
              This feature is currently under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-1">
          Performance Overview
        </h1>
        <p className="text-sm text-[rgb(var(--c-neutral-600))]">
          Welcome back! Here's an overview of your store performance.
        </p>
      </motion.div>

      {activeTab === 'overview' ? (
        renderTabContent()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 h-[100%]">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-[rgb(var(--c-primary-500))]/10 text-[rgb(var(--c-primary-500))]'
                      : 'text-[rgb(var(--c-neutral-600))] hover:bg-[rgb(var(--c-neutral-200))]/50'
                      }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

const EditProductForm = ({ product, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [status, setStatus] = useState(product.status);
  const [image, setImage] = useState(product.image);
  const [preview, setPreview] = useState(product.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImage(reader.result); // In real apps, upload to server and save URL
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onUpdate({
      ...product,
      name,
      price,
      stock,
      status,
      image
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <img
          src={preview}
          alt="Preview"
          className="h-32 w-32 object-cover rounded mb-2"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input-field"
      />
      <input
        className="input-field"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        className="input-field"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        className="input-field"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
      />
      <select
        className="input-field"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
      <button onClick={handleSubmit} className="btn-secondary w-full mt-2">
        Update Product
      </button>
    </>
  );
};



const AddProductForm = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('Active');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
        setPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name || !price || !stock || images.length === 0) {
      alert('Please fill all fields and upload at least one image.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      stock,
      status,
      image: images[0],       // Primary image
      images: images          // All images
    };

    onAdd(newProduct);
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {previews.map((src, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
              onClick={() => handleRemoveImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="input-field"
      />

      <input
        className="input-field"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-field"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="input-field"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <select
        className="input-field"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>

      <button className="btn-primary w-full mt-2" onClick={handleSubmit}>
        Save Product
      </button>
    </>
  );
};
