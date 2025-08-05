import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Truck, 
  DollarSign, 
  HeadphonesIcon, 
  Target,
  Award,
  BarChart3,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const WhySellPage = () => {
  const advantages = [
    {
      icon: Users,
      title: "Massive Customer Base",
      description: "Access to over 50 million active customers across India, ready to discover and purchase your products.",
      stats: "50M+ Active Customers"
    },
    {
      icon: DollarSign,
      title: "Competitive Commission",
      description: "Keep more of your profits with our industry-leading low commission rates starting at just 2%.",
      stats: "From 2% Commission"
    },
    {
      icon: Truck,
      title: "End-to-End Logistics",
      description: "Complete fulfillment solution including warehousing, packaging, and delivery to your customers.",
      stats: "99.5% Delivery Success"
    },
    {
      icon: TrendingUp,
      title: "Marketing & Advertising",
      description: "Powerful marketing tools and advertising platform to boost your product visibility and sales.",
      stats: "3x Average Sales Boost"
    },
    {
      icon: Shield,
      title: "Seller Protection",
      description: "Comprehensive protection against fraud, disputes, and payment issues with our dedicated support team.",
      stats: "24/7 Protection"
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description: "Expert seller support team available round the clock to help you succeed and grow your business.",
      stats: "< 5 Min Response Time"
    }
  ];

  const successStories = [
    {
      name: "TechGadgets Pro",
      category: "Electronics",
      growth: "500%",
      revenue: "₹25L/month",
      story: "From a small local store to a leading electronics seller on our platform",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "StyleCraft Fashion",
      category: "Apparel",
      growth: "350%",
      revenue: "₹18L/month",
      story: "Built a fashion empire by leveraging our marketing tools and customer insights",
      image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "HomeDecor Plus",
      category: "Home & Living",
      growth: "400%",
      revenue: "₹12L/month",
      story: "Transformed a home-based business into a thriving online store",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const platformStats = [
    { value: 50000, label: "Active Sellers", suffix: "+" },
    { value: 2500000, label: "Monthly Orders", suffix: "+" },
    { value: 98, label: "Seller Satisfaction", suffix: "%" },
    { value: 15, label: "Average Revenue Growth", suffix: "x" }
  ];

  const features = [
    "Real-time sales analytics and insights",
    "Automated inventory management",
    "Multi-channel selling capabilities",
    "Advanced SEO optimization tools",
    "Integrated payment processing",
    "Mobile-friendly seller dashboard",
    "Bulk product upload tools",
    "Customer review management"
  ];

  return (
    <div className="pt-24 min-h-screen bg-[rgb(var(--c-neutral-100))]">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-[rgb(var(--c-primary-500))]/10 to-[rgb(var(--c-secondary-500))]/10">
        <div className="container-max">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Why Sell With{' '}
                <span className="gradient-text">SellerHub</span>?
              </h1>
              <p className="text-lg md:text-xl text-[rgb(var(--c-neutral-600))] max-w-3xl mx-auto mb-8">
                Join India's fastest-growing e-commerce platform and unlock your business potential 
                with our comprehensive selling solutions.
              </p>
            </motion.div>
          </div>

          {/* Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {platformStats.map((stat, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-3xl font-bold text-[rgb(var(--c-primary-500))] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[rgb(var(--c-neutral-600))] text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Platform Advantages
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Everything you need to build and scale your online business successfully
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-[rgb(var(--c-primary-500))]/10 rounded-full flex items-center justify-center">
                    <advantage.icon className="h-7 w-7 text-[rgb(var(--c-primary-500))]" />
                  </div>
                  <span className="text-sm font-semibold text-[rgb(var(--c-secondary-500))]">
                    {advantage.stats}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-3">
                  {advantage.title}
                </h3>
                <p className="text-[rgb(var(--c-neutral-600))] leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-[rgb(var(--c-neutral-100))]">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Real businesses, real growth. See how our sellers have transformed their success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-[rgb(var(--c-primary-500))]/20 to-[rgb(var(--c-secondary-500))]/20 flex items-center justify-center relative">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4 bg-[rgb(var(--c-secondary-500))] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {story.growth} Growth
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))]">
                      {story.name}
                    </h3>
                    <span className="text-sm text-[rgb(var(--c-neutral-500))]">
                      {story.category}
                    </span>
                  </div>
                  <p className="text-[rgb(var(--c-neutral-600))] mb-4">
                    {story.story}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[rgb(var(--c-primary-500))]">
                      {story.revenue}
                    </span>
                    <Award className="h-5 w-5 text-[rgb(var(--c-secondary-500))]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Powerful Tools for Your Success
              </h2>
              <p className="text-lg text-[rgb(var(--c-neutral-600))] mb-8">
                Our comprehensive suite of tools and features helps you manage, 
                grow, and optimize your business efficiently.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[rgb(var(--c-secondary-500))] flex-shrink-0" />
                    <span className="text-[rgb(var(--c-neutral-700))]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="card p-6">
                    <BarChart3 className="h-8 w-8 text-[rgb(var(--c-primary-500))] mb-3" />
                    <h3 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-2">
                      Analytics Dashboard
                    </h3>
                    <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                      Track sales, revenue, and customer insights in real-time
                    </p>
                  </div>
                  <div className="card p-6">
                    <Globe className="h-8 w-8 text-[rgb(var(--c-secondary-500))] mb-3" />
                    <h3 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-2">
                      Multi-Channel Selling
                    </h3>
                    <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                      Expand your reach across multiple platforms
                    </p>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="card p-6">
                    <Zap className="h-8 w-8 text-[rgb(var(--c-warning-500))] mb-3" />
                    <h3 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-2">
                      Automated Tools
                    </h3>
                    <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                      Save time with automated inventory and order management
                    </p>
                  </div>
                  <div className="card p-6">
                    <Target className="h-8 w-8 text-[rgb(var(--c-primary-500))] mb-3" />
                    <h3 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-2">
                      Marketing Suite
                    </h3>
                    <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                      Powerful advertising and promotional tools
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[rgb(var(--c-neutral-900))] text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-300))] mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers who have transformed their businesses 
              with our platform. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center">
                Start Selling Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary inline-flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Calculate Earnings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhySellPage;