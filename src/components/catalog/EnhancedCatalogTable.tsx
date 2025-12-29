import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { mockProducts, categories, statusOptions, inventoryOptions, visibilityOptions } from './mockData';
import ProductCell from './ProductCell';
import StatusBadge from './StatusBadge';
import VisibilityBadge from './VisibilityBadge';
import ActionMenu from './ActionMenu';
import VariantRow from './VariantRow';

const EnhancedCatalogTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedInventory, setSelectedInventory] = useState('All Inventory');
  const [selectedVisibility, setSelectedVisibility] = useState('All Visibility');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [isLoading] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        searchTerm === '' ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.variants?.some(v => v.sku.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory =
        selectedCategory === 'All Categories' || product.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'All Status' || product.status === selectedStatus;

      const matchesInventory =
        selectedInventory === 'All Inventory' ||
        (selectedInventory === 'In Stock' && product.totalStock > 10) ||
        (selectedInventory === 'Low Stock' && product.totalStock > 0 && product.totalStock <= 10) ||
        (selectedInventory === 'Out of Stock' && product.totalStock === 0);

      const matchesVisibility =
        selectedVisibility === 'All Visibility' || product.visibility === selectedVisibility;

      return matchesSearch && matchesCategory && matchesStatus && matchesInventory && matchesVisibility;
    });
  }, [searchTerm, selectedCategory, selectedStatus, selectedInventory, selectedVisibility]);

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const toggleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const toggleExpandProduct = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const formatPrice = (min: number, max?: number) => {
    if (max && max !== min) {
      return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
    }
    return `$${min.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-600 dark:text-red-400';
    if (stock <= 10) return 'text-orange-600 dark:text-orange-400';
    return 'text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))]';
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white dark:bg-[rgb(var(--c-bg-secondary))] rounded-lg border border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))]" />
            <input
              type="text"
              placeholder="Search products, SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] bg-white dark:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full lg:w-48 pl-4 pr-10 py-2 border border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] bg-white dark:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))] pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none w-full lg:w-40 pl-4 pr-10 py-2 border border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] bg-white dark:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))] pointer-events-none" />
          </div>

          {/* Inventory Filter */}
          <div className="relative">
            <select
              value={selectedInventory}
              onChange={(e) => setSelectedInventory(e.target.value)}
              className="appearance-none w-full lg:w-40 pl-4 pr-10 py-2 border border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] bg-white dark:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent"
            >
              {inventoryOptions.map((inv) => (
                <option key={inv} value={inv}>
                  {inv}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))] pointer-events-none" />
          </div>

          {/* Visibility Filter */}
          <div className="relative">
            <select
              value={selectedVisibility}
              onChange={(e) => setSelectedVisibility(e.target.value)}
              className="appearance-none w-full lg:w-40 pl-4 pr-10 py-2 border border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] bg-white dark:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent"
            >
              {visibilityOptions.map((vis) => (
                <option key={vis} value={vis}>
                  {vis}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))] pointer-events-none" />
          </div>
        </div>

        {/* Bulk Actions & Results */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))]">
            Showing {filteredProducts.length} of {mockProducts.length} products
            {selectedProducts.size > 0 && (
              <span className="ml-2 text-[rgb(var(--c-primary-500))] font-medium">
                ({selectedProducts.size} selected)
              </span>
            )}
          </div>

          {selectedProducts.size > 0 && (
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-secondary))] bg-white dark:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-[rgb(var(--c-bg-primary))] transition-colors"
                onChange={(e) => {
                  if (e.target.value) {
                    console.log('Bulk action:', e.target.value, 'on', selectedProducts.size, 'products');
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Bulk Actions</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
                <option value="update-inventory">Update Inventory</option>
                <option value="update-price">Update Price</option>
                <option value="archive">Archive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))] pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[rgb(var(--c-bg-secondary))] rounded-lg border border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[rgb(var(--c-bg-tertiary))] border-b-2 border-[rgb(var(--c-neutral-300))] dark:border-[rgb(var(--c-border-primary))] sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2.5 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[rgb(var(--c-primary-500))] focus:ring-[rgb(var(--c-primary-500))]"
                  />
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Visibility
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Loading Skeleton
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse border-b border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))]">
                    <td className="px-4 py-2.5">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-1/2"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-20"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-24"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-16"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-6 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-16"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-6 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-20"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-20"></div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="h-4 bg-gray-200 dark:bg-[rgb(var(--c-bg-tertiary))] rounded w-16"></div>
                    </td>
                  </tr>
                ))
              ) : filteredProducts.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-[rgb(var(--c-bg-tertiary))] flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400 dark:text-[rgb(var(--c-text-tertiary))]" />
                      </div>
                      <h3 className="text-lg font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] mb-1">
                        No products found
                      </h3>
                      <p className="text-sm text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))]">
                        Try adjusting your filters or search terms
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                // Product Rows with Variants
                filteredProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    {/* Parent Product Row */}
                    <tr
                      className="border-b border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] hover:bg-gray-50/50 dark:hover:bg-[rgb(var(--c-bg-tertiary))]/50 transition-colors group"
                    >
                      <td className="px-4 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.id)}
                          onChange={() => toggleSelectProduct(product.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[rgb(var(--c-primary-500))] focus:ring-[rgb(var(--c-primary-500))]"
                        />
                      </td>
                      <td className="px-4 py-2.5" style={{ minWidth: '300px' }}>
                        <div className="flex items-center gap-2">
                          {product.variants && product.variants.length > 0 && (
                            <button
                              onClick={() => toggleExpandProduct(product.id)}
                              className="p-0.5 hover:bg-gray-200 dark:hover:bg-[rgb(var(--c-bg-tertiary))] rounded transition-colors"
                            >
                              {expandedProducts.has(product.id) ? (
                                <ChevronDown className="w-4 h-4 text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))]" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))]" />
                              )}
                            </button>
                          )}
                          <ProductCell
                            thumbnail={product.thumbnail}
                            title={product.title}
                            skuCount={product.skuCount}
                            productId={product.id}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="text-sm text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="text-sm font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))]">
                          {formatPrice(product.priceMin, product.priceMax)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            {product.totalStock > 0 && product.totalStock <= 10 && (
                              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                            )}
                            <span className={`text-sm font-medium ${getStockColor(product.totalStock)} dark:text-[rgb(var(--c-text-primary))]`}>
                              {product.totalStock} units
                            </span>
                          </div>
                          {product.reservedStock > 0 && (
                            <span className="text-xs text-[rgb(var(--c-neutral-500))] dark:text-[rgb(var(--c-text-tertiary))]">
                              ({product.reservedStock} reserved)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <VisibilityBadge visibility={product.visibility} />
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="text-sm text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))]">
                          {formatDate(product.lastUpdated)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <ActionMenu productId={product.id} />
                        </div>
                        <div className="lg:hidden opacity-100">
                          <ActionMenu productId={product.id} />
                        </div>
                      </td>
                    </tr>

                    {/* Variant Rows (expanded) */}
                    {expandedProducts.has(product.id) && product.variants && product.variants.map((variant, index) => (
                      <VariantRow
                        key={variant.sku}
                        variant={variant}
                        isLast={index === product.variants!.length - 1}
                      />
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="px-4 py-3 border-t border-[rgb(var(--c-neutral-200))] flex items-center justify-between bg-gray-50 dark:bg-[rgb(var(--c-bg-secondary))]">
            <div className="text-sm text-[rgb(var(--c-neutral-600))]">
              Page 1 of 1
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-3 py-1 text-sm border border-[rgb(var(--c-neutral-300))] rounded bg-white text-[rgb(var(--c-neutral-400))] cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled
                className="px-3 py-1 text-sm border border-[rgb(var(--c-neutral-300))] rounded bg-white text-[rgb(var(--c-neutral-400))] cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card View (hidden on desktop) */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedProducts.has(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[rgb(var(--c-primary-500))] focus:ring-[rgb(var(--c-primary-500))]"
                />
                <div className="flex-1 min-w-0">
                  <ProductCell
                    thumbnail={product.thumbnail}
                    title={product.title}
                    skuCount={product.skuCount}
                    productId={product.id}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[rgb(var(--c-neutral-500))]">Category:</span>
                  <div className="text-[rgb(var(--c-neutral-900))] font-medium">{product.category}</div>
                </div>
                <div>
                  <span className="text-[rgb(var(--c-neutral-500))]">Price:</span>
                  <div className="text-[rgb(var(--c-neutral-900))] font-medium">
                    {formatPrice(product.priceMin, product.priceMax)}
                  </div>
                </div>
                <div>
                  <span className="text-[rgb(var(--c-neutral-500))]">Inventory:</span>
                  <div className={`font-medium ${getStockColor(product.totalStock)}`}>
                    {product.totalStock} units
                  </div>
                </div>
                <div>
                  <span className="text-[rgb(var(--c-neutral-500))]">Updated:</span>
                  <div className="text-[rgb(var(--c-neutral-900))]">{formatDate(product.lastUpdated)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[rgb(var(--c-neutral-200))]">
                <div className="flex items-center gap-2">
                  <StatusBadge status={product.status} />
                  <VisibilityBadge visibility={product.visibility} />
                </div>
                <ActionMenu productId={product.id} />
              </div>
            </div>

            {/* View Variants Button on Mobile */}
            {product.variants && product.variants.length > 0 && (
              <button
                onClick={() => toggleExpandProduct(product.id)}
                className="w-full px-4 py-2.5 border-t border-[rgb(var(--c-neutral-200))] bg-gray-50 hover:bg-gray-100 text-sm font-medium text-[rgb(var(--c-neutral-700))] transition-colors flex items-center justify-center gap-2"
              >
                {expandedProducts.has(product.id) ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Hide Variants ({product.variants.length})
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    View Variants ({product.variants.length})
                  </>
                )}
              </button>
            )}

            {/* Mobile Variant List */}
            {expandedProducts.has(product.id) && product.variants && (
              <div className="border-t border-[rgb(var(--c-neutral-200))] divide-y divide-[rgb(var(--c-neutral-200))]">
                {product.variants.map((variant) => (
                  <div key={variant.sku} className={`p-4 bg-gray-50/50 ${variant.status === 'Inactive' ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {variant.size && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">
                            {variant.size}
                          </span>
                        )}
                        {variant.color && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">
                            {variant.color}
                          </span>
                        )}
                      </div>
                      <StatusBadge status={variant.status} />
                    </div>
                    <div className="text-xs text-[rgb(var(--c-neutral-500))] mb-2 font-mono">
                      SKU: {variant.sku}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-[rgb(var(--c-neutral-500))]">Price:</span>
                        <div className="font-medium">${variant.price.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-[rgb(var(--c-neutral-500))]">Stock:</span>
                        <div className={`font-medium ${getStockColor(variant.stock)}`}>
                          {variant.stock} units
                        </div>
                      </div>
                    </div>
                    {variant.reservedStock > 0 && (
                      <div className="text-xs text-[rgb(var(--c-neutral-500))] mt-1">
                        ({variant.reservedStock} reserved)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedCatalogTable;
