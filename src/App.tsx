
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[rgb(var(--c-neutral-100))]">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingCalculator />} />
            <Route path="/why-sell" element={<WhySellPage />} />
            <Route path='/login-seller' element={< Login/>}/>
            <Route path='/forget-password' element={<ForgotPassword/>}/>
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.main>
        <Footer />
        <MobileBottomBar />
      </div>
    </Router>
  );
}

export default App;