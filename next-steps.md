# Deployment & Expansion Guide for Gurukul

This project is built with Next.js and Supabase, designed to be scaleable on the free tier.

## 1. Deployment Steps (Vercel / Netlify)

### Supabase Setup
1. **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2. **Execute Schema**: Copy the content of `supabase/migrations/20240324000000_enhanced_dashboards.sql` and run it in the Supabase SQL Editor. This sets up:
   - User Profiles (synced with Auth)
   - Enrollments
   - Row Level Security (RLS) policies
3. **Configure Auth**: 
   - Enable Email auth in the Supabase Dashboard (Authentication > Providers).
   - Disable "Confirm Email" if you want to test without a real SMTP server initially.

### Deployment (Vercel)
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add the following Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (for secure backend operations).

## 2. How to Expand

The current version provides a solid foundation with Auth and Dashboards. Here is how you can take it to "hundreds of students":

### Phase 1: Core Functionality Enhancements
- **Payments**: Integrate **Stripe** to handle course purchases. You can create a new `payments` table in Supabase to track transactions.
- **Live Classes**: Integrate **Zoom SDK** or **Daily.co**. Store the `zoom_link` in the `tutoring_sessions` table.
- **File Storage**: Use **Supabase Storage** for course materials (PDFs, Videos, Assignments).

### Phase 2: User Experience
- **Messaging**: Implement a simple chat using Supabase Realtime so students and instructors can communicate.
- **Progress Reports**: Visual charts using `recharts` (already in `package.json`) to show learning trends over time.
- **Email Notifications**: Use **Resend** or **SendGrid** to send automated reminders for upcoming classes.

### Phase 3: Scaling
- **Edge Functions**: Use Supabase Edge Functions for intensive backend tasks like processing video or batching emails.
- **Global Deployment**: Next.js on Vercel automatically deploys your frontend globally. Supabase also has global database replication if needed.

## Database Management
To add new features, always follow the migration pattern:
1. Create a new `.sql` file in `supabase/migrations`.
2. Apply it via the Supabase Dashboard SQL editor.
3. Update your TypeScript interfaces in `src/types` (if you have them) or directly in your components.
