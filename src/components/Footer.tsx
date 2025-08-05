import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../images/HednorLogo.png'

const Footer = () => {
  return (
    <footer className="bg-[rgb(var(--c-neutral-900))] text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                {/* <ShoppingBag className="h-8 w-8 text-[rgb(var(--c-primary-500))]" />
                <TrendingUp className="h-4 w-4 text-[rgb(var(--c-secondary-500))] absolute -top-1 -right-1" /> */}
                <img src={logo} alt="Logo" className='h-8 w-8' />
              </div>
              <span className="text-xl font-bold">SellerHub</span>
            </Link>
            <p className="text-[rgb(var(--c-neutral-400))] mb-4">
              Empowering sellers to build successful businesses with our comprehensive platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Getting Started */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Register as Seller
                </Link>
              </li>
              <li>
                <Link to="/why-sell" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Why Sell With Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Pricing Calculator
                </Link>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Seller Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Seller Community
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Training Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                  Seller Agreement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgb(var(--c-neutral-800))] mt-8 pt-8 text-center text-[rgb(var(--c-neutral-400))]">
          <p>&copy; 2024 Hednor Part of Ramaera Industries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;