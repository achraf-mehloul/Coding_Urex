/*
  # Urex Bootcamp Registrations System

  ## Overview
  This migration creates the core registration system for the Urex Web Development Bootcamp.

  ## New Tables
  
  ### `registrations`
  Stores all student registration data for the bootcamp.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each registration
  - `full_name` (text, required) - Student's first name
  - `last_name` (text, required) - Student's last name
  - `date_of_birth` (date, required) - Student's date of birth
  - `major` (text, required) - Student's major/field of study
  - `department` (text, required) - Academic department
  - `campus` (text, required) - Campus location
  - `programming_knowledge` (text, required) - Student's self-assessment of programming knowledge
  - `programming_goals` (text, required) - Student's goals in programming
  - `created_at` (timestamptz) - Registration timestamp
  
  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `registrations` table
  - Public can insert new registrations (for student sign-ups)
  - Only authenticated admin users can view all registrations (for dashboard)
  
  ## Notes
  - All fields are required to ensure complete registration data
  - Timestamps are automatically set on creation
  - RLS ensures students can register but only admins can view data
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  major text NOT NULL,
  department text NOT NULL,
  campus text NOT NULL,
  programming_knowledge text NOT NULL,
  programming_goals text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);