import { TrendingUp, TrendingDown, Info } from 'lucide-react';

const FinancialCard = ({ 
  title, 
  amount, 
  currency = '$', 
  change, 
  changeLabel = 'vs last month',
  icon: Icon, 
  trend = 'up',
  subtitle,
  action,
  actionLabel,
  info,
  variant = 'default',
  sparklineData,
  size = 'md'
}) => {
  const isPositive = trend === 'up';
  
  const formatAmount = (value) => {
    if (typeof value !== 'number') return value;
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const variantStyles = {
    default: 'bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800',
    success: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-900/10 dark:border-green-800',
    warning: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-900/10 dark:border-orange-800',
    danger: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-900/20 dark:to-red-900/10 dark:border-red-800',
    info: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-900/10 dark:border-blue-800',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-900/10 dark:border-purple-800',
  };

  const iconStyles = {
    default: 'bg-gradient-to-br from-primary-400 to-primary-600',
    success: 'bg-gradient-to-br from-green-400 to-green-600',
    warning: 'bg-gradient-to-br from-orange-400 to-orange-600',
    danger: 'bg-gradient-to-br from-red-400 to-red-600',
    info: 'bg-gradient-to-br from-blue-400 to-blue-600',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  };

  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const amountSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`rounded-xl shadow-sm border ${variantStyles[variant]} ${sizeStyles[size]} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{title}</p>
            {info && (
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {info}
                </div>
              </div>
            )}
          </div>
          
          <p className={`${amountSizes[size]} font-bold text-gray-900 dark:text-white mt-1 font-mono`}>
            {currency}{formatAmount(amount)}
          </p>

          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}

          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">{changeLabel}</span>
            </div>
          )}

          {action && (
            <button 
              onClick={action}
              className="mt-3 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              {actionLabel}
            </button>
          )}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconStyles[variant]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-4 h-12 flex items-end gap-1">
          {sparklineData.map((value, index) => {
            const max = Math.max(...sparklineData);
            const height = max > 0 ? (value / max) * 100 : 0;
            return (
              <div
                key={index}
                className="flex-1 bg-primary-200 rounded-t"
                style={{ height: `${Math.max(height, 5)}%` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FinancialCard;
