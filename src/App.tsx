import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { FleetShowcase } from './components/home/FleetShowcase';
import { YachtCategories } from './components/home/YachtCategories';
import { DestinationsSection } from './components/home/DestinationsSection';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';
import { SplashScreen } from './components/layout/SplashScreen';
import { YachtDetailModal } from './components/fleet/YachtDetailModal';
import { BookingModal } from './components/booking/BookingModal';
import { ComparisonDrawer } from './components/comparison/ComparisonDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { MyBookingsModal } from './components/bookings/MyBookingsModal';
import { CustomInquiryModal } from './components/concierge/CustomInquiryModal';
import { AuthModal } from './components/modals/AuthModal';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060c12] text-slate-100 flex flex-col selection:bg-[#d4a359] selection:text-[#060c12]">
      {/* Loading Splash Screen */}
      <SplashScreen />

      {/* Sticky Luxury Navigation: ⚓ YACHTWAY (Home, Yachts, Booking, Contact) */}
      <Navbar />

      {/* Main Content Sections with Zero Redundancy */}
      <main className="flex-1">
        {/* 1. Immersive Hero Section & Quick Charter Search */}
        <Hero />

        {/* 2. Unified Exclusive Charter Fleet Showcase */}
        <FleetShowcase />

        {/* 3. Yacht Categories Explorer */}
        <YachtCategories />

        {/* 4. Popular Mumbai Cruising Destinations */}
        <DestinationsSection />

        {/* 5. Luxury Standards & Certified Captains */}
        <WhyChooseUs />

        {/* 6. Contact & VIP Concierge Inquiries */}
        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Back to Top Button matching screenshots */}
      <BackToTop />

      {/* Interactive Modals & Drawers */}
      <YachtDetailModal />
      <BookingModal />
      <ComparisonDrawer />
      <WishlistDrawer />
      <MyBookingsModal />
      <CustomInquiryModal />
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </ToastProvider>
  );
};

export default App;
