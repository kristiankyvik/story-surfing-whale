import React, { useState } from 'react';
import { useAddNote } from '../integrations/supabase/hooks/notes';
import { useAddComment } from '../integrations/supabase/hooks/comments';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState(['']);

  const addNote = useAddNote();
  const addComment = useAddComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: noteData } = await addNote.mutateAsync({ title });
      const noteId = noteData[0].id;

      for (const comment of comments) {
        if (comment.trim()) {
          await addComment.mutateAsync({ content: comment, note: noteId });
        }
      }

      setTitle('');
      setContent('');
      setComments(['']);
      alert('Note and comments added successfully!');
    } catch (error) {
      console.error('Error adding note and comments:', error);
      alert('Failed to add note and comments. Please try again.');
    }
  };

  const handleAddComment = () => {
    setComments([...comments, '']);
  };

  const handleCommentChange = (index, value) => {
    const newComments = [...comments];
    newComments[index] = value;
    setComments(newComments);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Note Title
        </label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Note Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        {comments.map((comment, index) => (
          <Input
            key={index}
            type="text"
            value={comment}
            onChange={(e) => handleCommentChange(index, e.target.value)}
            placeholder={`Comment ${index + 1}`}
            className="mt-1"
          />
        ))}
        <Button type="button" onClick={handleAddComment} className="mt-2">
          Add Another Comment
        </Button>
      </div>
      <Button type="submit">Create Note</Button>
    </form>
  );
};

export default NoteForm;