import React, { useState } from 'react';
import { useAddNote, useAddComment } from '../integrations/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const CreateNotePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState(['']);
  const addNote = useAddNote();
  const addComment = useAddComment();

  const handleAddComment = () => {
    setComments([...comments, '']);
  };

  const handleCommentChange = (index, value) => {
    const newComments = [...comments];
    newComments[index] = value;
    setComments(newComments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: noteData } = await addNote.mutateAsync({ title, content });
      const noteId = noteData[0].id;
      
      for (const comment of comments) {
        if (comment.trim()) {
          await addComment.mutateAsync({ content: comment, note: noteId });
        }
      }

      setTitle('');
      setContent('');
      setComments(['']);
      alert('Note and comments created successfully!');
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create a New Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          {comments.map((comment, index) => (
            <div key={index} className="mb-2">
              <Input
                value={comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
                placeholder={`Comment ${index + 1}`}
                className="w-full"
              />
            </div>
          ))}
          <Button type="button" onClick={handleAddComment} variant="outline" className="mt-2">
            Add Another Comment
          </Button>
        </div>
        <Button type="submit" className="w-full">Create Note</Button>
      </form>
    </div>
  );
};

export default CreateNotePage;