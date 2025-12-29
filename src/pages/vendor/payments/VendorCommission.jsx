import { useState } from 'react';
import { 
  Percent, 
  TrendingUp, 
  Award, 
  Calculator,
  HelpCircle,
  ChevronRight,
  Download
} from 'lucide-react';
import { generateCommissionStructure } from '../../../utils/paymentMockData';

const VendorCommission = () => {
  const commission = generateCommissionStructure();
  const [calcPrice, setCalcPrice] = useState('100');
  const [calcCategory, setCalcCategory] = useState('Electronics');
  const [calcQuantity, setCalcQuantity] = useState('1');

  const selectedCategoryRate = commission.categoryRates.find(c => c.category === calcCategory)?.rate || 15;
  const grossAmount = parseFloat(calcPrice || 0) * parseInt(calcQuantity || 1);
  const commissionAmount = grossAmount * (selectedCategoryRate / 100);
  const processingFee = grossAmount * 0.029 + 0.30;
  const netEarnings = grossAmount - commissionAmount - processingFee;

  const progressPercentage = (commission.currentProgress / commission.nextTierThreshold) * 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commission & Fees</h1>
          <p className="text-gray-600 mt-1">Understand your commission rates and fees breakdown.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4" />
          Download Fee Schedule
        </button>
      </div>

      {/* Current Tier Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-primary-200">Your Current Tier</p>
              <p className="text-3xl font-bold">{commission.tierLevel}</p>
              <p className="text-sm text-primary-200 mt-1">
                Commission Rate: <span className="font-semibold text-white">{commission.currentRate}%</span>
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-primary-200">Progress to {commission.nextTier}</span>
              <span className="font-semibold">
                ${commission.currentProgress.toLocaleString()} / ${commission.nextTierThreshold.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-primary-900/50 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-primary-200 mt-2">
              ${(commission.nextTierThreshold - commission.currentProgress).toLocaleString()} more in sales to unlock {commission.nextTier} tier
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-primary-500/30">
          <p className="text-sm text-primary-200 mb-3">Your Tier Benefits:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {commission.tierBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Commission Rates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-gray-500" />
            Commission Rates by Category
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="text-right py-3 text-xs font-semibold text-gray-600 uppercase">Rate</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Based On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {commission.categoryRates.map((cat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">{cat.category}</td>
                    <td className="py-3 text-sm text-right">
                      <span className="font-semibold text-primary-600">{cat.rate}%</span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{cat.basedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Calculator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gray-500" />
            Commission Calculator
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={calcCategory}
                onChange={(e) => setCalcCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {commission.categoryRates.map((cat) => (
                  <option key={cat.category} value={cat.category}>{cat.category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gross Sale Amount</span>
                <span className="font-mono">${grossAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Commission ({selectedCategoryRate}%)</span>
                <span className="font-mono text-red-600">-${commissionAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Processing (2.9% + $0.30)</span>
                <span className="font-mono text-red-600">-${processingFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Your Earnings</span>
                  <span className="font-bold text-green-600 text-lg font-mono">
                    ${netEarnings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fees Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-gray-500" />
          Fees Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Fee Type</th>
                <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Description</th>
                <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Rate/Amount</th>
                <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase">Applied To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {commission.feesBreakdown.map((fee, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium text-gray-900">{fee.type}</td>
                  <td className="py-4 text-sm text-gray-600">{fee.description}</td>
                  <td className="py-4">
                    <span className="inline-flex px-2 py-1 text-sm font-semibold bg-gray-100 text-gray-800 rounded">
                      {fee.rate}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{fee.appliedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Have questions about fees?</h3>
        <p className="text-sm text-blue-700 mb-4">
          Our support team is here to help you understand your commission structure and fees.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Contact Support
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 border border-blue-300 rounded-lg text-sm font-medium hover:bg-blue-50">
            View FAQ
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCommission;
