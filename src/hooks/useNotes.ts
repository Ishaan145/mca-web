import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const createNote = async (title: string, content?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert({ title, content })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a note
  const updateNote = async (id: string, updates: { title?: string; content?: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    loading,
    error
  };
};