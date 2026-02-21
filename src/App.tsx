import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentProvider } from './context/ContentContext';

// Main Website Sections
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import TrustBar from './sections/TrustBar';
import HowItWorks from './sections/HowItWorks';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import WhoWeServe from './sections/WhoWeServe';
import Reviews from './sections/Reviews';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main Website Component
const MainWebsite = () => {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Services />
        <WhyChooseUs />
        <WhoWeServe />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainWebsite />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;
