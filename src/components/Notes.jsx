import React from 'react';
import { useSelector } from 'react-redux';

const Notes = () => {
  const notes = useSelector((state) => state.notes.items);
  const noteStatus = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);
  
  let content;
  
  if (noteStatus === 'loading') {
    content = <p>Chargement des notes...</p>;
  } else if (noteStatus === 'succeeded') {
    //console.log("Notes in state:", notes);
    content = (
      <div >
        {notes.map((note) => (
          <div key={note.id} >
            <p >{note.text}</p>
            <div className="flex flex-wrap gap-1 mt-2">
                <span key={note.tag.id} >{note.tag.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (noteStatus === 'failed') {
    content = <p>Erreur: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mes notes</h2>
      {content}
    </div>
  );
};

export default Notes;