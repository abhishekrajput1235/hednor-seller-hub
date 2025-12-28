import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomBar from '../components/MobileBottomBar';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
};

export default PublicLayout;
