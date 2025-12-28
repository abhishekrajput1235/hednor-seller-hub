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
        className="p-1.5 rounded hover:bg-gray-100 text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))] transition-colors"
        title="Edit"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => console.log('View', productId)}
        className="p-1.5 rounded hover:bg-gray-100 text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))] transition-colors"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </button>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded hover:bg-gray-100 text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-neutral-900))] transition-colors"
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
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button
                onClick={() => {
                  console.log('Duplicate', productId);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-[rgb(var(--c-neutral-700))] hover:bg-gray-50 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button
                onClick={() => {
                  console.log('Delete', productId);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
