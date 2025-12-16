import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '../features/notes/noteSlice'; // Ensure this path is correct

const Notes = () => {
  const notes = useSelector((state) => state.notes.items);
  const noteStatus = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

  let content;

  if (noteStatus === 'loading') {
    content = <p>Loading notes...</p>;
  } else if (noteStatus === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.data.map((note) => (
          <div key={note.id} className="p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 shadow-sm">
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{note.content}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags && note.tags.map(tag => (
                <span key={tag.id} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full">{tag.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (noteStatus === 'failed') {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Notes</h2>
      {content}
    </div>
  );
};

export default Notes;
