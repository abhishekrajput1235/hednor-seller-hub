
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Truck,
  DollarSign,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQ from '../components/FAQ';

const LandingPage = () => {
  const steps = [
    {
      icon: Users,
      title: "Sign Up",
      description: "Create your seller account in minutes with our simple registration process."
    },
    {
      icon: TrendingUp,
      title: "List Products",
      description: "Upload your products with our easy-to-use tools and reach millions of customers."
    },
    {
      icon: DollarSign,
      title: "Start Earning",
      description: "Receive payments directly to your bank account with our secure payment system."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Low Commission Fees",
      description: "Keep more of your profits with our competitive fee structure starting at just 2%."
    },
    {
      icon: Users,
      title: "Wide Customer Reach",
      description: "Access millions of active buyers across the country and grow your business."
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "Seamless fulfillment with our nationwide shipping and delivery network."
    },
    {
      icon: TrendingUp,
      title: "Marketing Tools",
      description: "Boost your sales with our advertising platform and promotional campaigns."
    }
  ];

  const stats = [
    { value: 50000, label: "Active Sellers", suffix: "+" },
    { value: 2500000, label: "Monthly Orders", suffix: "+" },
    { value: 98, label: "Seller Satisfaction", suffix: "%" },
    { value: 24, label: "Support Hours", suffix: "/7" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 section-padding bg-gradient-to-br from-[rgb(var(--c-primary-500))]/10 to-[rgb(var(--c-secondary-500))]/10">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Start Selling on{' '}
                <span className="gradient-text">SellerHub</span>{' '}
                Today
              </h1> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
                Sell online With {' '}
                <span className="gradient-text">HEDNOR</span>{' '}

              </h1>
              <p className="text-lg md:text-xl text-[rgb(var(--c-neutral-600))] mb-8 leading-relaxed">
                Join thousands of successful sellers and grow your business with our
                comprehensive e-commerce platform. Low fees, wide reach, and full support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="btn-secondary inline-flex items-center"
                >
                  Calculate Earnings
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 card p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-2">
                    Success Stories
                  </h3>
                  <p className="text-[rgb(var(--c-neutral-600))]">
                    Real results from our sellers
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-[rgb(var(--c-primary-500))]">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Start Selling in 3 Simple Steps
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Our streamlined process makes it easy to get started and begin earning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[rgb(var(--c-primary-500))] rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-[rgb(var(--c-neutral-900))]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[rgb(var(--c-secondary-500))] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[rgb(var(--c-neutral-900))] mb-3">
                  {step.title}
                </h3>
                <p className="text-[rgb(var(--c-neutral-600))]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-[rgb(var(--c-neutral-100))]">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Why Choose SellerHub?
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Everything you need to build a successful online business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[rgb(var(--c-primary-500))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-[rgb(var(--c-primary-500))]" />
                </div>
                <h3 className="text-lg font-semibold text-[rgb(var(--c-neutral-900))] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[rgb(var(--c-neutral-600))]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              What Our Sellers Say
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Join thousands of satisfied sellers who have grown their businesses with us
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[rgb(var(--c-neutral-100))]">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              Get answers to common questions about selling on our platform
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white text-black">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Selling Journey?
          </h2>
          <p className="text-lg text-[rgb(var(--c-neutral-300))] mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers and start earning today.
            It's free to get started and takes less than 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="btn-secondary inline-flex items-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;