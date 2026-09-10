# YachtWay — Luxury Yacht Charter Platform

YachtWay is a web application designed for booking luxury yacht charters, private sunset cruises, corporate marine events, and VIP coastal transfers. Built using React, TypeScript, Tailwind CSS, and Supabase.

---

## Key Features

- **Luxury Editorial UI/UX**: Custom responsive layout with dynamic scroll animations, glassmorphism elements, and a tailored marine aesthetic.
- **Supabase Authentication**: User registration, password-based authentication, session management, and email verification.
- **User-Scoped Data Isolation**: Data synchronization for bookings, wishlists, and vessel comparisons tied strictly to authenticated user IDs using Row Level Security (RLS).
- **Dynamic Fleet Engine**: Search, filter, and sort luxury vessels by charter category, party size, location, and pricing.
- **Vessel Comparison Matrix**: Side-by-side specification comparison tool for up to three yachts simultaneously.
- **Multi-Step Booking System**: Form flow with calendar date validation, departure time slots, duration options, add-on luxury services, and dynamic price calculation.
- **Digital Boarding Pass**: Instant boarding pass generation with print and download capability.
- **Mobile Optimization**: Touch-friendly navigation drawer, adaptive grid layouts, and hardware-accelerated animations.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Iconography**: Lucide React
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Auth Services)

---

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn package manager

### Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aditi-2827/yacht-booking-app.git
   cd yacht-booking-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root directory by referencing `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase URL and Anon Key:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`.

---

## License

This project is open-source software licensed under the MIT License.
