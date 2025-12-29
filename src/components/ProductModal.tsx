// ProductModal.js
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProductModal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-[rgb(var(--c-bg-secondary))] rounded-lg w-full max-w-lg shadow-xl dark:shadow-2xl relative p-6 max-h-[90vh] overflow-y-auto border border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))]"
      >
        <button
          className="absolute top-4 right-4 text-[rgb(var(--c-neutral-400))] dark:text-[rgb(var(--c-text-tertiary))] hover:text-[rgb(var(--c-error-500))] transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))] mb-4">
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
