import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  User,
  Mail,
  Phone,
  Building,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const steps = [
    { number: 1, title: 'Contact Info', icon: User },
    { number: 2, title: 'Business Details', icon: Building },
    { number: 3, title: 'Bank & Tax Info', icon: CreditCard },
    { number: 4, title: 'Verification', icon: CheckCircle },
  ];

  // Step 1 Schema
  const step1Schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
  });

  // Step 2 Schema
  const step2Schema = yup.object().shape({
    businessName: yup.string().required('Business name is required'),
    businessType: yup.string().required('Business type is required'),
    gstin: yup.string().matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid GSTIN format'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
  });

  // Step 3 Schema
  const step3Schema = yup.object().shape({
    accountHolderName: yup.string().required('Account holder name is required'),
    accountNumber: yup.string().required('Account number is required'),
    ifscCode: yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code').required('IFSC code is required'),
    bankName: yup.string().required('Bank name is required'),
    panNumber: yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format').required('PAN number is required'),
  });

  const getCurrentSchema = () => {
    switch (currentStep) {
      case 1: return step1Schema;
      case 2: return step2Schema;
      case 3: return step3Schema;
      default: return yup.object();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(getCurrentSchema()),
    mode: 'onChange',
  });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (currentStep === 1 && !otpVerified) {
        setOtpSent(true);
      } else if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOtpVerification = () => {
    setOtpVerified(true);
    setCurrentStep(2);
  };

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="pt-24 section-padding min-h-screen bg-[rgb(var(--c-neutral-100))]">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          {/* <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-[rgb(var(--c-primary-500))] text-[rgb(var(--c-neutral-900))]'
                        : 'bg-[rgb(var(--c-neutral-300))] text-[rgb(var(--c-neutral-600))]'
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-1 mx-4 transition-all duration-300 ${
                        currentStep > step.number
                          ? 'bg-[rgb(var(--c-primary-500))]'
                          : 'bg-[rgb(var(--c-neutral-300))]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <p className="text-sm font-medium text-[rgb(var(--c-neutral-700))]">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
          <div className="w-full px-4 sm:px-6 lg:px-8 mb-12">
            {/* Horizontal Stepper Container */}
            <div className="relative flex items-center justify-between sm:gap-0">
              {steps.map((step, index) => (
                <div key={step.number} className="flex-1 flex flex-col items-center text-center relative">
                  {/* Horizontal connector line (for large screens only, except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-6 left-1/2 w-full h-1 z-0">
                      <div
                        className={`h-full transition-all duration-300 ${currentStep > step.number
                            ? 'bg-[rgb(var(--c-primary-500))]'
                            : 'bg-[rgb(var(--c-neutral-300))]'
                          }`}
                        style={{
                          width: '100%',
                          marginLeft: '0.75rem',
                          marginRight: '0.75rem',
                        }}
                      />
                    </div>
                  )}

                  {/* Step Icon Circle */}
                  <div
                    className={`z-10 w-12 h-12 flex items-center justify-center rounded-full mb-2 transition-all duration-300 ${currentStep >= step.number
                        ? 'bg-[rgb(var(--c-primary-500))] text-white shadow-lg'
                        : 'bg-[rgb(var(--c-neutral-300))] text-[rgb(var(--c-neutral-700))]'
                      }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Step Title */}
                  <p className="text-sm font-medium text-[rgb(var(--c-neutral-700))]">{step.title}</p>
                </div>
              ))}
            </div>

            {/* Mobile Connector Line (optional) */}
            <div className="sm:hidden mt-4 flex justify-between w-full px-2">
              {steps.slice(0, -1).map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 mx-1 rounded-full ${currentStep > steps[index].number
                      ? 'bg-[rgb(var(--c-primary-500))]'
                      : 'bg-[rgb(var(--c-neutral-300))]'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-2">
                      Contact Information
                    </h2>
                    <p className="text-[rgb(var(--c-neutral-600))]">
                      Let's start with your basic contact details
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        First Name
                      </label>
                      <input
                        {...register('firstName')}
                        className="input-field"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Last Name
                      </label>
                      <input
                        {...register('lastName')}
                        className="input-field"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="input-field"
                      placeholder="Enter your 10-digit phone number"
                    />
                    {errors.phone && (
                      <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-4">
                        Verify Your Phone Number
                      </h3>
                      <p className="text-[rgb(var(--c-neutral-600))] mb-4">
                        We've sent a 6-digit OTP to your phone number
                      </p>
                      <div className="flex space-x-2 mb-4">
                        {[...Array(6)].map((_, i) => (
                          <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-[rgb(var(--c-neutral-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] focus:border-transparent"
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleOtpVerification}
                        className="btn-primary"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-2">
                      Business Information
                    </h2>
                    <p className="text-[rgb(var(--c-neutral-600))]">
                      Tell us about your business
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Business Name
                      </label>
                      <input
                        {...register('businessName')}
                        className="input-field"
                        placeholder="Enter your business name"
                      />
                      {errors.businessName && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Business Type
                      </label>
                      <select {...register('businessType')} className="input-field">
                        <option value="">Select business type</option>
                        <option value="individual">Individual</option>
                        <option value="proprietorship">Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="company">Private Limited Company</option>
                        <option value="llp">LLP</option>
                      </select>
                      {errors.businessType && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.businessType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                      GSTIN (Optional)
                    </label>
                    <input
                      {...register('gstin')}
                      className="input-field"
                      placeholder="Enter your GSTIN number"
                    />
                    {errors.gstin && (
                      <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                        {errors.gstin.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                      Business Address
                    </label>
                    <textarea
                      {...register('address')}
                      className="input-field"
                      rows={3}
                      placeholder="Enter your complete business address"
                    />
                    {errors.address && (
                      <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        City
                      </label>
                      <input
                        {...register('city')}
                        className="input-field"
                        placeholder="Enter city"
                      />
                      {errors.city && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        State
                      </label>
                      <select {...register('state')} className="input-field">
                        <option value="">Select state</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="delhi">Delhi</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamil-nadu">Tamil Nadu</option>
                        <option value="gujarat">Gujarat</option>
                      </select>
                      {errors.state && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Pincode
                      </label>
                      <input
                        {...register('pincode')}
                        className="input-field"
                        placeholder="Enter pincode"
                      />
                      {errors.pincode && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.pincode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Bank & Tax Details */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-2">
                      Bank & Tax Information
                    </h2>
                    <p className="text-[rgb(var(--c-neutral-600))]">
                      Enter your banking and tax details for payments
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Account Holder Name
                      </label>
                      <input
                        {...register('accountHolderName')}
                        className="input-field"
                        placeholder="Enter account holder name"
                      />
                      {errors.accountHolderName && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.accountHolderName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Account Number
                      </label>
                      <input
                        {...register('accountNumber')}
                        className="input-field"
                        placeholder="Enter account number"
                      />
                      {errors.accountNumber && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.accountNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        IFSC Code
                      </label>
                      <input
                        {...register('ifscCode')}
                        className="input-field"
                        placeholder="Enter IFSC code"
                      />
                      {errors.ifscCode && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.ifscCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                        Bank Name
                      </label>
                      <input
                        {...register('bankName')}
                        className="input-field"
                        placeholder="Enter bank name"
                      />
                      {errors.bankName && (
                        <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                          {errors.bankName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                      PAN Number
                    </label>
                    <input
                      {...register('panNumber')}
                      className="input-field"
                      placeholder="Enter PAN number"
                    />
                    {errors.panNumber && (
                      <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                        {errors.panNumber.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="text-center"
                >
                  <CheckCircle className="h-24 w-24 text-[rgb(var(--c-secondary-500))] mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
                    Registration Complete!
                  </h2>
                  <p className="text-[rgb(var(--c-neutral-600))] mb-8">
                    Your seller account has been created successfully. We'll review your information
                    and notify you via email within 24-48 hours.
                  </p>
                  <button type="submit" className="btn-primary">
                    Go to Dashboard
                  </button>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center px-6 py-3 text-[rgb(var(--c-neutral-700))] border border-[rgb(var(--c-neutral-300))] rounded-lg hover:bg-[rgb(var(--c-neutral-100))] transition-colors duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary flex items-center ml-auto"
                  >
                    {currentStep === 1 && !otpVerified ? 'Send OTP' : 'Next Step'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;