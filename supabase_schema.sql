-- Create the courses table if it doesn't exist
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

-- Create the registrations table
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

-- Create the tutoring_sessions table
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

-- Enable Row Level Security
alter table courses enable row level security;
alter table registrations enable row level security;
alter table tutoring_sessions enable row level security;

-- Policies for courses
create policy "Courses are viewable by everyone"
  on courses for select
  using (true);

-- Policies for registrations
create policy "Registrations can be created by anyone"
  on registrations for insert
  with check (true);

-- Policies for tutoring_sessions (simplified for now since auth is being removed)
create policy "Sessions are viewable by everyone"
  on tutoring_sessions for select
  using (true);
