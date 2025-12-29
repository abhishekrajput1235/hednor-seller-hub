import { Eye, Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import StatusBadge from '../common/StatusBadge';

const ProductCard = ({ product, onView, onEdit, onDelete, onDuplicate, isSelected, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action) => {
    setShowMenu(false);
    action();
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 dark:border-gray-700'} hover:shadow-md transition-shadow`}>
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Selection Checkbox */}
        {onSelect && (
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(product.id, e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
            />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <StatusBadge status={product.status} size="sm" />
        </div>

        {/* Actions Menu */}
        <div className="absolute bottom-2 right-2">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[150px] z-10">
                <button
                  onClick={() => handleAction(() => onView(product))}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleAction(() => onEdit(product))}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {onDuplicate && (
                  <button
                    onClick={() => handleAction(() => onDuplicate(product))}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                )}
                <button
                  onClick={() => handleAction(() => onDelete(product))}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">SKU: {product.sku}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price?.toFixed(2)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ₹{product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Stock: {product.stock || 0}</span>
          <span className="text-gray-500 dark:text-gray-400">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
