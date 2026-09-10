import React, { useState } from 'react';
import {
  CalendarCheck,
  X,
  Download,
  Trash2,
  Ship,
  Sparkles,
  PhoneCall,
  PlusCircle,
  Lock,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';

export const MyBookingsModal: React.FC = () => {
  const {
    confirmedBookings,
    cancelBooking,
    isBookingsModalOpen,
    setIsBookingsModalOpen,
    formatCurrency,
    currentUser,
    setIsAuthModalOpen,
  } = useBooking();

  const { showToast } = useToast();

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

  if (!isBookingsModalOpen) return null;

  const activeBooking =
    confirmedBookings.find((b) => b.bookingId === selectedBookingId) ||
    confirmedBookings[0] ||
    null;

  const handleBrowseFleet = () => {
    setIsBookingsModalOpen(false);
    const fleetEl = document.getElementById('fleet');
    if (fleetEl) fleetEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConfirmCancel = () => {
    if (!cancelTargetId) return;
    cancelBooking(cancelTargetId);
    showToast('info', 'Booking Cancelled', `Reservation #${cancelTargetId} has been cancelled.`);
    setCancelTargetId(null);
    setSelectedBookingId(null);
  };

  // Isolated Print: inject a temporary print-only window with just the boarding pass HTML
  const handlePrintPass = () => {
    if (!activeBooking) return;

    const printContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>YachtWay Boarding Pass — ${activeBooking.bookingId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', serif;
      background: #fff;
      color: #111;
      padding: 40px;
      max-width: 780px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #c9943a;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .brand { font-size: 28px; font-weight: 900; letter-spacing: 2px; color: #0a1219; }
    .brand span { color: #c9943a; }
    .pass-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #c9943a;
      text-align: right;
      font-weight: bold;
    }
    .pass-id { font-size: 18px; font-weight: bold; color: #0a1219; text-align: right; }
    .yacht-name {
      font-size: 30px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #0a1219;
      margin-bottom: 4px;
    }
    .yacht-sub { font-size: 13px; color: #555; margin-bottom: 28px; }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    .info-box {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      background: #f9f8f5;
    }
    .info-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: #888; font-weight: bold; display: block; margin-bottom: 4px; }
    .info-value { font-size: 13px; font-weight: bold; color: #0a1219; }
    .info-value.gold { color: #c9943a; }
    .section-title {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #888;
      font-weight: bold;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 6px;
    }
    .guest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
    .guest-field label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #888; display: block; }
    .guest-field span { font-size: 13px; font-weight: 600; color: #0a1219; }
    .price-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .price-table td { padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
    .price-table td:last-child { text-align: right; font-weight: 600; }
    .price-table tr.total td { border-top: 2px solid #c9943a; border-bottom: none; font-size: 16px; font-weight: 900; color: #c9943a; }
    .notice {
      background: #f9f6ef;
      border: 1px solid #c9943a;
      border-radius: 8px;
      padding: 14px;
      font-size: 12px;
      color: #555;
    }
    .notice strong { color: #0a1219; }
    .footer { margin-top: 28px; text-align: center; font-size: 10px; color: #aaa; letter-spacing: 1px; }
    @media print {
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">YACHT<span>WAY</span></div>
    <div>
      <div class="pass-title">Official Boarding Pass</div>
      <div class="pass-id">#${activeBooking.bookingId}</div>
    </div>
  </div>

  <div class="yacht-name">${activeBooking.yachtName}</div>
  <div class="yacht-sub">${activeBooking.yachtCategory} · ${activeBooking.destination}</div>

  <div class="grid-4">
    <div class="info-box">
      <span class="info-label">Charter Date</span>
      <span class="info-value">${activeBooking.startDate}</span>
    </div>
    <div class="info-box">
      <span class="info-label">Departure Time</span>
      <span class="info-value gold">${(activeBooking.timeSlot || '').split(' - ')[0] || activeBooking.timeSlot}</span>
    </div>
    <div class="info-box">
      <span class="info-label">Duration</span>
      <span class="info-value">${activeBooking.duration}</span>
    </div>
    <div class="info-box">
      <span class="info-label">Party Size</span>
      <span class="info-value">${activeBooking.guestCount} Guests</span>
    </div>
  </div>

  <div class="section-title">Guest Information</div>
  <div class="guest-grid">
    <div class="guest-field"><label>Client Name</label><span>${activeBooking.customerName}</span></div>
    <div class="guest-field"><label>Contact</label><span>${activeBooking.customerPhone || '—'}</span></div>
    <div class="guest-field"><label>Email</label><span>${activeBooking.customerEmail || '—'}</span></div>
  </div>
  ${activeBooking.specialRequests ? `<div style="margin-bottom:20px; font-size:12px; color:#555; font-style:italic; background:#f9f8f5; padding:10px; border-radius:6px; border:1px solid #eee;"><strong>Notes:</strong> ${activeBooking.specialRequests}</div>` : ''}

  <div class="section-title">Payment Summary</div>
  <table class="price-table">
    <tr><td>Base Charter Price</td><td>₹${activeBooking.basePrice.toLocaleString('en-IN')}</td></tr>
    ${activeBooking.addOnsAmount > 0 ? `<tr><td>Add-ons &amp; Celebrations</td><td>₹${activeBooking.addOnsAmount.toLocaleString('en-IN')}</td></tr>` : ''}
    <tr><td>GST (18%)</td><td>₹${activeBooking.taxAmount.toLocaleString('en-IN')}</td></tr>
    <tr><td>Payment Method</td><td style="color:#0c6cf2; font-weight: bold;">Razorpay (${activeBooking.paymentMethod || 'Demo Gateway'})</td></tr>
    ${activeBooking.razorpayPaymentId ? `<tr><td>Razorpay Transaction ID</td><td style="font-family: monospace; font-weight: bold;">${activeBooking.razorpayPaymentId}</td></tr>` : ''}
    <tr class="total"><td>Total Paid</td><td>₹${activeBooking.totalAmount.toLocaleString('en-IN')} (Confirmed)</td></tr>
  </table>

  <div class="notice">
    <strong>Boarding Instructions:</strong> Please report to <strong>Jetty No. 5, Gateway of India, Colaba, Mumbai 400001</strong> at least 15 minutes before departure. Carry this pass (printed or digital) and a valid photo ID. Captain contact: <strong>+91 98765 43210</strong>.
  </div>

  <div class="footer">YachtWay Mumbai · reservations@yachtway.in · yachtway.in · This is your official charter boarding pass.</div>
</body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#09121a] border border-[#d4a359]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0c1824] border-b border-[#1b2f42] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">
                BOOKING HISTORY
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-luxury uppercase tracking-wide">
                My Bookings {currentUser ? `(${confirmedBookings.length})` : ''}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleBrowseFleet}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Book Another</span>
              </button>
            )}

            <button
              onClick={() => setIsBookingsModalOpen(false)}
              className="p-2 rounded-full bg-[#081018] border border-[#1b2f42] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Auth Gate */}
          {!currentUser ? (
            <div className="py-16 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-[#d4a359]" />
              </div>
              <h3 className="text-xl font-bold font-luxury text-white">Sign In to View Your Bookings</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your booking history is tied to your account. Sign in to access your confirmed charters and boarding passes.
              </p>
              <button
                onClick={() => {
                  setIsBookingsModalOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#caa055] text-[#081018] font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Sign In
              </button>
            </div>
          ) : confirmedBookings.length > 0 && activeBooking ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Bookings List */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Reservations ({confirmedBookings.length})
                </span>

                <div className="space-y-2">
                  {confirmedBookings.map((b) => {
                    const isSelected = b.bookingId === activeBooking.bookingId;
                    return (
                      <div
                        key={b.bookingId}
                        onClick={() => setSelectedBookingId(b.bookingId)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#d4a359]/15 border-[#d4a359] shadow-md'
                            : 'bg-[#0b1622] border-[#1b2f42] hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-[#d4a359]">{b.bookingId}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                            {b.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase font-luxury truncate">{b.yachtName}</h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span>{b.startDate} · {b.timeSlot?.split(' - ')[0] || 'Sunset'}</span>
                          {b.razorpayPaymentId && (
                            <span className="text-[#388bfd] font-mono flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Paid</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Boarding Pass */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0b1622] border border-[#d4a359]/30 space-y-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1b2f42] gap-3">
                  <div>
                    <span className="text-[10px] text-[#d4a359] font-bold uppercase tracking-widest block">
                      Official Boarding Pass
                    </span>
                    <h3 className="text-xl font-bold font-luxury text-white">{activeBooking.yachtName}</h3>
                    <p className="text-xs text-slate-400">Pass ID: #{activeBooking.bookingId}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintPass}
                      className="px-3 py-1.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#081018] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Print Pass</span>
                    </button>
                    <button
                      onClick={() => setCancelTargetId(activeBooking.bookingId)}
                      className="px-3 py-1.5 rounded-lg bg-[#081018] border border-rose-900/50 hover:bg-rose-950/40 text-xs font-bold text-rose-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>

                {/* Cancel Confirmation Dialog Overlay */}
                {cancelTargetId && (
                  <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-3 text-xs text-rose-200">
                      <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <div>
                        <span className="font-bold block">Cancel Reservation #{cancelTargetId}?</span>
                        <span className="text-slate-300 text-[11px]">This action cannot be undone.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setCancelTargetId(null)}
                        className="px-3 py-1.5 rounded-lg bg-[#081018] border border-slate-700 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                      >
                        Keep Pass
                      </button>
                      <button
                        onClick={handleConfirmCancel}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Yes, Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#0e1e2e] border border-[#1b3044]">
                    <span className="text-slate-400 block text-[10px] uppercase">Charter Date</span>
                    <span className="font-bold text-white mt-0.5 block">{activeBooking.startDate}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0e1e2e] border border-[#1b3044]">
                    <span className="text-slate-400 block text-[10px] uppercase">Time Slot</span>
                    <span className="font-bold text-[#d4a359] mt-0.5 block truncate">{activeBooking.timeSlot || '04:30 PM'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0e1e2e] border border-[#1b3044]">
                    <span className="text-slate-400 block text-[10px] uppercase">Guests</span>
                    <span className="font-bold text-white mt-0.5 block">{activeBooking.guestCount} Guests</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0e1e2e] border border-[#1b3044]">
                    <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                    <span className="font-bold text-white mt-0.5 block">{activeBooking.duration || '1 Hour'}</span>
                  </div>
                </div>

                {/* Guest Info */}
                <div className="p-4 rounded-xl bg-[#0e1e2e] border border-[#1b3044] space-y-2 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Client Name</span>
                      <span className="font-bold text-white">{activeBooking.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Contact</span>
                      <span className="font-bold text-white">{activeBooking.customerPhone || '—'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Boarding Jetty</span>
                      <span className="font-bold text-white">{activeBooking.destination || 'Gateway of India'}</span>
                    </div>
                  </div>
                  {activeBooking.specialRequests && (
                    <div className="pt-2 border-t border-[#1b3044]">
                      <span className="text-slate-400 block text-[10px]">Special Notes</span>
                      <p className="text-slate-300 italic">{activeBooking.specialRequests}</p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-xl bg-[#0e1e2e] border border-[#1b3044] space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Charter Price</span>
                    <span className="font-bold text-white">{formatCurrency(activeBooking.basePrice)}</span>
                  </div>
                  {activeBooking.addOnsAmount > 0 && (
                    <div className="flex justify-between text-[#d4a359]">
                      <span>Add-ons</span>
                      <span className="font-bold">+{formatCurrency(activeBooking.addOnsAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-300">
                    <span>GST (18%)</span>
                    <span className="font-bold text-white">{formatCurrency(activeBooking.taxAmount)}</span>
                  </div>

                  {/* Razorpay Gateway Status */}
                  <div className="py-2 px-3 rounded-lg bg-[#071a2e] border border-[#13375c] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#0c6cf2] flex items-center justify-center text-white font-black text-[10px] italic">
                        R
                      </div>
                      <div>
                        <span className="text-white font-bold block text-[11px]">Razorpay Payment Verified</span>
                        <span className="text-[10px] text-slate-400">{activeBooking.paymentMethod || 'Demo Gateway'}</span>
                      </div>
                    </div>
                    {activeBooking.razorpayPaymentId && (
                      <span className="font-mono text-[10px] font-bold text-[#388bfd]">
                        {activeBooking.razorpayPaymentId}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#1b3044] flex justify-between items-baseline">
                    <span className="font-bold text-white">Total Confirmed & Paid</span>
                    <span className="text-lg font-bold font-luxury text-emerald-400">{formatCurrency(activeBooking.totalAmount)}</span>
                  </div>
                </div>

                {/* Captain Contact */}
                <div className="p-3 rounded-lg bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#d4a359] flex-shrink-0" />
                    <span className="text-slate-300">Captain: +91 98765 43210 · Jetty No. 5</span>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="px-3 py-1 rounded bg-[#d4a359] text-[#0a1219] font-bold text-[10px] uppercase"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <Ship className="w-12 h-12 text-[#d4a359] mx-auto" />
              <h3 className="text-xl font-bold font-luxury text-white">No Bookings Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore our fleet and book your first yacht charter at Gateway of India.
              </p>
              <button
                onClick={handleBrowseFleet}
                className="px-6 py-2.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Explore Yachts
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
