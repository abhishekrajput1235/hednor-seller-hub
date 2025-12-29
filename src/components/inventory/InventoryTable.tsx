import React, { useState } from 'react';
import { Search, Check, X, AlertTriangle, PackageOpen } from 'lucide-react';
import { mockInventoryData, getStockStatus } from './mockInventoryData';
import InventoryStatusBadge from './InventoryStatusBadge';

interface EditingCell {
  productId: string;
  sku: string;
  field: 'availableStock' | 'reservedStock';
  value: string;
}

const InventoryTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [inventoryData, setInventoryData] = useState(mockInventoryData);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [editedRows, setEditedRows] = useState<Set<string>>(new Set());

  // Flatten data for table display
  const flattenedData = inventoryData.flatMap((product) =>
    product.variants.map((variant) => ({
      productId: product.id,
      productName: product.productName,
      thumbnail: product.thumbnail,
      ...variant,
    }))
  );

  // Filter data
  const filteredData = flattenedData.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle inline edit start
  const handleEditStart = (productId: string, sku: string, field: 'availableStock' | 'reservedStock', currentValue: number) => {
    setEditingCell({
      productId,
      sku,
      field,
      value: currentValue.toString(),
    });
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditingCell(null);
  };

  // Handle edit save
  const handleEditSave = () => {
    if (!editingCell) return;

    const newValue = parseInt(editingCell.value, 10);
    if (isNaN(newValue) || newValue < 0) {
      // Invalid value, cancel edit
      handleEditCancel();
      return;
    }

    // Update the data
    setInventoryData((prevData) =>
      prevData.map((product) => {
        if (product.id === editingCell.productId) {
          return {
            ...product,
            variants: product.variants.map((variant) => {
              if (variant.sku === editingCell.sku) {
                const updated = {
                  ...variant,
                  [editingCell.field]: newValue,
                };
                // Update status based on available stock
                if (editingCell.field === 'availableStock') {
                  updated.status = getStockStatus(newValue);
                }
                return updated;
              }
              return variant;
            }),
          };
        }
        return product;
      })
    );

    // Mark row as edited
    setEditedRows((prev) => new Set(prev).add(editingCell.sku));
    setEditingCell(null);
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    if (editingCell) {
      setEditingCell({ ...editingCell, value });
    }
  };

  // Handle key press in edit mode
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // Toggle row selection
  const toggleRowSelection = (sku: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(sku)) {
      newSelected.delete(sku);
    } else {
      newSelected.add(sku);
    }
    setSelectedRows(newSelected);
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((item) => item.sku)));
    }
  };

  // Check if currently editing a cell
  const isEditing = (productId: string, sku: string, field: 'availableStock' | 'reservedStock') => {
    return editingCell?.productId === productId && editingCell?.sku === sku && editingCell?.field === field;
  };

  // Get stock color
  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-600';
    if (stock <= 10) return 'text-orange-600';
    return 'text-[rgb(var(--c-neutral-900))]';
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white dark:bg-black rounded-lg border border-[rgb(var(--c-neutral-200))] p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative dark:border-[rgb(var(--c-neutral-600))] dark:text-white">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--c-neutral-400))]" />
            <input
              type="text"
              placeholder="Search by SKU, product name, or variant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--c-neutral-300))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent dark:border-[rgb(var(--c-neutral-600))] dark:text-white bg-black dark:bg-black"
            />
          </div>
        </div>
        <div className="mt-3 text-sm text-[rgb(var(--c-neutral-600))]">
          Showing {filteredData.length} items
          {selectedRows.size > 0 && (
            <span className="ml-2 text-[rgb(var(--c-primary-500))] font-medium">
              ({selectedRows.size} selected)
            </span>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-black rounded-lg border border-[rgb(var(--c-neutral-200))] overflow-hidden">
        <div className="overflow-x-auto dark:border-[rgb(var(--c-neutral-600))] dark:bg-black dark:text-white">
          <table className="w-full dark:border-[rgb(var(--c-neutral-600))] dark:text-white">
            <thead className="bg-gray-50 dark:bg-black border-b border-[rgb(var(--c-neutral-200))] sticky top-0 z-10 dark:border-[rgb(var(--c-neutral-600))] dark:text-white">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded bg-black dark:bg-black border-gray-300 text-[rgb(var(--c-primary-500))] focus:ring-[rgb(var(--c-primary-500))] dark:border-[rgb(var(--c-neutral-600))] dark:text-white"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  Variant
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  Available Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  Reserved Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--c-neutral-700))] uppercase tracking-wider dark:text-white bg-black dark:bg-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--c-neutral-200))]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-[rgb(var(--c-neutral-900))] mb-1">
                        No items found
                      </h3>
                      <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                        Try adjusting your search terms
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.sku}
                    className={`hover:bg-gray-50 dark:hover:bg-black dark:bg-black transition-colors group ${editedRows.has(item.sku) ? 'bg-yellow-50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item.sku)}
                        onChange={() => toggleRowSelection(item.sku)}
                        className="w-4 h-4 rounded border-gray-300 text-[rgb(var(--c-primary-500))] focus:ring-[rgb(var(--c-primary-500))]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-mono text-[rgb(var(--c-neutral-700))]">
                        {item.sku}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '250px' }}>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.productName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="text-sm text-[rgb(var(--c-neutral-900))]">
                          {item.productName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-[rgb(var(--c-neutral-700))]">
                        {item.variant}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {isEditing(item.productId, item.sku, 'availableStock') ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editingCell?.value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-20 px-2 py-1 text-sm border border-[rgb(var(--c-primary-500))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))]"
                            autoFocus
                          />
                          <button
                            onClick={handleEditSave}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(item.productId, item.sku, 'availableStock', item.availableStock)}
                          className={`text-sm font-medium ${getStockColor(item.availableStock)} hover:underline text-left`}
                        >
                          {item.availableStock}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {isEditing(item.productId, item.sku, 'reservedStock') ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editingCell?.value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-20 px-2 py-1 text-sm border border-[rgb(var(--c-primary-500))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))]"
                            autoFocus
                          />
                          <button
                            onClick={handleEditSave}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(item.productId, item.sku, 'reservedStock', item.reservedStock)}
                          className="text-sm font-medium text-[rgb(var(--c-neutral-700))] hover:underline text-left"
                        >
                          {item.reservedStock}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <InventoryStatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                          title="Mark as Damaged"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Adjust Stock"
                        >
                          <PackageOpen className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-[rgb(var(--c-neutral-900))] mb-1">
                No items found
              </h3>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                Try adjusting your search terms
              </p>
            </div>
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.sku}
              className={`bg-white rounded-lg border border-[rgb(var(--c-neutral-200))] p-4 space-y-3 ${editedRows.has(item.sku) ? 'bg-yellow-50 border-yellow-300' : ''}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedRows.has(item.sku)}
                  onChange={() => toggleRowSelection(item.sku)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[rgb(var(--c-primary-500))] focus:ring-[rgb(var(--c-primary-500))]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[rgb(var(--c-neutral-900))] truncate">
                        {item.productName}
                      </div>
                      <div className="text-xs font-mono text-[rgb(var(--c-neutral-500))] mt-0.5">
                        SKU: {item.sku}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[rgb(var(--c-neutral-500))] block mb-1">Variant:</span>
                      <div className="text-[rgb(var(--c-neutral-900))] font-medium">{item.variant}</div>
                    </div>
                    <div>
                      <span className="text-[rgb(var(--c-neutral-500))] block mb-1">Status:</span>
                      <InventoryStatusBadge status={item.status} />
                    </div>
                    <div>
                      <span className="text-[rgb(var(--c-neutral-500))] block mb-1">Available Stock:</span>
                      {isEditing(item.productId, item.sku, 'availableStock') ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editingCell?.value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-20 px-2 py-1 text-sm border border-[rgb(var(--c-primary-500))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))]"
                            autoFocus
                          />
                          <button
                            onClick={handleEditSave}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(item.productId, item.sku, 'availableStock', item.availableStock)}
                          className={`font-medium ${getStockColor(item.availableStock)} hover:underline text-left`}
                        >
                          {item.availableStock}
                        </button>
                      )}
                    </div>
                    <div>
                      <span className="text-[rgb(var(--c-neutral-500))] block mb-1">Reserved Stock:</span>
                      {isEditing(item.productId, item.sku, 'reservedStock') ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={editingCell?.value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-20 px-2 py-1 text-sm border border-[rgb(var(--c-primary-500))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))]"
                            autoFocus
                          />
                          <button
                            onClick={handleEditSave}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(item.productId, item.sku, 'reservedStock', item.reservedStock)}
                          className="font-medium text-[rgb(var(--c-neutral-700))] hover:underline text-left"
                        >
                          {item.reservedStock}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[rgb(var(--c-neutral-200))] mt-3">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 rounded transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Mark as Damaged
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                    >
                      <PackageOpen className="w-4 h-4" />
                      Adjust Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryTable;
