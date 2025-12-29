import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Send,
  ArrowRight
} from 'lucide-react';
import logo from '../images/HednorLogo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[rgb(var(--c-neutral-900))] via-[rgb(17,24,45)] to-[rgb(var(--c-neutral-900))] text-white overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgb(var(--c-primary-500))] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgb(var(--c-secondary-500))] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Newsletter Section - More Compact */}
        <div className="mb-8 bg-gradient-to-r from-[rgba(var(--c-primary-500),0.1)] to-[rgba(var(--c-secondary-500),0.1)] backdrop-blur-sm border border-[rgba(var(--c-primary-500),0.2)] rounded-xl p-6 shadow-2xl">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] rounded-lg shadow-lg flex-shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] bg-clip-text text-transparent">
                  Stay Updated
                </h3>
                <p className="text-[rgb(var(--c-neutral-400))] text-sm">
                  Get seller insights & platform updates
                </p>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[rgb(var(--c-neutral-500))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c-primary-500))] transition-all duration-300 text-sm w-full md:w-64"
                required
              />
              <button
                type="submit"
                className="group px-6 py-2 bg-gradient-to-r from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] rounded-lg font-semibold text-[rgb(var(--c-neutral-900))] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                {isSubscribed ? (
                  <>
                    <span>Subscribed!</span>
                    <Send className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content - More Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8 mb-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] opacity-20 rounded-lg blur-lg group-hover:opacity-40 transition-opacity"></div>
                <img src={logo} alt="Logo" className="h-8 w-8 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-[rgb(var(--c-neutral-300))] bg-clip-text text-transparent">
                SellerHub
              </span>
            </Link>
            <p className="text-[rgb(var(--c-neutral-400))] text-sm mb-4 leading-relaxed max-w-xs">
              Empowering sellers to build successful businesses with our comprehensive platform.
            </p>

            {/* Social Links */}
            <div className="flex space-x-2">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group relative w-9 h-9 flex items-center justify-center bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-lg hover:bg-gradient-to-br hover:from-[rgb(var(--c-primary-500))] hover:to-[rgb(var(--c-secondary-500))] hover:border-transparent transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4 text-[rgb(var(--c-neutral-400))] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div>
            <h3 className="text-sm font-bold mb-3 relative inline-block">
              Getting Started
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/register', label: 'Register as Seller' },
                { to: '/why-sell', label: 'Why Sell' },
                { to: '/pricing', label: 'Pricing' },
                { to: '#', label: 'Guidelines' }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-all duration-300 text-sm"
                  >
                    <ArrowRight className="h-3 w-3 mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold mb-3 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '#', label: 'Help Center' },
                { to: '#', label: 'Community' },
                { to: '#', label: 'Training' }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-all duration-300 text-sm"
                  >
                    <ArrowRight className="h-3 w-3 mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-3 relative inline-block">
              Legal
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[rgb(var(--c-primary-500))] to-[rgb(var(--c-secondary-500))] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Terms of Service' },
                { label: 'Privacy Policy' },
                { label: 'Cookie Policy' },
                { label: 'Seller Agreement' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className="group flex items-center text-[rgb(var(--c-neutral-400))] hover:text-[rgb(var(--c-primary-500))] transition-all duration-300 text-sm"
                  >
                    <ArrowRight className="h-3 w-3 mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - More Compact */}
        <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <p className="text-[rgb(var(--c-neutral-500))] text-center sm:text-left">
              &copy; 2024 CloudKidd Part of <span className="text-[rgb(var(--c-primary-500))] font-semibold">Ramaera Industries</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[rgb(var(--c-neutral-500))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                Sitemap
              </a>
              <span className="text-[rgb(var(--c-neutral-700))]">•</span>
              <a href="#" className="text-[rgb(var(--c-neutral-500))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                Accessibility
              </a>
              <span className="text-[rgb(var(--c-neutral-700))]">•</span>
              <a href="#" className="text-[rgb(var(--c-neutral-500))] hover:text-[rgb(var(--c-primary-500))] transition-colors">
                Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;