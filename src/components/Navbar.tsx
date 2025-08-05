import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag, TrendingUp } from 'lucide-react';
import logo from '../images/HednorLogo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Why Sell', path: '/why-sell' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              {/* <ShoppingBag className="h-8 w-8 text-[rgb(var(--c-primary-500))]" /> */}
              {/* <TrendingUp className="h-4 w-4 text-[rgb(var(--c-secondary-500))] absolute -top-1 -right-1" /> */}
              <img src={logo} alt="Logo" className="h-8 w-8 ml-2" />
            </div>
            <span className="text-xl font-bold text-[rgb(var(--c-neutral-900))]">
              SellerHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-[rgb(var(--c-primary-500))]'
                    : 'text-[rgb(var(--c-neutral-700))] hover:text-[rgb(var(--c-primary-500))]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-[rgb(var(--c-neutral-700))] hover:text-[rgb(var(--c-primary-500))] transition-colors duration-200"
            >
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Start Selling
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[rgb(var(--c-neutral-700))] hover:bg-[rgb(var(--c-neutral-200))] transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[rgb(var(--c-neutral-200))]"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-[rgb(var(--c-primary-500))]'
                      : 'text-[rgb(var(--c-neutral-700))] hover:text-[rgb(var(--c-primary-500))]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[rgb(var(--c-neutral-200))]">
                <Link
                  to="/dashboard"
                  className="block py-2 text-sm font-medium text-[rgb(var(--c-neutral-700))] hover:text-[rgb(var(--c-primary-500))] transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary mt-4 block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Start Selling
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;