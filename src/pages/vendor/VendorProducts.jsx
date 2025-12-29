import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Plus, Search, Filter, Grid, List, Download, Upload, Trash2, 
    Package, CheckCircle, Clock, FileEdit, AlertTriangle, ChevronDown
} from 'lucide-react';
import ProductCard from '../../components/products/ProductCard';
import ProductStatsCard from '../../components/products/ProductStatsCard';
import { generateEnhancedProducts, getProductStats } from '../../utils/productMockData';

const VendorProducts = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [showBulkActions, setShowBulkActions] = useState(false);

    // Simulating vendor ID (in real app, this would come from auth context)
    const vendorId = 1;

    // Get products for this vendor
    const allProducts = useMemo(() => {
        return generateEnhancedProducts().filter(p => p.vendorId === vendorId);
    }, [vendorId]);

    // Calculate stats for vendor's products
    const stats = useMemo(() => {
        const total = allProducts.length;
        const published = allProducts.filter(p => p.status === 'published').length;
        const pending = allProducts.filter(p => p.status === 'pending').length;
        const draft = allProducts.filter(p => p.status === 'draft').length;
        const outOfStock = allProducts.filter(p => p.stock === 0).length;
        return { total, published, pending, draft, outOfStock };
    }, [allProducts]);

    // Get unique categories
    const categories = useMemo(() => {
        return [...new Set(allProducts.map(p => p.category))];
    }, [allProducts]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(term) ||
                p.sku.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(p => p.status === statusFilter);
        }

        // Category filter
        if (categoryFilter !== 'all') {
            result = result.filter(p => p.category === categoryFilter);
        }

        // Stock filter
        if (stockFilter === 'in_stock') {
            result = result.filter(p => p.stock > (p.lowStockThreshold || 10));
        } else if (stockFilter === 'low_stock') {
            result = result.filter(p => p.stock > 0 && p.stock <= (p.lowStockThreshold || 10));
        } else if (stockFilter === 'out_of_stock') {
            result = result.filter(p => p.stock === 0);
        }

        // Sort
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'price_low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name_az':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return result;
    }, [allProducts, searchTerm, statusFilter, categoryFilter, stockFilter, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Selection handlers
    const handleSelectProduct = (productId) => {
        setSelectedProducts(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === paginatedProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(paginatedProducts.map(p => p.id));
        }
    };

    // Action handlers
    const handleView = (product) => {
        navigate(`/seller/products/preview/${product.id}`);
    };

    const handleEdit = (product) => {
        navigate(`/seller/products/edit/${product.id}`);
    };

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            console.log('Deleting product:', product.id);
            // In real app, call API to delete
        }
    };

    const handleDuplicate = (product) => {
        console.log('Duplicating product:', product.id);
        // In real app, navigate to new product form with pre-filled data
        navigate(`/seller/products/new?duplicate=${product.id}`);
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
            console.log('Deleting products:', selectedProducts);
            setSelectedProducts([]);
        }
    };

    const handleBulkStatusChange = (status) => {
        console.log('Changing status to:', status, 'for products:', selectedProducts);
        setSelectedProducts([]);
        setShowBulkActions(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Products</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product catalog</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => navigate('/seller/products/import')}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <Upload className="w-5 h-5" />
                        <span>Import</span>
                    </button>
                    <button
                        onClick={() => navigate('/seller/products/new')}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <Plus className="w-5 h-5 dark:text-white text-black" />
                        <span className='dark:text-white text-black'>Add New Product</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <ProductStatsCard
                    title="Total Products"
                    value={stats.total}
                    icon={Package}
                    color="blue"
                />
                <ProductStatsCard
                    title="Published"
                    value={stats.published}
                    icon={CheckCircle}
                    color="green"
                />
                <ProductStatsCard
                    title="Pending Approval"
                    value={stats.pending}
                    icon={Clock}
                    color="orange"
                />
                <ProductStatsCard
                    title="Draft"
                    value={stats.draft}
                    icon={FileEdit}
                    color="gray"
                />
                <ProductStatsCard
                    title="Out of Stock"
                    value={stats.outOfStock}
                    icon={AlertTriangle}
                    color="red"
                />
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products by name, SKU, or category..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="pending">Pending</option>
                            <option value="draft">Draft</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={stockFilter}
                            onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">All Stock</option>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="name_az">Name: A-Z</option>
                        </select>

                        {/* View Toggle */}
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedProducts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedProducts.length} product(s) selected
                        </span>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <button
                                    onClick={() => setShowBulkActions(!showBulkActions)}
                                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                    <span>Bulk Actions</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {showBulkActions && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowBulkActions(false)} />
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                                            <button
                                                onClick={() => handleBulkStatusChange('published')}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                Publish Selected
                                            </button>
                                            <button
                                                onClick={() => handleBulkStatusChange('draft')}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                Move to Draft
                                            </button>
                                            <button
                                                onClick={() => console.log('Export:', selectedProducts)}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                Export Selected
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || stockFilter !== 'all'
                            ? 'Try adjusting your filters or search terms'
                            : 'Get started by adding your first product'}
                    </p>
                    {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && stockFilter === 'all' && (
                        <button
                            onClick={() => navigate('/seller/products/new')}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Your First Product</span>
                        </button>
                    )}
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            viewMode="grid"
                            isSelected={selectedProducts.includes(product.id)}
                            onSelect={handleSelectProduct}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onDuplicate={handleDuplicate}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 bg-white dark:bg-gray-700"
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Category</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Stock</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Updated</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewMode="list"
                                    isSelected={selectedProducts.includes(product.id)}
                                    onSelect={handleSelectProduct}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onDuplicate={handleDuplicate}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value={12}>12 per page</option>
                            <option value={24}>24 per page</option>
                            <option value={48}>48 per page</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorProducts;
