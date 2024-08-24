import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

/*
### notes

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |
| title      | text                     | string | false    |

*/

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useNotes = () => useQuery({
  queryKey: ['notes'],
  queryFn: () => fromSupabase(supabase.from('notes').select('*')),
});

export const useNote = (id) => useQuery({
  queryKey: ['notes', id],
  queryFn: () => fromSupabase(supabase.from('notes').select('*').eq('id', id).single()),
});

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNote) => fromSupabase(supabase.from('notes').insert([newNote])),
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('notes').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('notes').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
};