
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;