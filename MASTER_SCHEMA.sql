-- =========================================================
-- GURUKUL MASTER SCHEMA
-- This script contains all tables and policies for the platform.
-- Paste this into the Supabase SQL Editor.
-- =========================================================

-- 1. BASIC TABLES
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  subject text not null,
  grade text not null,
  instructor text not null,
  rating numeric default 0,
  students integer default 0,
  duration text,
  price numeric,
  image text,
  description text,
  features text[],
  syllabus text,
  curriculums text
);

create table if not exists registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  student_name text not null,
  parent_name text not null,
  phone_number text not null,
  grade text not null,
  email text not null,
  courses text[],
  country text,
  currency text,
  city text,
  preferred_hourly_rate text,
  time_slots text[],
  frequency_weekly text,
  status text default 'pending'
);

create table if not exists tutoring_sessions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  description text,
  subject text,
  grade text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  student_id uuid,
  tutor_id uuid,
  zoom_link text
);

-- 2. DASHBOARD & PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone default now(),
  full_name text,
  avatar_url text,
  role text check (role in ('student', 'instructor', 'admin')) default 'student',
  email text
);

alter table courses add column if not exists instructor_id uuid references profiles(id);

create table if not exists enrollments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  student_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  status text default 'active' check (status in ('active', 'completed', 'cancelled')),
  unique(student_id, course_id)
);

-- 3. ROW LEVEL SECURITY (RLS)
alter table courses enable row level security;
alter table registrations enable row level security;
alter table tutoring_sessions enable row level security;
alter table profiles enable row level security;
alter table enrollments enable row level security;

-- 4. POLICIES
-- Courses
drop policy if exists "Courses are viewable by everyone" on courses;
create policy "Courses are viewable by everyone" on courses for select using (true);

-- Registrations
drop policy if exists "Registrations can be created by anyone" on registrations;
create policy "Registrations can be created by anyone" on registrations for insert with check (true);

-- Profiles
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);

drop policy if exists "Users can insert their own profile" on profiles;
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Enrollments
drop policy if exists "Students can view their own enrollments" on enrollments;
create policy "Students can view their own enrollments" on enrollments for select using (auth.uid() = student_id);

drop policy if exists "Instructors can view enrollments for their courses" on enrollments;
create policy "Instructors can view enrollments for their courses" on enrollments for select using (
  exists (select 1 from courses where courses.id = enrollments.course_id and courses.instructor_id = auth.uid())
);

-- Sessions
drop policy if exists "Sessions are viewable by everyone" on tutoring_sessions;
create policy "Users can view their own sessions" on tutoring_sessions for select using (auth.uid() = student_id or auth.uid() = tutor_id);

drop policy if exists "Instructors can create sessions" on tutoring_sessions;
create policy "Instructors can create sessions" on tutoring_sessions for insert with check (
  exists (select 1 from profiles where profiles.id = auth.uid() and (profiles.role = 'instructor' or profiles.role = 'admin'))
);

-- 5. AUTOMATION (AUTH TRIGGER)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', coalesce(new.raw_user_meta_data->>'role', 'student'), new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
