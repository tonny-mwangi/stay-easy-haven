
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lavqevtscpsfcumfugqk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdnFldnRzY3BzZmN1bWZ1Z3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MTU5NTEsImV4cCI6MjA1OTI5MTk1MX0.VUtqlpsGpu2mQtFDBwCutH2h9_9heONXBb1xX0DzQMU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
