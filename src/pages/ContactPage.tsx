import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  HeadphonesIcon,
  FileText,
  Users
} from 'lucide-react';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
    subject: yup.string().required('Subject is required'),
    category: yup.string().required('Category is required'),
    message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 1800-123-4567", "+91 1800-765-4321"],
      subtitle: "Mon-Fri 9AM-8PM, Sat 10AM-6PM",
      color: "text-[rgb(var(--c-primary-500))]",
      bgColor: "bg-[rgb(var(--c-primary-500))]/10"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@hednor.com", "sellers@hednor.com"],
      subtitle: "We'll respond within 24 hours",
      color: "text-[rgb(var(--c-secondary-500))]",
      bgColor: "bg-[rgb(var(--c-secondary-500))]/10"
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["H-77", "Noida Sector-63, Uttar Pradesh 201301"],
      subtitle: "Visit us for in-person support",
      color: "text-[rgb(var(--c-warning-500))]",
      bgColor: "bg-[rgb(var(--c-warning-500))]/10"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday: 10AM - 6PM"],
      subtitle: "Sunday: Closed",
      color: "text-[rgb(var(--c-primary-500))]",
      bgColor: "bg-[rgb(var(--c-primary-500))]/10"
    }
  ];

  const supportCategories = [
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      description: "Help with platform features, account issues, and troubleshooting"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Access comprehensive guides and tutorials for sellers"
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Dedicated support for account setup and management"
    },
    {
      icon: MessageCircle,
      title: "Sales Inquiry",
      description: "Questions about selling, pricing, and getting started"
    }
  ];

  const categories = [
    { value: "", label: "Select a category" },
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "account", label: "Account Issues" },
    { value: "sales", label: "Sales Questions" },
    { value: "billing", label: "Billing & Payments" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="pt-24 section-padding min-h-screen bg-[rgb(var(--c-neutral-100))]">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              We're here to help you succeed. Reach out to our support team for any questions or assistance you need.
            </p>
          </motion.div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className={`w-12 h-12 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <info.icon className={`h-6 w-6 ${info.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-2">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-[rgb(var(--c-neutral-600))] mb-1">
                  {detail}
                </p>
              ))}
              <p className="text-sm text-[rgb(var(--c-neutral-500))] mt-2">
                {info.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
              Send Us a Message
            </h2>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-[rgb(var(--c-secondary-500))]/10 border border-[rgb(var(--c-secondary-500))]/20 rounded-lg flex items-center"
              >
                <CheckCircle className="h-5 w-5 text-[rgb(var(--c-secondary-500))] mr-3" />
                <p className="text-[rgb(var(--c-secondary-500))] font-medium">
                  Thank you! Your message has been sent successfully.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="input-field"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                    Category
                  </label>
                  <select {...register('category')} className="input-field">
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  className="input-field"
                  placeholder="Enter the subject of your message"
                />
                {errors.subject && (
                  <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--c-neutral-700))] mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="input-field"
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-[rgb(var(--c-error-500))] text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Support Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Support Categories
              </h3>
              <div className="space-y-4">
                {supportCategories.map((category, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-[rgb(var(--c-neutral-100))] rounded-lg">
                    <div className="w-10 h-10 bg-[rgb(var(--c-primary-500))]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <category.icon className="h-5 w-5 text-[rgb(var(--c-primary-500))]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-1">
                        {category.title}
                      </h4>
                      <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Chat */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
                Need Immediate Help?
              </h3>
              <p className="text-[rgb(var(--c-neutral-600))] mb-6">
                Our live chat support is available during business hours for immediate assistance.
              </p>
              <button
                onClick={() => setShowLiveChat(!showLiveChat)}
                className="btn-secondary w-full flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Live Chat
              </button>
              
              {showLiveChat && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-[rgb(var(--c-secondary-500))]/10 rounded-lg"
                >
                  <p className="text-[rgb(var(--c-secondary-500))] font-medium mb-2">
                    Live Chat Available
                  </p>
                  <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                    A customer support representative will be with you shortly. 
                    Average wait time: 2-3 minutes.
                  </p>
                </motion.div>
              )}
            </div>

            {/* FAQ Link */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
                Frequently Asked Questions
              </h3>
              <p className="text-[rgb(var(--c-neutral-600))] mb-6">
                Find quick answers to common questions about selling, payments, and platform features.
              </p>
              <button className="btn-primary w-full">
                Browse FAQ
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;