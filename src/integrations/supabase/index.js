// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import {
  useNotes,
  useNote,
  useAddNote,
  useUpdateNote,
  useDeleteNote,
} from './hooks/notes.js';
import {
  useComments,
  useComment,
  useAddComment,
  useUpdateComment,
  useDeleteComment,
} from './hooks/comments.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useNotes,
  useNote,
  useAddNote,
  useUpdateNote,
  useDeleteNote,
  useComments,
  useComment,
  useAddComment,
  useUpdateComment,
  useDeleteComment,
};