import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase project URL and public API key
const supabaseUrl = "https://qhcpxbkmqeolnjplsmoi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoY3B4YmttcWVvbG5qcGxzbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MDIwNjAsImV4cCI6MjAzODk3ODA2MH0.4_hlataQGgbDJP7wttzIwtXkqHIg1rc7zZR14odOnho";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
