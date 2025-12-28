
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PricingCalculator from './pages/PricingCalculator';
import WhySellPage from './pages/WhySellPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword'
import MobileBottomBar from './components/MobileBottomBar';
import Login from './pages/Login';
import SellerDashboardLayout from './layouts/SellerDashboardLayout';
import CatalogPage from './pages/CatalogPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import FinancePage from './pages/FinancePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with Navbar and Footer */}
        <Route path="/" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
        <Route path="/register" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterPage />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
        <Route path="/pricing" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <PricingCalculator />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
        <Route path="/why-sell" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <WhySellPage />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
        <Route path="/login-seller" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Login />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
        <Route path="/forget-password" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ForgotPassword />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />

        {/* Seller Dashboard routes with SellerDashboardLayout */}
        <Route path="/seller" element={<SellerDashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="finance" element={<FinancePage />} />
        </Route>

        {/* Legacy route - redirect old dashboard to new seller dashboard */}
        <Route path="/dashboard" element={
          <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardPage />
            </motion.main>
            <Footer />
            <MobileBottomBar />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;