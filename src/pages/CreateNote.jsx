import React from 'react';
import NoteForm from '../components/NoteForm';

const CreateNote = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Note</h1>
      <NoteForm />
    </div>
  );
};

export default CreateNote;