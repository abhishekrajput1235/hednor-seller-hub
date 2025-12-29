import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search } from 'lucide-react';

const DataTable = ({
    columns,
    data,
    onEdit,
    onDelete,
    onView,
    actions = true,
    selectable = false,
    onSelectionChange,
    searchable = true,
    searchPlaceholder = "Search...",
    emptyMessage = "No data available"
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    // Filter data based on search
    const filteredData = data.filter(item => {
        if (!searchTerm) return true;
        return Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(paginatedData.map(item => item.id));
        } else {
            setSelectedRows([]);
        }
        onSelectionChange?.(selectedRows);
    };

    const handleSelectRow = (id) => {
        const newSelection = selectedRows.includes(id)
            ? selectedRows.filter(rowId => rowId !== id)
            : [...selectedRows, id];
        setSelectedRows(newSelection);
        onSelectionChange?.(newSelection);
    };

    if (data.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800 p-12 text-center transition-colors duration-300">
                <p className="text-gray-500 dark:text-slate-400">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
            {/* Search Bar */}
            {searchable && (
                <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
            )}

            {/* Table - Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800">
                        <tr>
                            {selectable && (
                                <th className="px-4 py-3 text-left w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-800"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.label}</span>
                                        {column.sortable && (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
                                            >
                                                {sortConfig.key === column.key ? (
                                                    sortConfig.direction === 'asc' ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 opacity-30" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                        {paginatedData.map((row, index) => (
                            <tr key={row.id || index} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                {selectable && (
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => handleSelectRow(row.id)}
                                            className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 dark:bg-slate-800"
                                        />
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td key={column.key} className="px-4 py-3 text-sm text-gray-900 dark:text-slate-300">
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-4 py-3 text-right text-sm space-x-2">
                                        {onView && (
                                            <button
                                                onClick={() => onView(row)}
                                                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                                            >
                                                View
                                            </button>
                                        )}
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(row)}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-slate-800">
                {paginatedData.map((row) => (
                    <div key={row.id} className="p-4 space-y-2">
                        {selectable && (
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => handleSelectRow(row.id)}
                                className="rounded border-gray-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 mb-2 dark:bg-slate-800"
                            />
                        )}
                        {columns.map((column) => (
                            <div key={column.key} className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600 dark:text-slate-400">{column.label}:</span>
                                <span className="text-sm text-gray-900 dark:text-slate-200">
                                    {column.render ? column.render(row) : row[column.key]}
                                </span>
                            </div>
                        ))}
                        {actions && (
                            <div className="flex justify-end space-x-2 pt-2">
                                {onView && (
                                    <button
                                        onClick={() => onView(row)}
                                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 font-medium text-sm"
                                    >
                                        View
                                    </button>
                                )}
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(row)}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium text-sm"
                                    >
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(row)}
                                        className="text-red-600 hover:text-red-800 dark:text-red-400 font-medium text-sm"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-800"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-600 dark:text-slate-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-800"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
