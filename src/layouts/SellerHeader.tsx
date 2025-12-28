import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User, Settings, LogOut, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface SellerHeaderProps {
  onMenuClick: () => void;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
}

const SellerHeader: React.FC<SellerHeaderProps> = ({ onMenuClick, onToggleCollapse, isCollapsed }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New order #1234 received', time: '5 min ago', unread: true },
    { id: 2, message: 'Low stock alert: Product A', time: '1 hour ago', unread: true },
    { id: 3, message: 'Payment processed successfully', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-[rgb(var(--c-neutral-200))] flex items-center justify-between px-4 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-[rgb(var(--c-neutral-100))] text-[rgb(var(--c-neutral-600))]"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:block p-2 rounded-md hover:bg-[rgb(var(--c-neutral-100))] text-[rgb(var(--c-neutral-600))]"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <ChevronsLeft className="h-5 w-5" />
          )}
        </button>

        {/* Page Title / Breadcrumb */}
        <div>
          <h1 className="text-base lg:text-lg font-semibold text-[rgb(var(--c-neutral-900))]">
            Seller Dashboard
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="relative p-2 rounded-md hover:bg-[rgb(var(--c-neutral-100))] text-[rgb(var(--c-neutral-600))] transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-[rgb(var(--c-error-500))] text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-[rgb(var(--c-neutral-200))] z-50">
                <div className="p-4 border-b border-[rgb(var(--c-neutral-200))]">
                  <h3 className="font-semibold text-[rgb(var(--c-neutral-900))]">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-[rgb(var(--c-neutral-200))] hover:bg-[rgb(var(--c-neutral-50))] transition-colors ${
                        notification.unread ? 'bg-[rgb(var(--c-primary-500))]/5' : ''
                      }`}
                    >
                      <p className="text-sm text-[rgb(var(--c-neutral-900))]">{notification.message}</p>
                      <p className="text-xs text-[rgb(var(--c-neutral-500))] mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-[rgb(var(--c-neutral-200))]">
                  <button className="text-sm text-[rgb(var(--c-primary-500))] hover:underline font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-[rgb(var(--c-neutral-100))] transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-[rgb(var(--c-primary-500))]/20 flex items-center justify-center">
              <User className="h-4 w-4 text-[rgb(var(--c-primary-500))]" />
            </div>
            <span className="hidden md:block text-sm font-medium text-[rgb(var(--c-neutral-900))]">
              My Store
            </span>
            <ChevronDown className="h-4 w-4 text-[rgb(var(--c-neutral-600))]" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[rgb(var(--c-neutral-200))] z-50">
                <div className="p-4 border-b border-[rgb(var(--c-neutral-200))]">
                  <p className="font-semibold text-[rgb(var(--c-neutral-900))]">My Store</p>
                  <p className="text-xs text-[rgb(var(--c-neutral-600))] mt-0.5">seller@example.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[rgb(var(--c-neutral-100))] text-[rgb(var(--c-neutral-700))] transition-colors">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[rgb(var(--c-neutral-100))] text-[rgb(var(--c-neutral-700))] transition-colors">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>
                <div className="p-2 border-t border-[rgb(var(--c-neutral-200))]">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[rgb(var(--c-error-500))]/10 text-[rgb(var(--c-error-500))] transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
