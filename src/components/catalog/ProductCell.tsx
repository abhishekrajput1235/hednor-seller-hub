import React from 'react';
import { Package } from 'lucide-react';

interface ProductCellProps {
  thumbnail: string;
  title: string;
  skuCount: number;
  productId: string;
}

const ProductCell: React.FC<ProductCellProps> = ({ thumbnail, title, skuCount, productId }) => {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-[rgb(var(--c-bg-tertiary))] rounded overflow-hidden border border-gray-200 dark:border-[rgb(var(--c-border-secondary))]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-5 h-5 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
            }
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div 
          className="text-sm font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] truncate hover:text-clip hover:whitespace-normal hover:absolute hover:bg-white dark:hover:bg-[rgb(var(--c-bg-secondary))] hover:z-10 hover:p-2 hover:shadow-lg hover:rounded hover:border hover:border-gray-200 dark:hover:border-[rgb(var(--c-border-primary))] hover:max-w-md"
          title={title}
        >
          {title}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="inline-flex items-center gap-1 text-xs text-[rgb(var(--c-neutral-500))] dark:text-[rgb(var(--c-text-tertiary))]">
            <Package className="w-3 h-3" />
            {skuCount} SKU{skuCount !== 1 ? 's' : ''}
          </span>
          <span className="text-xs text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))]">
            {productId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCell;
