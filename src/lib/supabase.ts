import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      student_profiles: {
        Row: {
          id: string;
          name: string;
          roll_number: string;
          class: string;
          year: string;
          department: string;
          phone: string;
          address: string;
          parent_name: string;
          parent_phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          roll_number: string;
          class: string;
          year: string;
          department: string;
          phone: string;
          address: string;
          parent_name: string;
          parent_phone: string;
        };
        Update: {
          name?: string;
          roll_number?: string;
          class?: string;
          year?: string;
          department?: string;
          phone?: string;
          address?: string;
          parent_name?: string;
          parent_phone?: string;
        };
      };
      faculty_profiles: {
        Row: {
          id: string;
          name: string;
          employee_id: string;
          department: string;
          designation: string;
          phone: string;
          address: string;
          qualification: string;
          experience: string;
          assigned_classes: string[];
          current_class: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          employee_id: string;
          department: string;
          designation: string;
          phone: string;
          address: string;
          qualification: string;
          experience: string;
          assigned_classes?: string[];
          current_class?: string;
        };
        Update: {
          name?: string;
          employee_id?: string;
          department?: string;
          designation?: string;
          phone?: string;
          address?: string;
          qualification?: string;
          experience?: string;
          assigned_classes?: string[];
          current_class?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          title: string;
          description: string;
          subject: string;
          due_date: string;
          max_marks: number;
          created_by: string;
          class_assigned: string;
          file_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          subject: string;
          due_date: string;
          max_marks?: number;
          created_by: string;
          class_assigned: string;
          file_url?: string;
        };
        Update: {
          title?: string;
          description?: string;
          subject?: string;
          due_date?: string;
          max_marks?: number;
          class_assigned?: string;
          file_url?: string;
        };
      };
    };
  };
}