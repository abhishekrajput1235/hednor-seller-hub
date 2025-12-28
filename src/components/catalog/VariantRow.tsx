import React from 'react';
import { Edit, Package, AlertTriangle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { ProductVariant } from './mockData';

interface VariantRowProps {
  variant: ProductVariant;
  isLast: boolean;
}

const VariantRow: React.FC<VariantRowProps> = ({ variant, isLast }) => {
  const isLowStock = variant.stock > 0 && variant.stock <= 10;
  const isOutOfStock = variant.stock === 0;

  return (
    <tr className={`bg-gray-50/50 ${variant.status === 'Inactive' ? 'opacity-60' : ''}`}>
      {/* Empty checkbox cell for alignment */}
      <td className="px-4 py-2">
        <div className="w-4"></div>
      </td>
      
      {/* Variant Details with Indentation */}
      <td className="px-4 py-2" style={{ minWidth: '300px' }}>
        <div className="flex items-center gap-2 pl-8">
          <div className={`w-1 h-8 rounded-full ${isLast ? 'bg-transparent' : 'bg-gray-300'} absolute left-8`} 
               style={{ marginLeft: '-1rem' }}></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {variant.size && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">
                  {variant.size}
                </span>
              )}
              {variant.color && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">
                  {variant.color}
                </span>
              )}
            </div>
            <div className="text-xs text-[rgb(var(--c-neutral-500))] mt-0.5 font-mono">
              SKU: {variant.sku}
            </div>
          </div>
        </div>
      </td>
      
      {/* Empty Category cell */}
      <td className="px-4 py-2"></td>
      
      {/* Variant Price */}
      <td className="px-4 py-2 whitespace-nowrap">
        <span className="text-sm font-medium text-[rgb(var(--c-neutral-900))]">
          ${variant.price.toFixed(2)}
        </span>
      </td>
      
      {/* Variant Stock */}
      <td className="px-4 py-2 whitespace-nowrap">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            {isLowStock && !isOutOfStock && (
              <AlertTriangle className="w-3 h-3 text-orange-500" />
            )}
            <span className={`text-sm font-medium ${
              isOutOfStock ? 'text-red-600' : 
              isLowStock ? 'text-orange-600' : 
              'text-[rgb(var(--c-neutral-900))]'
            }`}>
              {variant.stock} units
            </span>
          </div>
          {variant.reservedStock > 0 && (
            <span className="text-xs text-[rgb(var(--c-neutral-500))]">
              ({variant.reservedStock} reserved)
            </span>
          )}
        </div>
      </td>
      
      {/* Variant Status */}
      <td className="px-4 py-2 whitespace-nowrap">
        <StatusBadge status={variant.status} />
      </td>
      
      {/* Empty Visibility cell */}
      <td className="px-4 py-2"></td>
      
      {/* Empty Last Updated cell */}
      <td className="px-4 py-2"></td>
      
      {/* Variant Actions */}
      <td className="px-4 py-2 whitespace-nowrap">
        <div className="flex justify-end items-center gap-1">
          <button
            onClick={() => console.log('Edit variant', variant.sku)}
            className="p-1.5 rounded hover:bg-gray-200 text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))] transition-colors"
            title="Edit variant"
            disabled={variant.status === 'Inactive'}
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => console.log('Adjust stock', variant.sku)}
            className="p-1.5 rounded hover:bg-gray-200 text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))] transition-colors"
            title="Adjust stock"
            disabled={variant.status === 'Inactive'}
          >
            <Package className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default VariantRow;
