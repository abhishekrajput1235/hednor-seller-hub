const statusStyles = {
    // Order statuses
    pending: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30',
    processing: 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
    shipped: 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',
    delivered: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-500/30',
    cancelled: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-500/30',

    // User statuses
    active: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-500/30',
    inactive: 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-300 border-gray-200 dark:border-slate-600',
    suspended: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-500/30',

    // Vendor statuses
    approved: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-500/30',
    rejected: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-500/30',
    under_review: 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
    resubmission_required: 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-500/30',

    // Product statuses
    published: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-500/30',
    draft: 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-300 border-gray-200 dark:border-slate-600',
    'out of stock': 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
    out_of_stock: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-500/30',
    low_stock: 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',

    // KYC statuses
    verified: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-500/30',
    submitted: 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
    flagged: 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',

    // Payment statuses
    paid: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-500/30',
    refunded: 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
    failed: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-500/30',
};

const statusLabels = {
    under_review: 'Under Review',
    resubmission_required: 'Resubmission Required',
    'out of stock': 'Out of Stock',
    out_of_stock: 'Out of Stock',
    low_stock: 'Low Stock',
};

const StatusBadge = ({ status }) => {
    const normalizedStatus = status?.toLowerCase() || '';
    const styles = statusStyles[normalizedStatus] || 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-300 border-gray-200 dark:border-slate-600';
    const label = statusLabels[normalizedStatus] || status;

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles} capitalize`}>
            {label}
        </span>
    );
};

export default StatusBadge;
