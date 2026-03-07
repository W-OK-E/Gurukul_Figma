-- Create profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone default now(),
  full_name text,
  avatar_url text,
  role text check (role in ('student', 'instructor', 'admin')) default 'student',
  email text
);

-- Enable RLS on profiles
alter table profiles enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', coalesce(new.raw_user_meta_data->>'role', 'student'), new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update courses table to include instructor_id
alter table courses add column if not exists instructor_id uuid references profiles(id);

-- Create enrollments table
create table if not exists enrollments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  student_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  status text default 'active' check (status in ('active', 'completed', 'cancelled')),
  unique(student_id, course_id)
);

-- Enable RLS on enrollments
alter table enrollments enable row level security;

-- Enrollments policies
create policy "Students can view their own enrollments" on enrollments
  for select using (auth.uid() = student_id);

create policy "Instructors can view enrollments for their courses" on enrollments
  for select using (
    exists (
      select 1 from courses
      where courses.id = enrollments.course_id
      and courses.instructor_id = auth.uid()
    )
  );

-- Update tutoring_sessions policies
drop policy if exists "Sessions are viewable by everyone" on tutoring_sessions;

create policy "Users can view their own sessions" on tutoring_sessions
  for select using (auth.uid() = student_id or auth.uid() = tutor_id);

create policy "Instructors can create sessions" on tutoring_sessions
  for insert with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and (profiles.role = 'instructor' or profiles.role = 'admin')
    )
  );
