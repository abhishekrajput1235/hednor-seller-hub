import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const AmountDisplay = ({ 
  amount, 
  currency = '$', 
  type = 'neutral', 
  size = 'md',
  showSign = false,
  copyable = false,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const formatAmount = (value) => {
    if (typeof value !== 'number') return value;
    const absValue = Math.abs(value);
    return absValue.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const isNegative = amount < 0;
  const displayType = type === 'auto' 
    ? (isNegative ? 'debit' : 'credit')
    : type;

  const typeStyles = {
    credit: 'text-green-600 dark:text-green-400',
    debit: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-900 dark:text-white',
  };

  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  const getPrefix = () => {
    if (showSign) {
      if (displayType === 'credit') return '+';
      if (displayType === 'debit' || isNegative) return '-';
    }
    if (isNegative && !showSign) return '-';
    return '';
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${currency}${formatAmount(amount)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 font-mono font-semibold ${typeStyles[displayType]} ${sizeStyles[size]} ${className}`}>
      <span>
        {getPrefix()}{currency}{formatAmount(amount)}
      </span>
      {copyable && (
        <button
          onClick={handleCopy}
          className="p-0.5 rounded hover:bg-gray-100 transition-colors"
          title="Copy amount"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 text-gray-400" />
          )}
        </button>
      )}
    </span>
  );
};

export const AmountCompact = ({ amount, currency = '$', threshold = 1000 }) => {
  const formatCompact = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 1000000000) {
      return `${(absValue / 1000000000).toFixed(1)}B`;
    }
    if (absValue >= 1000000) {
      return `${(absValue / 1000000).toFixed(1)}M`;
    }
    if (absValue >= threshold) {
      return `${(absValue / 1000).toFixed(1)}K`;
    }
    return absValue.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const fullAmount = `${currency}${Math.abs(amount).toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;

  return (
    <span 
      className="font-mono font-semibold cursor-help" 
      title={fullAmount}
    >
      {amount < 0 ? '-' : ''}{currency}{formatCompact(amount)}
    </span>
  );
};

export default AmountDisplay;
