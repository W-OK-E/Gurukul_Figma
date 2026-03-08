# Gurukul - K-12 Tutoring Platform

A comprehensive tutoring platform built with Next.js and Supabase.

## New Features
- **Integrated Auth**: Support for Student and Instructor roles.
- **Role-Based Dashboards**: 
  - **Students**: Tracks courses, schedule, and progress.
  - **Instructors**: Manage students, sessions, and course performance.
- **Secure Database**: Supabase integration with Row Level Security.

## Getting Started
1. Run `npm install`
2. Configure `.env.local` using Supabase credentials.
3. Run `npm run dev`

## Deployment & Expansion
See [next-steps.md](./next-steps.md) for detailed instructions on how to deploy to the free tier and expand the platform features.


To create admin account:

-- Replace 'your-email@example.com' with the email you signed up with 
-- (or the one you want to use for admin)

-- Step 1: Promote the user role to 'admin'
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Step 2: Ensure Auth Metadata also reflects the role (for sidebar routing)
-- Run this if you already have a user account created.