// ProductModal.js
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProductModal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg w-full max-w-lg shadow-xl relative p-6"
      >
        <button
          className="absolute top-4 right-4 text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-error-500))]"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
