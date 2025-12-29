import React, { useState } from 'react';
import { Edit, Eye, MoreVertical, Copy, Trash2 } from 'lucide-react';

interface ActionMenuProps {
  productId: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={() => console.log('Edit', productId)}
        className="p-1.5 rounded hover:bg-[rgb(var(--c-neutral-100))] dark:hover:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))] hover:text-[rgb(var(--c-neutral-900))] dark:hover:text-[rgb(var(--c-text-primary))] transition-colors"
        title="Edit"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => console.log('View', productId)}
        className="p-1.5 rounded hover:bg-[rgb(var(--c-neutral-100))] dark:hover:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))] hover:text-[rgb(var(--c-neutral-900))] dark:hover:text-[rgb(var(--c-text-primary))] transition-colors"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </button>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded hover:bg-[rgb(var(--c-neutral-100))] dark:hover:bg-[rgb(var(--c-bg-tertiary))] text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))] hover:text-[rgb(var(--c-neutral-900))] dark:hover:text-[rgb(var(--c-text-primary))] transition-colors"
          title="More actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-[rgb(var(--c-bg-secondary))] rounded-lg shadow-lg border border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] py-1 z-20">
              <button
                onClick={() => {
                  console.log('Duplicate', productId);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-[rgb(var(--c-neutral-700))] dark:text-[rgb(var(--c-text-secondary))] hover:bg-[rgb(var(--c-neutral-100))] dark:hover:bg-[rgb(var(--c-bg-tertiary))] flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button
                onClick={() => {
                  console.log('Delete', productId);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionMenu;
