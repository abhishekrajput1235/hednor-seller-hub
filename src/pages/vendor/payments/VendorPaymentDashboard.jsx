import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Wallet, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  Download,
  CreditCard,
  Building2,
  Eye
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { FinancialCard, TransactionStatusBadge, TransactionTypeBadge, PaymentMethodIcon, AmountDisplay } from '../../../components/payments';
import { generateVendorEarnings, generateTransactions, generatePaymentMethods } from '../../../utils/paymentMockData';

const VendorPaymentDashboard = () => {
  const [chartView, setChartView] = useState('daily');
  const earnings = generateVendorEarnings();
  const transactions = generateTransactions().slice(0, 10);
  const paymentMethods = generatePaymentMethods().filter(pm => pm.status === 'verified');

  const chartData = chartView === 'daily' 
    ? earnings.earningsChartData 
    : earnings.monthlyEarningsData;

  const earningsChange = ((earnings.totalEarnings - earnings.previousPeriodEarnings) / earnings.previousPeriodEarnings * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your earnings, payouts, and financial performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <Link
            to="/vendor/payments/payouts"
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
          >
            <ArrowUpRight className="w-4 h-4" />
            Request Payout
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinancialCard
          title="Total Earnings"
          amount={earnings.totalEarnings}
          change={parseFloat(earningsChange)}
          icon={DollarSign}
          trend={earningsChange >= 0 ? 'up' : 'down'}
          variant="success"
          sparklineData={earnings.earningsChartData.map(d => d.earnings)}
        />
        <FinancialCard
          title="Available Balance"
          amount={earnings.availableBalance}
          icon={Wallet}
          variant="info"
          subtitle={`Next payout: ${new Date(earnings.nextPayoutDate).toLocaleDateString()}`}
          action={() => {}}
          actionLabel="Request Payout"
        />
        <FinancialCard
          title="Pending Clearance"
          amount={earnings.pendingClearance}
          icon={Clock}
          variant="warning"
          subtitle={`Expected: ${new Date(earnings.expectedReleaseDate).toLocaleDateString()}`}
          info="Funds held during the clearance period before becoming available"
        />
        <FinancialCard
          title="Lifetime Earnings"
          amount={earnings.lifetimeEarnings}
          icon={TrendingUp}
          variant="purple"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Orders (This Month)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{earnings.thisMonthOrders}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Commission Paid (This Month)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 font-mono">${earnings.thisMonthCommission.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Average Order Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 font-mono">${earnings.averageOrderValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending Refunds</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{earnings.pendingRefunds}</p>
          <p className="text-xs text-gray-500">${earnings.pendingRefundsAmount} pending</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900">Earnings Overview</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['daily', 'monthly'].map((view) => (
                <button
                  key={view}
                  onClick={() => setChartView(view)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    chartView === view
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={chartView === 'daily' ? 'date' : 'month'} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v}`} />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              fill="url(#colorSales)" 
              strokeWidth={2}
              name="Sales"
            />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stroke="#10b981" 
              fill="url(#colorEarnings)" 
              strokeWidth={2}
              name="Earnings"
            />
            <Line 
              type="monotone" 
              dataKey="commission" 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Commission"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
            <Link 
              to="/vendor/payments/transactions" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <TransactionTypeBadge type={transaction.type} showIcon size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.orderId ? (
                        <Link to={`/orders/${transaction.orderId}`} className="hover:text-primary-600">
                          {transaction.orderId}
                        </Link>
                      ) : (
                        transaction.description
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleString()}
                      {transaction.customer && ` • ${transaction.customer}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <AmountDisplay 
                    amount={transaction.amount} 
                    type="auto" 
                    size="sm"
                    showSign
                  />
                  <TransactionStatusBadge status={transaction.status} size="xs" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
            <Link 
              to="/vendor/payments/methods" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Manage
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {paymentMethods.slice(0, 3).map((method) => (
              <div 
                key={method.id} 
                className={`p-4 rounded-lg border ${method.isPrimary ? 'border-primary-200 bg-primary-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <PaymentMethodIcon method={method.type} size="sm" />
                  {method.isPrimary && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  {method.type === 'bank_account' && (
                    <p className="text-sm text-gray-600">
                      {method.details.bankName} • {method.details.accountNumber}
                    </p>
                  )}
                  {method.type === 'paypal' && (
                    <p className="text-sm text-gray-600">{method.details.email}</p>
                  )}
                  {method.type === 'stripe' && (
                    <p className="text-sm text-gray-600">{method.details.accountId}</p>
                  )}
                </div>
              </div>
            ))}
            <Link
              to="/vendor/payments/methods"
              className="block w-full text-center py-3 text-sm text-primary-600 hover:text-primary-700 font-medium border border-dashed border-gray-300 rounded-lg hover:border-primary-300"
            >
              + Add Payment Method
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPaymentDashboard;
