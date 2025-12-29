import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  DollarSign,
  X
} from 'lucide-react';
import logo from '../images/HednorLogo.png';

interface SellerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

const SellerSidebar: React.FC<SellerSidebarProps> = ({ isOpen, onClose, isCollapsed }) => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'Catalog', path: '/seller/catalog', icon: Package },
    { name: 'Inventory', path: '/seller/inventory', icon: Warehouse },
    { name: 'Orders', path: '/seller/orders', icon: ShoppingCart },
    { name: 'Finance', path: '/seller/finance', icon: DollarSign },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-[rgb(var(--c-bg-primary))] border-r border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-64`}
      >
        {/* Logo Section */}
        <div className="h-16 border-b border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] flex items-center justify-between px-4">
          <Link to="/seller/dashboard" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            {!isCollapsed && (
              <span className="text-lg font-bold text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))]">
                SellerHub
              </span>
            )}
          </Link>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-[rgb(var(--c-neutral-100))] dark:hover:bg-[rgb(var(--c-bg-secondary))] text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-[rgb(var(--c-primary-500))]/10 text-[rgb(var(--c-primary-500))]'
                  : 'text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-secondary))] hover:bg-[rgb(var(--c-neutral-100))] dark:hover:bg-[rgb(var(--c-bg-secondary))] hover:text-[rgb(var(--c-neutral-900))] dark:hover:text-[rgb(var(--c-text-primary))]'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.name : ''}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Seller Info Section (bottom) */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgb(var(--c-neutral-200))] dark:border-[rgb(var(--c-border-primary))] bg-[rgb(var(--c-neutral-50))] dark:bg-[rgb(var(--c-bg-secondary))]">
            <div className="text-xs text-[rgb(var(--c-neutral-600))] dark:text-[rgb(var(--c-text-tertiary))]">
              <p className="font-medium text-[rgb(var(--c-neutral-900))] dark:text-[rgb(var(--c-text-primary))]">Store Name</p>
              <p className="mt-0.5">Seller ID: #12345</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SellerSidebar;
