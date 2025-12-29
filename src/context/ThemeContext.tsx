import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isThemeToggleEnabled: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define public routes that should always use light mode
const PUBLIC_ROUTE_PATTERNS = [
  '/',
  '/register',
  '/login',
  '/login-seller',
  '/forget-password',
  '/pricing',
  '/why-sell',
  '/contact',
  '/products',
  '/product'
];

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTE_PATTERNS.some(pattern => 
    pathname === pattern || (pattern !== '/' && pathname.startsWith(pattern + '/'))
  );
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [isThemeToggleEnabled, setIsThemeToggleEnabled] = useState(false);

  // Monitor location changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleLocationChange);
    
    // Listen for pushState/replaceState
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Apply theme logic based on route - centralized DOM manipulation
  useEffect(() => {
    const root = document.documentElement;
    const isPublic = isPublicRoute(currentPath);
    
    setIsThemeToggleEnabled(!isPublic);
    
    if (isPublic) {
      // Public routes: Force light mode
      root.classList.remove('dark');
      setThemeState('light');
    } else {
      // Dashboard routes: Use saved preference or default to light
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const dashboardTheme = savedTheme || 'light';
      
      if (dashboardTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      setThemeState(dashboardTheme);
      localStorage.setItem('theme', dashboardTheme);
    }
  }, [currentPath]);

  // Save theme to localStorage when changed (only for dashboard routes)
  useEffect(() => {
    if (!isPublicRoute(currentPath)) {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, currentPath]);

  const toggleTheme = () => {
    // Only allow theme toggle on dashboard routes
    if (isPublicRoute(currentPath)) {
      return;
    }
    
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    // Only allow setting theme on dashboard routes
    if (isPublicRoute(currentPath)) {
      return;
    }
    
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isThemeToggleEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
