import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example: Fetch data from a table
  const fetchData = async (tableName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*');
      
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Example: Insert data
  const insertData = async (tableName: string, data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select();
      
      if (error) throw error;
      return result;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchData,
    insertData,
    loading,
    error
  };
};