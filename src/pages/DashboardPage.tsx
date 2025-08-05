import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Package,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Upload,
  MessageCircle,
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import ProductModal from '../components/ProductModal';




const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null); // product object
  const [showEditModal, setShowEditModal] = useState(null); // product object

  const stats = [
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+12.5%',
      icon: Package,
      color: 'text-[rgb(var(--c-primary-500))]',
      bgColor: 'bg-[rgb(var(--c-primary-500))]/10'
    },
    {
      title: 'Revenue',
      value: '₹45,670',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-[rgb(var(--c-secondary-500))]',
      bgColor: 'bg-[rgb(var(--c-secondary-500))]/10'
    },
    {
      title: 'Pending Tasks',
      value: '8',
      change: '-2',
      icon: Bell,
      color: 'text-[rgb(var(--c-warning-500))]',
      bgColor: 'bg-[rgb(var(--c-warning-500))]/10'
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-[rgb(var(--c-primary-500))]',
      bgColor: 'bg-[rgb(var(--c-primary-500))]/10'
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', product: 'Wireless Headphones', amount: '₹2,999', status: 'Delivered' },
    { id: '#12346', customer: 'Jane Smith', product: 'Smartphone Case', amount: '₹699', status: 'Processing' },
    { id: '#12347', customer: 'Bob Johnson', product: 'Laptop Stand', amount: '₹1,299', status: 'Shipped' },
    { id: '#12348', customer: 'Alice Brown', product: 'Bluetooth Speaker', amount: '₹1,899', status: 'Pending' },
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
    { id: 'overview', label: 'Overview', icon: BarChart3 },
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-[rgb(var(--c-secondary-500))]' : 'text-[rgb(var(--c-error-500))]'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-[rgb(var(--c-neutral-600))] text-sm">
                    {stat.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card"
            >
              <div className="p-6 border-b border-[rgb(var(--c-neutral-200))]">
                <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))]">
                  Recent Orders
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[rgb(var(--c-neutral-100))]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--c-neutral-500))] uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[rgb(var(--c-neutral-200))]">
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-[rgb(var(--c-neutral-100))]">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--c-neutral-900))]">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--c-neutral-600))]">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--c-neutral-600))]">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(var(--c-neutral-900))]">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'Delivered' ? 'bg-[rgb(var(--c-secondary-500))]/10 text-[rgb(var(--c-secondary-500))]' :
                            order.status === 'Processing' ? 'bg-[rgb(var(--c-warning-500))]/10 text-[rgb(var(--c-warning-500))]' :
                              order.status === 'Shipped' ? 'bg-[rgb(var(--c-primary-500))]/10 text-[rgb(var(--c-primary-500))]' :
                                'bg-[rgb(var(--c-error-500))]/10 text-[rgb(var(--c-error-500))]'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
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
    <div className="pt-24 section-padding min-h-screen bg-[rgb(var(--c-neutral-100))]">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-2">
            Seller Dashboard
          </h1>
          <p className="text-[rgb(var(--c-neutral-600))]">
            Welcome back! Here's what's happening with your store.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 ">
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
      </div>

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
