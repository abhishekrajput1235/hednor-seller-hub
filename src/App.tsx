
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PricingCalculator from './pages/PricingCalculator';
import WhySellPage from './pages/WhySellPage';
import ContactPage from './pages/ContactPage';
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login';
import PublicLayout from './layouts/PublicLayout';
import SellerDashboardLayout from './layouts/SellerDashboardLayout';
import CatalogPage from './pages/CatalogPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import FinancePage from './pages/FinancePage';
import DashboardLayout from './layouts/DashboardLayout';
import ProfilePage from './pages/ProfilePage';

// Vendor Product Pages
import VendorProducts from './pages/vendor/VendorProducts';
import ProductForm from './pages/vendor/ProductForm';
import ProductPreview from './pages/vendor/ProductPreview';
import ProductImport from './pages/vendor/ProductImport';

// Vendor Payment Pages
import {
  VendorPaymentDashboard,
  VendorPayouts,
  VendorTransactions,
  VendorPaymentMethods,
  VendorCommission,
  VendorInvoices
} from './pages/vendor/payments';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public routes with Navbar and Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<PricingCalculator />} />
            <Route path="/why-sell" element={<WhySellPage />} />
            <Route path="/login-seller" element={<Login />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Dashboard Route with separate DashboardLayout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
          </Route>

          {/* Seller Dashboard routes with SellerDashboardLayout */}
          <Route path="/seller" element={<SellerDashboardLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="profile" element={<ProfilePage />} />

            {/* Vendor Product Routes */}
            <Route path="products" element={<VendorProducts />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="products/preview/:id" element={<ProductPreview />} />
            <Route path="products/import" element={<ProductImport />} />

            {/* Vendor Payment Routes */}
            <Route path="payments" element={<VendorPaymentDashboard />} />
            <Route path="payments/payouts" element={<VendorPayouts />} />
            <Route path="payments/transactions" element={<VendorTransactions />} />
            <Route path="payments/methods" element={<VendorPaymentMethods />} />
            <Route path="payments/commission" element={<VendorCommission />} />
            <Route path="payments/invoices" element={<VendorInvoices />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;