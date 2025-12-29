import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';
import SellerHeader from './SellerHeader';

const SellerDashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-neutral-100))] dark:bg-[rgb(var(--c-bg-tertiary))] transition-colors duration-200">
      {/* Sidebar */}
      <SellerSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar}
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div 
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Header */}
        <SellerHeader 
          onMenuClick={handleMenuClick}
          onToggleCollapse={handleToggleCollapse}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Main Content (Outlet) */}
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
