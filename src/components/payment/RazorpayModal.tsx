import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Lock,
  Smartphone,
  Sparkles,
  ChevronRight,
  Clock,
  ExternalLink,
} from 'lucide-react';

export interface PaymentSuccessResult {
  paymentId: string;
  orderId: string;
  method: string;
  timestamp: string;
}

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number; // in INR
  yachtName: string;
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (result: PaymentSuccessResult) => void;
  formatCurrency: (amount: number) => string;
}

type PaymentTab = 'upi' | 'card' | 'netbanking' | 'wallet';

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  amount,
  yachtName,
  bookingRef,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  formatCurrency,
}) => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('123456');

  // Form states for Card
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(customerName || '');

  // Form states for UPI
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');

  // Form states for Netbanking
  const [selectedBank, setSelectedBank] = useState<string>('HDFC');

  // Form states for Wallets
  const [selectedWallet, setSelectedWallet] = useState<string>('paytm');

  // Countdown timer for QR code
  const [qrTimer, setQrTimer] = useState(720); // 12 minutes

  useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
      setShowOtpModal(false);
      setPaymentError(null);
      return;
    }

    setCardName(customerName || '');
    setQrTimer(720);

    const timer = setInterval(() => {
      setQrTimer((prev) => (prev > 0 ? prev - 1 : 720));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, customerName]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate random Razorpay Payment ID
  const generatePaymentId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let result = 'pay_';
    for (let i = 0; i < 14; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleAutofillTestCard = () => {
    setCardNumber('4012 0000 0000 0002');
    setCardExpiry('12/28');
    setCardCvv('123');
    setCardName(customerName || 'Test Mariner');
    setPaymentError(null);
  };

  const formatCardNumberDisplay = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumberDisplay(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardExpiry(val);
  };

  // Execute payment completion
  const executePayment = (methodName: string) => {
    setPaymentError(null);
    setIsProcessing(true);
    setProcessingStatus('Connecting securely to Razorpay gateway...');

    setTimeout(() => {
      setProcessingStatus('Authorizing payment with issuing institution...');
      setTimeout(() => {
        setProcessingStatus('Payment captured successfully!');
        setTimeout(() => {
          setIsProcessing(false);
          setShowOtpModal(false);
          const paymentId = generatePaymentId();
          const orderId = `order_${bookingRef.replace(/-/g, '_')}`;
          onSuccess({
            paymentId,
            orderId,
            method: methodName,
            timestamp: new Date().toISOString(),
          });
        }, 600);
      }, 700);
    }, 600);
  };

  // Trigger from Card Tab
  const handleCardPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      setPaymentError('Please enter a valid 16-digit card number or click Autofill Demo Card.');
      return;
    }
    if (!cardExpiry || cardExpiry.length < 5) {
      setPaymentError('Please enter card expiry in MM/YY format.');
      return;
    }
    if (!cardCvv || cardCvv.length < 3) {
      setPaymentError('Please enter a valid 3-digit CVV.');
      return;
    }
    // Launch bank 3D secure OTP modal for realism
    setShowOtpModal(true);
  };

  // Trigger failure simulation
  const handleSimulateFailure = () => {
    setPaymentError(null);
    setIsProcessing(true);
    setProcessingStatus('Processing payment test transaction...');

    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpModal(false);
      setPaymentError(
        'Transaction declined by bank: [BAD_REQUEST] Insufficient demo funds or test cancellation. You can retry anytime.'
      );
    }, 1000);
  };

  // Launch official Razorpay standard checkout if environment key is provided
  const handleOfficialRazorpaySdk = () => {
    const razorpayKey = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey || razorpayKey === 'rzp_test_your_key_here') {
      alert(
        'Note: No live/test VITE_RAZORPAY_KEY_ID was configured in .env. Falling back to the instant Razorpay Demo Gateway modal!'
      );
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const options = {
        key: razorpayKey,
        amount: Math.round(amount * 100), // In paise
        currency: 'INR',
        name: 'YachtWay Mumbai',
        description: `Charter Booking: ${yachtName}`,
        image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=128&q=80',
        handler: function (response: any) {
          onSuccess({
            paymentId: response.razorpay_payment_id || generatePaymentId(),
            orderId: response.razorpay_order_id || `order_${bookingRef}`,
            method: 'Razorpay Live/Test SDK',
            timestamp: new Date().toISOString(),
          });
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#0c2340',
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setPaymentError(resp.error?.description || 'Razorpay checkout failed');
      });
      rzp.open();
    };
    script.onerror = () => {
      setPaymentError('Failed to load Razorpay Checkout script from checkout.razorpay.com');
    };
    document.body.appendChild(script);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      {/* Razorpay Checkout Container */}
      <div className="relative w-full max-w-2xl bg-[#081524] border border-[#1b3b5f] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-slate-100">
        {/* Top Official Razorpay Header */}
        <div className="bg-[#051322] px-6 py-4 border-b border-[#132c4a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Razorpay Brand Badge */}
            <div className="w-9 h-9 rounded-xl bg-[#0c6cf2] flex items-center justify-center shadow-lg shadow-[#0c6cf2]/30">
              <span className="text-white font-black text-lg tracking-tighter italic font-sans">R</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-sm tracking-wide">Razorpay</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  Demo Gateway
                </span>
              </div>
              <p className="text-[11px] text-slate-400">YachtWay Mumbai Charters · Secure Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit SSL</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0b1d31] hover:bg-[#122b46] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Details Bar */}
        <div className="bg-[#0b1d31] px-6 py-3 border-b border-[#142e4c] flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Booking Vessel</span>
            <span className="text-xs font-bold text-white font-luxury">{yachtName}</span>
            <span className="text-[10px] text-slate-400 ml-2">({bookingRef})</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Amount Payable</span>
            <span className="text-lg font-black font-luxury text-[#d4a359]">{formatCurrency(amount)}</span>
          </div>
        </div>

        {/* Error Alert Banner */}
        {paymentError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5 animate-fade-in">
            <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{paymentError}</p>
            </div>
            <button
              onClick={() => setPaymentError(null)}
              className="text-rose-400 hover:text-rose-200 text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Body with Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          {/* Left Navigation: Payment Options */}
          <div className="md:col-span-4 bg-[#061220] border-r border-[#132c4a] p-3 space-y-1.5 flex md:flex-col overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 hidden md:block">
              Payment Method
            </span>

            {[
              { id: 'upi', label: 'UPI / QR Code', icon: QrCode, badge: 'Popular' },
              { id: 'card', label: 'Card (Credit/Debit)', icon: CreditCard, badge: 'Fast' },
              { id: 'netbanking', label: 'Netbanking', icon: Building2 },
              { id: 'wallet', label: 'Wallets', icon: Wallet },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as PaymentTab);
                    setPaymentError(null);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer flex-shrink-0 md:flex-shrink ${
                    isActive
                      ? 'bg-[#0c6cf2]/15 border border-[#0c6cf2] text-white font-bold shadow-md'
                      : 'hover:bg-[#0b1c2e] text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0c6cf2]' : 'text-slate-400'}`} />
                    <span className="text-xs">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0c6cf2]/20 text-[#388bfd] border border-[#0c6cf2]/30">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="hidden md:block pt-6 px-3">
              <div className="p-3 rounded-xl bg-[#091829] border border-[#142e4c] space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Developer Note</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This is Razorpay's demo sandbox. No real bank charges will be incurred.
                </p>
                <button
                  type="button"
                  onClick={handleOfficialRazorpaySdk}
                  className="w-full mt-1 py-1 px-2 rounded bg-[#0b1f36] hover:bg-[#122e4d] text-[10px] font-bold text-slate-300 hover:text-white border border-[#1b3e64] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Use Live SDK Key</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="md:col-span-8 p-6 bg-[#081524]">
            {/* TAB 1: UPI / QR CODE */}
            {activeTab === 'upi' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#0c6cf2]" />
                    <span>Scan QR with Any UPI App</span>
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{formatTimer(qrTimer)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#05111d] border border-[#142f4e]">
                  {/* Interactive QR Simulation Graphic */}
                  <div className="relative p-3 bg-white rounded-xl shadow-lg flex-shrink-0">
                    <div className="w-32 h-32 bg-white flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Stylized QR Matrix */}
                      <div className="w-full h-full border-4 border-slate-900 p-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-7 h-7 border-4 border-slate-900 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-slate-900" />
                          </div>
                          <div className="w-7 h-7 border-4 border-slate-900 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-slate-900" />
                          </div>
                        </div>

                        {/* Center Razorpay Watermark */}
                        <div className="w-7 h-7 rounded bg-[#0c6cf2] text-white flex items-center justify-center text-xs font-black mx-auto shadow-sm">
                          ₹
                        </div>

                        <div className="flex justify-between">
                          <div className="w-7 h-7 border-4 border-slate-900 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-slate-900" />
                          </div>
                          {/* Pixel dots */}
                          <div className="grid grid-cols-3 gap-0.5 self-end">
                            <div className="w-1.5 h-1.5 bg-slate-900" />
                            <div className="w-1.5 h-1.5 bg-slate-900" />
                            <div className="w-1.5 h-1.5 bg-slate-900" />
                          </div>
                        </div>
                      </div>

                      {/* Scanning Laser Animation */}
                      <div className="absolute inset-x-0 h-0.5 bg-[#0c6cf2] shadow-[0_0_8px_#0c6cf2] animate-bounce" />
                    </div>
                  </div>

                  <div className="space-y-3 text-left flex-1">
                    <p className="text-xs text-slate-300">
                      Open <strong className="text-white">Google Pay, PhonePe, Paytm, or CRED</strong> on your phone and
                      scan this demo QR code.
                    </p>

                    <div className="flex items-center gap-2">
                      {['gpay', 'phonepe', 'paytm', 'bhim'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setSelectedUpiApp(app)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            selectedUpiApp === app
                              ? 'bg-[#0c6cf2] text-white'
                              : 'bg-[#0b1d31] text-slate-400 border border-[#173454]'
                          }`}
                        >
                          {app === 'gpay'
                            ? 'Google Pay'
                            : app === 'phonepe'
                            ? 'PhonePe'
                            : app === 'paytm'
                            ? 'Paytm'
                            : 'BHIM UPI'}
                        </button>
                      ))}
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => executePayment(`Razorpay UPI (${selectedUpiApp.toUpperCase()})`)}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0c6cf2] to-[#1e88e5] hover:from-[#0a5ecf] hover:to-[#1976d2] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-[1.02] disabled:opacity-50"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Simulate Instant UPI Approval</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Or Enter UPI ID */}
                <div className="pt-2 border-t border-[#132c4a]">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Or Enter Your UPI ID / VPA
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. mobileNumber@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 bg-[#05111d] border border-[#142f4e] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0c6cf2]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        executePayment(upiId.trim() ? `Razorpay UPI (${upiId.trim()})` : 'Razorpay UPI')
                      }
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-[#0b1d31] border border-[#0c6cf2]/50 hover:bg-[#0c6cf2] text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      Verify & Pay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CREDIT / DEBIT CARDS */}
            {activeTab === 'card' && (
              <form onSubmit={handleCardPay} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#0c6cf2]" />
                    <span>Card Details</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAutofillTestCard}
                    className="px-2.5 py-1 rounded-md bg-[#0c6cf2]/15 border border-[#0c6cf2]/40 text-[#388bfd] text-[10px] font-bold flex items-center gap-1 hover:bg-[#0c6cf2] hover:text-white transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Autofill Razorpay Test Card</span>
                  </button>
                </div>

                {/* Card Number Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4012 0000 0000 0002"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardInputChange}
                      className="w-full bg-[#05111d] border border-[#142f4e] rounded-xl pl-3 pr-16 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-[#0c6cf2]"
                    />
                    <div className="absolute right-3 top-2.5 flex items-center gap-1">
                      <span className="text-[10px] font-black tracking-wider text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                        VISA / MC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full bg-[#05111d] border border-[#142f4e] rounded-xl px-3 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-[#0c6cf2]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#05111d] border border-[#142f4e] rounded-xl px-3 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-[#0c6cf2]"
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Aarav Singhania"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-[#05111d] border border-[#142f4e] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#0c6cf2]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#0c6cf2] to-[#1e88e5] hover:from-[#0a5ecf] hover:to-[#1976d2] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-[1.01] disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay {formatCurrency(amount)} via Razorpay</span>
                </button>
              </form>
            )}

            {/* TAB 3: NETBANKING */}
            {activeTab === 'netbanking' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0c6cf2]" />
                  <span>Select Your Bank</span>
                </h4>

                {/* Top Banks Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { code: 'HDFC', name: 'HDFC Bank' },
                    { code: 'ICICI', name: 'ICICI Bank' },
                    { code: 'SBI', name: 'State Bank of India' },
                    { code: 'AXIS', name: 'Axis Bank' },
                    { code: 'KOTAK', name: 'Kotak Bank' },
                    { code: 'PNB', name: 'Punjab National' },
                  ].map((bank) => (
                    <button
                      key={bank.code}
                      type="button"
                      onClick={() => setSelectedBank(bank.code)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        selectedBank === bank.code
                          ? 'bg-[#0c6cf2]/15 border-[#0c6cf2] text-white font-bold'
                          : 'bg-[#05111d] border-[#142f4e] hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#0c6cf2]" />
                      <span className="text-[11px] block">{bank.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => executePayment(`Razorpay Netbanking (${selectedBank})`)}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0c6cf2] to-[#1e88e5] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-[1.01] disabled:opacity-50"
                  >
                    <span>Proceed to {selectedBank} Netbanking</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: WALLETS */}
            {activeTab === 'wallet' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#0c6cf2]" />
                  <span>Popular Wallets</span>
                </h4>

                <div className="space-y-2">
                  {[
                    { id: 'paytm', name: 'Paytm Wallet' },
                    { id: 'mobikwik', name: 'MobiKwik' },
                    { id: 'amazonpay', name: 'Amazon Pay' },
                    { id: 'freecharge', name: 'Freecharge' },
                  ].map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWallet(w.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedWallet === w.id
                          ? 'bg-[#0c6cf2]/15 border-[#0c6cf2] text-white font-bold'
                          : 'bg-[#05111d] border-[#142f4e] hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-[#0c6cf2]" />
                        <span className="text-xs">{w.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Linked to {customerPhone || '9820154321'}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => executePayment(`Razorpay Wallet (${selectedWallet.toUpperCase()})`)}
                  disabled={isProcessing}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#0c6cf2] to-[#1e88e5] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  <span>Pay via {selectedWallet.toUpperCase()}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Testing Bar */}
        <div className="bg-[#051220] px-6 py-3 border-t border-[#132c4a] flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Razorpay Trusted Business · PCI-DSS Level 1 Compliant</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulateFailure}
              disabled={isProcessing}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/60 text-rose-300 text-[11px] font-bold cursor-pointer transition-colors disabled:opacity-50"
            >
              Simulate Failure
            </button>
            <button
              type="button"
              onClick={() => executePayment('Razorpay Express Checkout')}
              disabled={isProcessing}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-700/40 hover:bg-emerald-900/60 text-emerald-300 text-[11px] font-bold cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Instant Success</span>
            </button>
          </div>
        </div>

        {/* ─── Processing Overlay ─── */}
        {isProcessing && (
          <div className="absolute inset-0 bg-[#061220]/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-[#0c6cf2]/30 border-t-[#0c6cf2] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                ₹
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white tracking-wide">Processing Demo Payment</h4>
              <p className="text-xs text-slate-300 animate-pulse">{processingStatus}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Do not close or refresh this window</span>
            </div>
          </div>
        )}

        {/* ─── Bank 3D Secure / OTP Simulation Modal ─── */}
        {showOtpModal && (
          <div className="absolute inset-0 bg-black/90 z-30 flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-sm bg-[#091829] border border-[#173e67] rounded-2xl p-6 shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0c6cf2]/20 border border-[#0c6cf2]/40 flex items-center justify-center mx-auto text-[#388bfd]">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">Bank 3D Secure OTP</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Sent to <span className="text-white font-mono">{customerPhone || '+91 98201 54321'}</span> for charter
                  amount <strong className="text-[#d4a359]">{formatCurrency(amount)}</strong>
                </p>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  maxLength={6}
                  className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold bg-[#05111d] border border-[#1b436f] rounded-xl py-2.5 text-white focus:outline-none focus:border-[#0c6cf2]"
                />
                <p className="text-[10px] text-slate-500">Demo sandbox OTP: 123456</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#0b1d31] border border-[#17385a] text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => executePayment('Razorpay Verified Card (3D Secure)')}
                  className="w-1/2 py-2.5 rounded-xl bg-[#0c6cf2] hover:bg-[#0a5ecf] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  Authorize
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
