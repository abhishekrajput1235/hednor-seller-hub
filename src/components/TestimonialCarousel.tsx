import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Electronics Store",
      rating: 5,
      content: "SellerHub transformed my small electronics business. I've increased my sales by 300% in just 6 months!",
      revenue: "₹2.5L/month",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Priya Sharma",
      business: "Fashion Boutique",
      rating: 5,
      content: "The platform is incredibly user-friendly. Managing inventory and orders has never been easier.",
      revenue: "₹1.8L/month",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Amit Patel",
      business: "Home Decor",
      rating: 5,
      content: "Their logistics support is outstanding. My customers receive orders quickly and safely.",
      revenue: "₹3.2L/month",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Sneha Gupta",
      business: "Handmade Crafts",
      rating: 5,
      content: "I started with just a few products and now I have a thriving business. The support team is amazing!",
      revenue: "₹95K/month",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="card p-8 text-center"
          >
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[rgb(var(--c-primary-500))] fill-current" />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl text-[rgb(var(--c-neutral-700))] mb-6 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold text-[rgb(var(--c-neutral-900))]">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-[rgb(var(--c-neutral-600))]">
                  {testimonials[currentIndex].business}
                </p>
                <p className="text-[rgb(var(--c-secondary-500))] font-semibold">
                  {testimonials[currentIndex].revenue}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-[rgb(var(--c-neutral-200))] hover:bg-[rgb(var(--c-primary-500))] transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-[rgb(var(--c-primary-500))]'
                  : 'bg-[rgb(var(--c-neutral-300))] hover:bg-[rgb(var(--c-neutral-400))]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-[rgb(var(--c-neutral-200))] hover:bg-[rgb(var(--c-primary-500))] transition-colors duration-200"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;