import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

/*
### comments

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |
| content    | text                     | string | false    |
| note       | int8                     | number | false    |

Foreign Key Relationships:
- note references notes.id
*/

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useComments = () => useQuery({
  queryKey: ['comments'],
  queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useComment = (id) => useQuery({
  queryKey: ['comments', id],
  queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single()),
});

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('comments').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
};