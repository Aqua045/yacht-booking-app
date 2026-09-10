import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ConfirmedBooking } from '../types/yacht';

const LOCAL_STORAGE_BOOKINGS_KEY = 'yachtway_confirmed_bookings';
const LOCAL_STORAGE_FAVORITES_KEY = 'yachtway_favorites';

export const bookingService = {
  // ─── Auth: Sign Up ──────────────────────────────────────────────────────────
  async signUp(email: string, password: string, name: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { error: 'Supabase is not configured.' };
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: name.trim() },
        // Supabase will send a verification email automatically
        emailRedirectTo: window.location.origin,
      },
    });
    return { data, error: error?.message || null };
  },

  // ─── Auth: Sign In ──────────────────────────────────────────────────────────
  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { error: 'Supabase is not configured.' };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    return { data, error: error?.message || null };
  },

  // ─── Auth: Sign Out ─────────────────────────────────────────────────────────
  async signOut() {
    if (!isSupabaseConfigured || !supabase) return;
    await supabase.auth.signOut();
  },

  // ─── Auth: Get Current Session ─────────────────────────────────────────────
  async getSession() {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  // ─── Auth: Resend Verification Email ────────────────────────────────────────
  async resendVerification(email: string) {
    if (!isSupabaseConfigured || !supabase) return { error: 'Not configured' };
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    return { error: error?.message || null };
  },

  // ─── Bookings: Fetch (user-scoped via Supabase session) ─────────────────────
  async getBookings(userId: string): Promise<ConfirmedBooking[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((b: any) => ({
            bookingId: b.booking_id,
            yachtId: b.yacht_id,
            yachtName: b.yacht_name,
            yachtImage: b.yacht_image,
            yachtCategory: b.yacht_category,
            destination: b.destination,
            startDate: b.start_date,
            timeSlot: b.time_slot,
            duration: b.duration,
            guestCount: b.guest_count,
            selectedAddOns: b.selected_add_ons || [],
            customerName: b.customer_name,
            customerEmail: b.customer_email,
            customerPhone: b.customer_phone,
            specialRequests: b.special_requests,
            basePrice: b.base_price,
            taxAmount: b.tax_amount,
            addOnsAmount: b.add_ons_amount,
            totalAmount: b.total_amount,
            createdAt: b.created_at,
            status: b.status,
            paymentStatus: b.payment_status || 'Paid',
            paymentMethod: b.payment_method || 'Razorpay (Demo)',
            razorpayPaymentId: b.razorpay_payment_id,
            razorpayOrderId: b.razorpay_order_id,
            paidAt: b.paid_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using localStorage fallback', err);
      }
    }

    // Fallback: user-scoped localStorage key
    try {
      const key = `${LOCAL_STORAGE_BOOKINGS_KEY}_${userId}`;
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  // ─── Bookings: Save ─────────────────────────────────────────────────────────
  async saveBooking(booking: ConfirmedBooking, userId: string): Promise<void> {
    // User-scoped localStorage sync
    try {
      const key = `${LOCAL_STORAGE_BOOKINGS_KEY}_${userId}`;
      const saved = localStorage.getItem(key);
      const list: ConfirmedBooking[] = saved ? JSON.parse(saved) : [];
      const updated = [booking, ...list.filter(b => b.bookingId !== booking.bookingId)];
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').insert([{
          booking_id: booking.bookingId,
          user_id: userId,
          yacht_id: booking.yachtId,
          yacht_name: booking.yachtName,
          yacht_image: booking.yachtImage,
          yacht_category: booking.yachtCategory,
          destination: booking.destination,
          start_date: booking.startDate,
          time_slot: booking.timeSlot,
          duration: booking.duration,
          guest_count: booking.guestCount,
          selected_add_ons: booking.selectedAddOns,
          customer_name: booking.customerName,
          customer_email: booking.customerEmail,
          customer_phone: booking.customerPhone,
          special_requests: booking.specialRequests,
          base_price: booking.basePrice,
          tax_amount: booking.taxAmount,
          add_ons_amount: booking.addOnsAmount,
          total_amount: booking.totalAmount,
          created_at: booking.createdAt,
          status: booking.status,
          payment_status: booking.paymentStatus,
          payment_method: booking.paymentMethod,
          razorpay_payment_id: booking.razorpayPaymentId,
          paid_at: booking.paidAt,
        }]);
      } catch (err) {
        console.error('Failed to insert booking into Supabase:', err);
      }
    }
  },

  // ─── Bookings: Cancel ───────────────────────────────────────────────────────
  async cancelBooking(bookingId: string, userId: string): Promise<void> {
    try {
      const key = `${LOCAL_STORAGE_BOOKINGS_KEY}_${userId}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const list: ConfirmedBooking[] = JSON.parse(saved);
        localStorage.setItem(key, JSON.stringify(list.filter(b => b.bookingId !== bookingId)));
      }
    } catch (e) {
      console.error(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').delete().eq('booking_id', bookingId).eq('user_id', userId);
      } catch (err) {
        console.error('Failed to delete booking from Supabase:', err);
      }
    }
  },

  // ─── Favorites: Fetch (user-scoped) ─────────────────────────────────────────
  async getFavorites(userId: string): Promise<string[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('yacht_id')
          .eq('user_id', userId);
        if (!error && data) {
          return data.map((item: any) => item.yacht_id);
        }
      } catch (err) {
        console.warn('Supabase favorites fetch failed, fallback to local', err);
      }
    }

    try {
      const key = `${LOCAL_STORAGE_FAVORITES_KEY}_${userId}`;
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  // ─── Favorites: Toggle (user-scoped) ────────────────────────────────────────
  async toggleFavorite(yachtId: string, isFav: boolean, userId: string): Promise<void> {
    try {
      const key = `${LOCAL_STORAGE_FAVORITES_KEY}_${userId}`;
      const saved = localStorage.getItem(key);
      const list: string[] = saved ? JSON.parse(saved) : [];
      const updated = isFav ? [...list, yachtId] : list.filter(id => id !== yachtId);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        if (isFav) {
          await supabase.from('favorites').insert([{ yacht_id: yachtId, user_id: userId }]);
        } else {
          await supabase.from('favorites').delete().eq('yacht_id', yachtId).eq('user_id', userId);
        }
      } catch (err) {
        console.error('Failed to update favorite in Supabase:', err);
      }
    }
  },
};
