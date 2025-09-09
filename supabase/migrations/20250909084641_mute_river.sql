/*
  # Create user profiles and authentication system

  1. New Tables
    - `student_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `roll_number` (text, unique)
      - `class` (text)
      - `year` (text)
      - `department` (text)
      - `phone` (text)
      - `address` (text)
      - `parent_name` (text)
      - `parent_phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `faculty_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `employee_id` (text, unique)
      - `department` (text)
      - `designation` (text)
      - `phone` (text)
      - `address` (text)
      - `qualification` (text)
      - `experience` (text)
      - `assigned_classes` (text array)
      - `current_class` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `assignments`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `subject` (text)
      - `due_date` (date)
      - `max_marks` (integer)
      - `created_by` (uuid, references auth.users)
      - `class_assigned` (text)
      - `file_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
    - Add policies for faculty to manage their class data
*/

-- Create student_profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  roll_number text UNIQUE NOT NULL,
  class text NOT NULL,
  year text NOT NULL,
  department text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  parent_name text NOT NULL,
  parent_phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faculty_profiles table
CREATE TABLE IF NOT EXISTS faculty_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  employee_id text UNIQUE NOT NULL,
  department text NOT NULL,
  designation text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  qualification text NOT NULL,
  experience text NOT NULL,
  assigned_classes text[] DEFAULT '{}',
  current_class text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  subject text NOT NULL,
  due_date date NOT NULL,
  max_marks integer NOT NULL DEFAULT 100,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  class_assigned text NOT NULL,
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for student_profiles
CREATE POLICY "Students can view and edit their own profile"
  ON student_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for faculty_profiles
CREATE POLICY "Faculty can view and edit their own profile"
  ON faculty_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for assignments
CREATE POLICY "Faculty can manage their own assignments"
  ON assignments
  FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Students can view assignments for their class"
  ON assignments
  FOR SELECT
  TO authenticated
  USING (
    class_assigned IN (
      SELECT class FROM student_profiles WHERE id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_student_profiles_updated_at
  BEFORE UPDATE ON student_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faculty_profiles_updated_at
  BEFORE UPDATE ON faculty_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();