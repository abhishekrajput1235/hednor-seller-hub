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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Newsletter */}
        <div className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Stay Updated
                </h3>
                <p className="text-sm text-gray-600">
                  Seller insights & platform updates
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full md:w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition"
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-1">
                    Subscribed <Send className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">

          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">
                SellerHub
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs mb-4">
              Empowering sellers to build successful businesses with a modern,
              scalable commerce platform.
            </p>

            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {[
            {
              title: 'Getting Started',
              links: ['Register as Seller', 'Why Sell', 'Pricing', 'Guidelines']
            },
            {
              title: 'Support',
              links: ['Contact Us', 'Help Center', 'Community', 'Training']
            },
            {
              title: 'Legal',
              links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Seller Agreement']
            }
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-blue-600 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © 2024 CloudKidd · Part of{' '}
            <span className="font-semibold text-blue-600">
              Ramaera Industries
            </span>
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600">Sitemap</a>
            <a href="#" className="hover:text-blue-600">Accessibility</a>
            <a href="#" className="hover:text-blue-600">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
