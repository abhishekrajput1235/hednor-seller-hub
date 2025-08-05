import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, MessageCircle, User } from 'lucide-react';

const MobileBottomBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Pricing', path: '/pricing', icon: Calculator },
    { name: 'Contact', path: '/contact', icon: MessageCircle },
    { name: 'Register', path: '/register', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgb(var(--c-neutral-200))] md:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-[rgb(var(--c-primary-500))] bg-[rgb(var(--c-primary-500))]/10'
                  : 'text-[rgb(var(--c-neutral-600))] hover:text-[rgb(var(--c-primary-500))]'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomBar;