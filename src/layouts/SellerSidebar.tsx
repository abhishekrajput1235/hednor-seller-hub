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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-[rgb(var(--c-neutral-200))] z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-64`}
      >
        {/* Logo Section */}
        <div className="h-16 border-b border-[rgb(var(--c-neutral-200))] flex items-center justify-between px-4">
          <Link to="/seller/dashboard" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            {!isCollapsed && (
              <span className="text-lg font-bold text-[rgb(var(--c-neutral-900))]">
                SellerHub
              </span>
            )}
          </Link>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-[rgb(var(--c-neutral-100))] text-[rgb(var(--c-neutral-600))]"
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
                  : 'text-[rgb(var(--c-neutral-600))] hover:bg-[rgb(var(--c-neutral-100))] hover:text-[rgb(var(--c-neutral-900))]'
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
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgb(var(--c-neutral-200))] bg-[rgb(var(--c-neutral-50))]">
            <div className="text-xs text-[rgb(var(--c-neutral-600))]">
              <p className="font-medium text-[rgb(var(--c-neutral-900))]">Store Name</p>
              <p className="mt-0.5">Seller ID: #12345</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SellerSidebar;
