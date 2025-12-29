import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {

  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AlertTriangle,
  PackagePlus,
  FileText,
  RefreshCw,
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
  const navigate = useNavigate();


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


  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Performance Overview
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Welcome back! Here's an overview of your store performance.
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-6">
          {/* Top Summary Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Performance Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-gray-300 dark:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center text-xs font-medium px-2 py-1 rounded ${stat.trend === 'up'
                      ? 'bg-[rgb(var(--c-secondary-500))]/10 text-[rgb(var(--c-secondary-500))]'
                      : 'bg-[rgb(var(--c-error-500))]/10 text-[rgb(var(--c-error-500))]'
                      }`}>
                      {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
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
                onClick={() => navigate('/seller/products')}
                className="bg-white dark:bg-[rgb(var(--c-bg-secondary))] border-2 border-[rgb(var(--c-primary-500))] hover:bg-[rgb(var(--c-primary-500))]/5 dark:hover:bg-[rgb(var(--c-primary-500))]/10 text-[rgb(var(--c-primary-500))] rounded-lg p-4 transition-all flex items-center justify-center space-x-3 font-medium"
              >
                <PackagePlus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
              <button
                onClick={() => navigate('/seller/orders')}
                className="bg-white dark:bg-[rgb(var(--c-bg-secondary))] border-2 border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] hover:border-[rgb(var(--c-neutral-400))] dark:hover:border-[rgb(var(--c-border-primary))] hover:bg-[rgb(var(--c-neutral-50))] dark:hover:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] rounded-lg p-4 transition-all flex items-center justify-center space-x-3 font-medium"
              >
                <FileText className="h-5 w-5" />
                <span>View Orders</span>
              </button>
              <button
                onClick={() => navigate('/seller/inventory')}
                className="bg-white dark:bg-[rgb(var(--c-bg-secondary))] border-2 border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] hover:border-[rgb(var(--c-neutral-400))] dark:hover:border-[rgb(var(--c-border-primary))] hover:bg-[rgb(var(--c-neutral-50))] dark:hover:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] rounded-lg p-4 transition-all flex items-center justify-center space-x-3 font-medium"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Update Inventory</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

};


export default DashboardPage;
