import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface VisibilityBadgeProps {
  visibility: 'Published' | 'Unpublished';
}

const VisibilityBadge: React.FC<VisibilityBadgeProps> = ({ visibility }) => {
  const isPublished = visibility === 'Published';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${
        isPublished
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800'
          : 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
      }`}
    >
      {isPublished ? (
        <Eye className="w-3 h-3" />
      ) : (
        <EyeOff className="w-3 h-3" />
      )}
      {visibility}
    </span>
  );
};

export default VisibilityBadge;
