import { 
  CreditCard, 
  Building2, 
  Wallet,
  Banknote,
  Bitcoin,
  CircleDollarSign
} from 'lucide-react';

const methodConfig = {
  credit_card: { 
    label: 'Credit Card', 
    icon: CreditCard, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  debit_card: { 
    label: 'Debit Card', 
    icon: CreditCard, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  bank_transfer: { 
    label: 'Bank Transfer', 
    icon: Building2, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  bank_account: { 
    label: 'Bank Account', 
    icon: Building2, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  paypal: { 
    label: 'PayPal', 
    icon: Wallet, 
    color: 'text-blue-700',
    bgColor: 'bg-blue-50'
  },
  stripe: { 
    label: 'Stripe', 
    icon: CreditCard, 
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  apple_pay: { 
    label: 'Apple Pay', 
    icon: Wallet, 
    color: 'text-gray-800',
    bgColor: 'bg-gray-100'
  },
  google_pay: { 
    label: 'Google Pay', 
    icon: Wallet, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  cash: { 
    label: 'Cash', 
    icon: Banknote, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  crypto: { 
    label: 'Cryptocurrency', 
    icon: Bitcoin, 
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  venmo: { 
    label: 'Venmo', 
    icon: CircleDollarSign, 
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
};

const PaymentMethodIcon = ({ 
  method, 
  showLabel = true, 
  size = 'sm',
  variant = 'default'
}) => {
  const config = methodConfig[method?.toLowerCase()] || {
    label: method || 'Unknown',
    icon: CreditCard,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  };
  
  const Icon = config.icon;

  const sizeClasses = {
    xs: { icon: 'w-3 h-3', text: 'text-xs', padding: 'p-1', gap: 'gap-1' },
    sm: { icon: 'w-4 h-4', text: 'text-sm', padding: 'p-1.5', gap: 'gap-1.5' },
    md: { icon: 'w-5 h-5', text: 'text-sm', padding: 'p-2', gap: 'gap-2' },
    lg: { icon: 'w-6 h-6', text: 'text-base', padding: 'p-2.5', gap: 'gap-2' },
  };

  const sizes = sizeClasses[size];

  if (variant === 'icon-only') {
    return (
      <div className={`${sizes.padding} rounded-lg ${config.bgColor}`}>
        <Icon className={`${sizes.icon} ${config.color}`} />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center ${sizes.gap} px-2 py-1 rounded-full ${config.bgColor}`}>
        <Icon className={`${sizes.icon} ${config.color}`} />
        {showLabel && (
          <span className={`${sizes.text} font-medium ${config.color}`}>
            {config.label}
          </span>
        )}
      </span>
    );
  }

  return (
    <div className={`flex items-center ${sizes.gap}`}>
      <div className={`${sizes.padding} rounded-lg ${config.bgColor}`}>
        <Icon className={`${sizes.icon} ${config.color}`} />
      </div>
      {showLabel && (
        <span className={`${sizes.text} font-medium text-gray-700`}>
          {config.label}
        </span>
      )}
    </div>
  );
};

export default PaymentMethodIcon;
