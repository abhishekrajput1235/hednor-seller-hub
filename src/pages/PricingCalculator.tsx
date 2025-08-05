import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Package, TrendingUp, DollarSign, Info } from 'lucide-react';

const PricingCalculator = () => {
  const [productPrice, setProductPrice] = useState(1000);
  const [weight, setWeight] = useState(500);
  const [category, setCategory] = useState('electronics');

  const categories = [
    { value: 'electronics', label: 'Electronics', commission: 3 },
    { value: 'fashion', label: 'Fashion & Lifestyle', commission: 2.5 },
    { value: 'home', label: 'Home & Garden', commission: 4 },
    { value: 'books', label: 'Books & Media', commission: 2 },
    { value: 'sports', label: 'Sports & Fitness', commission: 3.5 },
    { value: 'automotive', label: 'Automotive', commission: 5 },
  ];

  const getCurrentCategory = () => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const calculateFees = () => {
    const currentCategory = getCurrentCategory();
    const sellingPrice = productPrice;
    const commissionRate = currentCategory.commission;
    const commission = (sellingPrice * commissionRate) / 100;
    
    // Shipping fee based on weight
    const shippingFee = weight <= 500 ? 40 : weight <= 1000 ? 60 : 80;
    
    // Payment gateway fee (2% of selling price)
    const paymentGatewayFee = (sellingPrice * 2) / 100;
    
    // GST on commission (18%)
    const gstOnCommission = (commission * 18) / 100;
    
    const totalFees = commission + shippingFee + paymentGatewayFee + gstOnCommission;
    const netEarnings = sellingPrice - totalFees;
    const profitMargin = ((netEarnings / sellingPrice) * 100).toFixed(1);

    return {
      sellingPrice,
      commission,
      shippingFee,
      paymentGatewayFee,
      gstOnCommission,
      totalFees,
      netEarnings,
      profitMargin,
      commissionRate,
    };
  };

  const fees = calculateFees();

  return (
    <div className="pt-24 section-padding min-h-screen bg-[rgb(var(--c-neutral-100))]">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Calculator className="h-16 w-16 text-[rgb(var(--c-primary-500))] mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Pricing Calculator
            </h1>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Calculate your potential earnings and understand all fees involved in selling on our platform
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
              Product Details
            </h2>

            <div className="space-y-6">
              {/* Product Price */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                  Product Price (₹)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="input-field pr-16"
                    min="0"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--c-neutral-500))]">
                    ₹{productPrice.toLocaleString()}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="range"
                    min="100"
                    max="50000"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-full h-2 bg-[rgb(var(--c-neutral-200))] rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(var(--c-primary-500)) 0%, rgb(var(--c-primary-500)) ${(productPrice / 50000) * 100}%, rgb(var(--c-neutral-200)) ${(productPrice / 50000) * 100}%, rgb(var(--c-neutral-200)) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-[rgb(var(--c-neutral-500))] mt-1">
                    <span>₹100</span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                  Weight (grams)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="input-field pr-16"
                    min="0"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--c-neutral-500))]">
                    {weight}g
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2 bg-[rgb(var(--c-neutral-200))] rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(var(--c-secondary-500)) 0%, rgb(var(--c-secondary-500)) ${(weight / 5000) * 100}%, rgb(var(--c-neutral-200)) ${(weight / 5000) * 100}%, rgb(var(--c-neutral-200)) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-[rgb(var(--c-neutral-500))] mt-1">
                    <span>50g</span>
                    <span>5kg</span>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                  Product Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label} ({cat.commission}% commission)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Earnings Summary */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Earnings Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[rgb(var(--c-primary-500))]/10 rounded-lg">
                  <span className="font-medium text-[rgb(var(--c-neutral-700))]">
                    Selling Price
                  </span>
                  <span className="font-bold text-[rgb(var(--c-neutral-900))]">
                    ₹{fees.sellingPrice.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-[rgb(var(--c-error-500))]/10 rounded-lg">
                  <span className="font-medium text-[rgb(var(--c-neutral-700))]">
                    Total Fees
                  </span>
                  <span className="font-bold text-[rgb(var(--c-error-500))]">
                    -₹{fees.totalFees.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-[rgb(var(--c-secondary-500))]/10 rounded-lg">
                  <span className="font-medium text-[rgb(var(--c-neutral-700))]">
                    Net Earnings
                  </span>
                  <span className="font-bold text-[rgb(var(--c-secondary-500))] text-xl">
                    ₹{fees.netEarnings.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-[rgb(var(--c-neutral-200))] rounded-lg">
                  <span className="font-medium text-[rgb(var(--c-neutral-700))]">
                    Profit Margin
                  </span>
                  <span className="font-bold text-[rgb(var(--c-neutral-900))]">
                    {fees.profitMargin}%
                  </span>
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Fee Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[rgb(var(--c-neutral-700))]">
                      Commission ({fees.commissionRate}%)
                    </span>
                    <Info className="h-4 w-4 text-[rgb(var(--c-neutral-500))] ml-2" />
                  </div>
                  <span className="font-semibold text-[rgb(var(--c-neutral-900))]">
                    ₹{fees.commission.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[rgb(var(--c-neutral-700))]">
                      Shipping Fee
                    </span>
                    <Info className="h-4 w-4 text-[rgb(var(--c-neutral-500))] ml-2" />
                  </div>
                  <span className="font-semibold text-[rgb(var(--c-neutral-900))]">
                    ₹{fees.shippingFee.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[rgb(var(--c-neutral-700))]">
                      Payment Gateway (2%)
                    </span>
                    <Info className="h-4 w-4 text-[rgb(var(--c-neutral-500))] ml-2" />
                  </div>
                  <span className="font-semibold text-[rgb(var(--c-neutral-900))]">
                    ₹{fees.paymentGatewayFee.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-[rgb(var(--c-neutral-700))]">
                      GST on Commission (18%)
                    </span>
                    <Info className="h-4 w-4 text-[rgb(var(--c-neutral-500))] ml-2" />
                  </div>
                  <span className="font-semibold text-[rgb(var(--c-neutral-900))]">
                    ₹{fees.gstOnCommission.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
                Ready to Start?
              </h3>
              <p className="text-[rgb(var(--c-neutral-600))] mb-6">
                Join thousands of sellers earning with competitive rates
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center">
                  <Package className="mr-2 h-4 w-4" />
                  Start Selling
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Success Stories
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;