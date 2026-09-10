import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronLeft,
  Timer,
  AlertCircle,
  Ship,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Ticket,
  Lock,
  CreditCard,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { VIP_ADDONS } from '../../data/addOns';
import { YACHTS_DATA } from '../../data/yachts';
import { ConfirmedBooking } from '../../types/yacht';
import { RazorpayModal, PaymentSuccessResult } from '../payment/RazorpayModal';

export const BookingModal: React.FC = () => {
  const {
    activeBookingYacht,
    bookingInitialParams,
    closeBookingModal,
    formatCurrency,
    addConfirmedBooking,
    setIsBookingsModalOpen,
    currentUser,
    setIsAuthModalOpen,
  } = useBooking();

  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<ConfirmedBooking | null>(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [pendingBookingRef, setPendingBookingRef] = useState<string>('');

  // Form State initialized from bookingInitialParams
  const [selectedYachtId, setSelectedYachtId] = useState<string>(activeBookingYacht?.id || YACHTS_DATA[0].id);
  const [destination, setDestination] = useState<string>(bookingInitialParams.destination || 'Gateway of India');
  const [startDate, setStartDate] = useState<string>(bookingInitialParams.startDate);
  const [timeSlot, setTimeSlot] = useState<string>(bookingInitialParams.timeSlot);
  const [duration, setDuration] = useState<string>(bookingInitialParams.duration);
  const [guestCount, setGuestCount] = useState<number>(bookingInitialParams.guestCount || 2);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Guest Details — pre-filled from logged-in user
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill guest details from currentUser
  useEffect(() => {
    if (currentUser) {
      setGuestName(currentUser.name || '');
      setGuestEmail(currentUser.email || '');
      setGuestPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeBookingYacht) {
      setSelectedYachtId(activeBookingYacht.id);
    }
  }, [activeBookingYacht]);

  useEffect(() => {
    if (bookingInitialParams) {
      if (bookingInitialParams.destination) setDestination(bookingInitialParams.destination);
      if (bookingInitialParams.startDate) setStartDate(bookingInitialParams.startDate);
      if (bookingInitialParams.timeSlot) setTimeSlot(bookingInitialParams.timeSlot);
      if (bookingInitialParams.guestCount) setGuestCount(bookingInitialParams.guestCount);
      if (bookingInitialParams.duration) setDuration(bookingInitialParams.duration);
    }
  }, [bookingInitialParams]);

  const currentYacht = YACHTS_DATA.find((y) => y.id === selectedYachtId) || activeBookingYacht || YACHTS_DATA[0];

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pricing calculations
  const durationHours = useMemo(() => {
    if (duration.includes('Full Day')) return 8;
    const match = duration.match(/\d+/);
    return match ? parseInt(match[0]) : 1;
  }, [duration]);

  const basePrice = useMemo(() => {
    if (currentYacht.pricePer3Hours && durationHours === 3) {
      return currentYacht.pricePer3Hours;
    }
    if (currentYacht.pricePerHour) {
      return currentYacht.pricePerHour * durationHours;
    }
    if (currentYacht.pricePerPerson) {
      return currentYacht.pricePerPerson * guestCount * durationHours;
    }
    return (currentYacht.pricePerDay / 8) * durationHours;
  }, [currentYacht, durationHours, guestCount]);

  const addOnsAmount = useMemo(() => {
    let sum = 0;
    VIP_ADDONS.forEach((addon) => {
      if (selectedAddOnIds.includes(addon.id)) {
        if (addon.priceType === 'per_person') {
          sum += addon.price * guestCount;
        } else if (addon.priceType === 'per_hour') {
          sum += addon.price * durationHours;
        } else {
          sum += addon.price;
        }
      }
    });
    return sum;
  }, [selectedAddOnIds, guestCount, durationHours]);

  const taxAmount = Math.round((basePrice + addOnsAmount) * 0.18); // 18% GST standard
  const totalAmount = basePrice + addOnsAmount + taxAmount;

  if (!activeBookingYacht) return null;

  const handleInitiatePayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!guestName.trim()) {
      setFormError('Please enter your full name.');
      setStep(3);
      return;
    }

    if (!guestPhone.trim() || guestPhone.length < 8) {
      setFormError('Please enter a valid phone/WhatsApp number for booking confirmation.');
      setStep(3);
      return;
    }

    setFormError(null);
    const bookingId = `YW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setPendingBookingRef(bookingId);
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = (paymentResult: PaymentSuccessResult) => {
    setIsRazorpayOpen(false);
    setIsSubmitting(true);

    const bookingId = pendingBookingRef || `YW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: ConfirmedBooking = {
      bookingId,
      yachtId: currentYacht.id,
      yachtName: currentYacht.name,
      yachtImage: currentYacht.featuredImage,
      yachtCategory: currentYacht.category,
      destination,
      startDate,
      timeSlot,
      duration,
      guestCount,
      selectedAddOns: selectedAddOnIds,
      customerName: guestName,
      customerEmail: guestEmail,
      customerPhone: guestPhone,
      specialRequests,
      basePrice,
      taxAmount,
      addOnsAmount,
      totalAmount,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      paymentStatus: 'Paid',
      paymentMethod: paymentResult.method,
      razorpayPaymentId: paymentResult.paymentId,
      razorpayOrderId: paymentResult.orderId,
      paidAt: paymentResult.timestamp,
    };

    setTimeout(() => {
      addConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setConfirmedBookingDetails(newBooking);

      showToast(
        'success',
        'Payment Verified & Charter Confirmed! 🎉',
        `Razorpay ID: ${paymentResult.paymentId}`
      );

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#d4a359', '#ffffff', '#caa055', '#0c6cf2'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 400);
  };

  // If modal is opened without a user session, redirect to auth
  if (!activeBookingYacht) return null;
  if (!currentUser) {
    closeBookingModal();
    setIsAuthModalOpen(true);
    return null;
  }

  // Render Confirmation Success Screen when booking is placed
  if (confirmedBookingDetails) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
        <div className="relative w-full max-w-lg bg-[#09121a] border border-[#d4a359]/50 rounded-2xl p-8 shadow-2xl text-center space-y-6">
          {/* Confetti Glow Header */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 gold-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#d4a359] uppercase tracking-[0.25em] block">
              RESERVATION CONFIRMED
            </span>
            <h2 className="text-2xl font-black font-luxury text-white uppercase">
              Your Charter is Locked In!
            </h2>
            <p className="text-xs text-slate-400">
              Pass Reference ID: <span className="text-[#d4a359] font-bold">#{confirmedBookingDetails.bookingId}</span>
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 rounded-xl bg-[#0d1c2b] border border-[#1b2f42] text-left text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Vessel:</span>
              <span className="font-bold text-white font-luxury">{confirmedBookingDetails.yachtName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Charter Date:</span>
              <span className="font-bold text-white">{confirmedBookingDetails.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time Slot:</span>
              <span className="font-bold text-[#d4a359]">{confirmedBookingDetails.timeSlot}</span>
            </div>

            {/* Razorpay Verified Badge */}
            {confirmedBookingDetails.razorpayPaymentId && (
              <div className="flex justify-between items-center py-1.5 px-2.5 rounded-lg bg-[#0c6cf2]/10 border border-[#0c6cf2]/30">
                <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0c6cf2]" />
                  <span>Razorpay ID:</span>
                </span>
                <span className="font-mono font-bold text-[#388bfd] text-xs">
                  {confirmedBookingDetails.razorpayPaymentId}
                </span>
              </div>
            )}

            <div className="flex justify-between pt-2 border-t border-[#1b2f42]">
              <span className="font-bold text-white">Payment Status:</span>
              <span className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Paid ({confirmedBookingDetails.paymentMethod || 'Razorpay'})</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-slate-400">Total Confirmed:</span>
              <span className="font-bold text-[#d4a359] text-sm font-luxury">
                {formatCurrency(confirmedBookingDetails.totalAmount)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                setConfirmedBookingDetails(null);
                closeBookingModal();
                setIsBookingsModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[#d4a359] hover:bg-[#caa055] text-[#081018] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Ticket className="w-4 h-4" />
              <span>View Official Boarding Pass</span>
            </button>
            <button
              onClick={() => {
                setConfirmedBookingDetails(null);
                closeBookingModal();
              }}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#0d1c2b] border border-[#1b2f42] hover:border-slate-500 text-slate-300 font-bold text-xs uppercase cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#09121a] border border-[#d4a359]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0c1824] border-b border-[#1b2f42] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#d4a359]" />
            </div>
            <div>
              <span className="text-[10px] text-[#d4a359] font-bold uppercase tracking-widest block">
                YACHTWAY RESERVATION
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-luxury uppercase tracking-wide">
                {currentYacht.name} ({currentYacht.category})
              </h3>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full bg-[#081018] border border-[#1b2f42] text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Indicator */}
        <div className="px-6 py-3 bg-[#0a1420] border-b border-[#1b2f42] flex items-center justify-between text-xs font-semibold">
          {[
            { num: 1, label: '1. Yacht, Date & Time' },
            { num: 2, label: '2. Celebration Add-ons' },
            { num: 3, label: '3. Summary & Confirm' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num as any)}
              className={`flex items-center gap-2 transition-all cursor-pointer py-1 px-3 rounded-lg ${
                step === s.num
                  ? 'text-[#d4a359] font-bold bg-[#d4a359]/10'
                  : step > s.num
                  ? 'text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === s.num
                    ? 'bg-[#d4a359] text-[#0a1219]'
                    : step > s.num
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#081018] border border-[#1b2f42] text-slate-500'
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className="hidden sm:inline uppercase text-[10px] tracking-wider">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Validation Error Banner */}
        {formError && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* STEP 1: Yacht, Date, Time & Parameters */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Yacht Picker */}
              <div>
                <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-[#d4a359]" />
                  <span>Choose Your Yacht</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {YACHTS_DATA.map((y) => (
                    <div
                      key={y.id}
                      onClick={() => setSelectedYachtId(y.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedYachtId === y.id
                          ? 'bg-[#d4a359]/15 border-[#d4a359] shadow-lg'
                          : 'bg-[#0b1622] border-[#1b2f42] hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-white uppercase">{y.name}</h4>
                          <span className="text-[10px] text-[#d4a359] font-bold">{y.category}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{y.tagline}</p>
                      </div>
                      <span className="text-xs font-bold text-[#d4a359] mt-2 block">
                        {y.priceDisplay}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DATE & TIME (SIDE-BY-SIDE AS REQUESTED) */}
              <div className="p-4 rounded-xl bg-[#0b1622] border border-[#1b2f42] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4a359]" />
                  <span>Schedule Departure Date & Time Slot</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Calendar / Date Picker */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Date (Calendar)</span>
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359] cursor-pointer"
                    />
                  </div>

                  {/* TIME COLUMN BESIDE CALENDAR */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Time Slot (Select Time)</span>
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359] cursor-pointer"
                    >
                      <option value="07:00 AM - Sunrise Sail">07:00 AM - Sunrise Sail</option>
                      <option value="10:00 AM - Morning Cruise">10:00 AM - Morning Cruise</option>
                      <option value="02:00 PM - Afternoon Sail">02:00 PM - Afternoon Sail</option>
                      <option value="04:30 PM - Sunset Cruise (Popular)">04:30 PM - Sunset Cruise (Popular)</option>
                      <option value="06:30 PM - Twilight Special">06:30 PM - Twilight Special</option>
                      <option value="08:00 PM - Starlight Dinner">08:00 PM - Starlight Dinner</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Destination, Duration & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-[#0b1622] border border-[#1b2f42] space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span>Destination</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="Gateway of India">Gateway of India</option>
                    <option value="Alibaug">Alibaug</option>
                    <option value="Elephanta Island">Elephanta Island</option>
                    <option value="Mandwa Beach">Mandwa Beach</option>
                    <option value="Mumbai Harbour Coastline">Mumbai Harbour Coastline</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0b1622] border border-[#1b2f42] space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span>Duration</span>
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="1 Hour">1 Hour</option>
                    <option value="2 Hours">2 Hours</option>
                    <option value="3 Hours">3 Hours</option>
                    <option value="4 Hours">4 Hours</option>
                    <option value="Full Day (8 Hours)">Full Day (8 Hours)</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0b1622] border border-[#1b2f42] space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span>Guests (Max {currentYacht.guestsMax})</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={currentYacht.guestsMax}
                    value={guestCount}
                    onChange={(e) =>
                      setGuestCount(Math.min(currentYacht.guestsMax, Math.max(1, Number(e.target.value))))
                    }
                    className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Celebration Add-ons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white font-luxury uppercase tracking-wider mb-1">
                  Enhance Your Yacht Experience
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Select optional decorations, cakes, live music, or professional photographers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {VIP_ADDONS.map((addon) => {
                  const isSelected = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[#d4a359]/15 border-[#d4a359] shadow-md'
                          : 'bg-[#0b1622] border-[#1b2f42] hover:border-slate-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#d4a359] text-[#0a1219] font-bold' : 'border border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-white">{addon.name}</h5>
                          <span className="text-xs font-bold font-luxury text-[#d4a359]">
                            +{formatCurrency(addon.price)} {addon.priceType === 'per_person' ? '/ person' : ''}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{addon.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Summary, Guest Details & Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cost Breakdown */}
                <div className="p-5 rounded-xl bg-[#0b1622] border border-[#d4a359]/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#1b2f42] pb-2 flex items-center justify-between">
                      <span>Booking Summary</span>
                      <span className="text-[#d4a359]">{currentYacht.name}</span>
                    </h5>

                    <div className="space-y-2 text-xs mt-3 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Destination:</span>
                        <span className="font-bold text-white">{destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Date & Time:</span>
                        <span className="font-bold text-[#d4a359]">
                          {startDate} @ {timeSlot.split(' - ')[0]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration & Guests:</span>
                        <span className="font-bold text-white">
                          {duration} • {guestCount} Guests
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#1b2f42]">
                        <span>Base Yacht Charter:</span>
                        <span className="font-bold text-white">{formatCurrency(basePrice)}</span>
                      </div>
                      {addOnsAmount > 0 && (
                        <div className="flex justify-between text-[#d4a359]">
                          <span>Selected Add-ons ({selectedAddOnIds.length}):</span>
                          <span className="font-bold">+{formatCurrency(addOnsAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-400">
                        <span>GST & Marine Safety (18%):</span>
                        <span className="font-bold text-white">{formatCurrency(taxAmount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#d4a359]/40 flex items-baseline justify-between mt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Total Amount</span>
                      <span className="text-[11px] text-slate-400">All inclusive</span>
                    </div>
                    <span className="text-2xl font-black font-luxury text-[#d4a359]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Primary Guest Info */}
                <div className="p-5 rounded-xl bg-[#0b1622] border border-[#1b2f42] space-y-3">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#1b2f42] pb-2">
                    Primary Guest Details
                  </h5>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#d4a359]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Singhania"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#d4a359]" />
                      <span>Phone / WhatsApp Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98201 54321"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#d4a359]" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      placeholder="guest@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Special Notes / Custom Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Birthday cake name inscription, flower preference..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  {/* Razorpay Gateway Trust Card */}
                  <div className="p-3 rounded-xl bg-[#07192d] border border-[#133c69] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#0c6cf2] flex items-center justify-center text-white font-black text-sm italic font-sans shadow-md">
                        R
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-white text-[11px]">Razorpay Payment Gateway</span>
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase bg-[#0c6cf2]/20 text-[#388bfd] border border-[#0c6cf2]/30">
                            Demo Active
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">UPI QR · Cards · Netbanking · Wallets</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-[#0c1824] border-t border-[#1b2f42] flex items-center justify-between flex-shrink-0">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 rounded-lg bg-[#081018] border border-slate-700 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {step < 3 ? (
              <button
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="px-6 py-2.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleInitiatePayment()}
                disabled={isSubmitting}
                className="px-6 sm:px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#0c6cf2] via-[#1a73e8] to-[#d4a359] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transform hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5 text-white" />
                <span>{isSubmitting ? 'Confirming...' : `Pay ${formatCurrency(totalAmount)} via Razorpay`}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Demo Razorpay Payment Gateway Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amount={totalAmount}
        yachtName={currentYacht.name}
        bookingRef={pendingBookingRef || 'YW-PENDING'}
        customerName={guestName}
        customerEmail={guestEmail}
        customerPhone={guestPhone}
        onSuccess={handlePaymentSuccess}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};
