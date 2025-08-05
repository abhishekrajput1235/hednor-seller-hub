import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does it cost to start selling?",
      answer: "It's completely free to register and start selling on SellerHub. We only charge a small commission when you make a sale, starting at just 2% depending on your category."
    },
    {
      question: "How long does it take to get approved?",
      answer: "Most seller accounts are approved within 24-48 hours after submitting all required documents. We'll notify you via email once your account is ready."
    },
    {
      question: "Do you provide logistics support?",
      answer: "Yes! We offer comprehensive logistics support including warehousing, packaging, and delivery through our network of trusted partners across the country."
    },
    {
      question: "How and when do I receive payments?",
      answer: "Payments are processed weekly and deposited directly into your registered bank account. You can track all your earnings in real-time through your seller dashboard."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 customer support, dedicated account managers for high-volume sellers, training resources, and a comprehensive help center to ensure your success."
    },
    {
      question: "Can I sell internationally?",
      answer: "Currently, we focus on the domestic market, but we're working on expanding internationally. We'll notify all sellers when international selling becomes available."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="card">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[rgb(var(--c-neutral-100))] transition-colors duration-200"
            >
              <h3 className="font-semibold text-[rgb(var(--c-neutral-900))] pr-4">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-[rgb(var(--c-primary-500))] flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[rgb(var(--c-neutral-500))] flex-shrink-0" />
              )}
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-[rgb(var(--c-neutral-600))] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;