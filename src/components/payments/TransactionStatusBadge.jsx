import { 
  Clock, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Flag, 
  Ban,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

const statusConfig = {
  // Transaction/Payout statuses
  pending: { 
    label: 'Pending', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800', 
    icon: Clock 
  },
  processing: { 
    label: 'Processing', 
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800', 
    icon: Loader2,
    animate: true
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', 
    icon: CheckCircle 
  },
  failed: { 
    label: 'Failed', 
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800', 
    icon: XCircle 
  },
  refunded: { 
    label: 'Refunded', 
    color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800', 
    icon: RotateCcw 
  },
  disputed: { 
    label: 'Disputed', 
    color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800', 
    icon: Flag 
  },
  cancelled: { 
    label: 'Cancelled', 
    color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700', 
    icon: Ban 
  },
  approved: { 
    label: 'Approved', 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', 
    icon: CheckCircle 
  },
  rejected: { 
    label: 'Rejected', 
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800', 
    icon: XCircle 
  },
  // Verification statuses
  verified: { 
    label: 'Verified', 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', 
    icon: CheckCircle 
  },
  unverified: { 
    label: 'Unverified', 
    color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700', 
    icon: AlertTriangle 
  },
  // Dispute statuses
  open: { 
    label: 'Open', 
    color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800', 
    icon: AlertTriangle 
  },
  under_review: { 
    label: 'Under Review', 
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800', 
    icon: Clock 
  },
  resolved: { 
    label: 'Resolved', 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', 
    icon: CheckCircle 
  },
  lost: { 
    label: 'Lost', 
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800', 
    icon: XCircle 
  },
  // Payment availability
  available: { 
    label: 'Available', 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', 
    icon: CheckCircle 
  },
  paid: { 
    label: 'Paid', 
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', 
    icon: CheckCircle 
  },
};

const typeConfig = {
  sale: { 
    label: 'Sale', 
    color: 'text-green-600 dark:text-green-400', 
    icon: ArrowDownLeft,
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  refund: { 
    label: 'Refund', 
    color: 'text-red-600 dark:text-red-400', 
    icon: RotateCcw,
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  payout: { 
    label: 'Payout', 
    color: 'text-blue-600 dark:text-blue-400', 
    icon: ArrowUpRight,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  commission: { 
    label: 'Commission', 
    color: 'text-purple-600 dark:text-purple-400', 
    icon: ArrowUpRight,
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  adjustment: { 
    label: 'Adjustment', 
    color: 'text-gray-600 dark:text-slate-400', 
    icon: ArrowDownLeft,
    bgColor: 'bg-gray-50 dark:bg-slate-800'
  },
};

export const TransactionStatusBadge = ({ status, showIcon = true, size = 'sm' }) => {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
  const Icon = config.icon;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-full font-medium border ${config.color}`}>
      {showIcon && Icon && (
        <Icon className={`${iconSizes[size]} ${config.animate ? 'animate-spin' : ''}`} />
      )}
      {config.label}
    </span>
  );
};

export const TransactionTypeBadge = ({ type, showIcon = true, size = 'sm' }) => {
  const config = typeConfig[type?.toLowerCase()] || typeConfig.sale;
  const Icon = config.icon;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-full font-medium ${config.color} ${config.bgColor}`}>
      {showIcon && Icon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
};

export default TransactionStatusBadge;
