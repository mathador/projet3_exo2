import React from 'react';
import { useSelector } from 'react-redux';

const TagList = () => {
  const tags = useSelector((state) => state.tags.items);
  const tagStatus = useSelector((state) => state.tags.status);
  const error = useSelector((state) => state.tags.error);

  let content;

  if (tagStatus === 'loading') {
    content = <p>Chargement des tags...</p>;
  } else if (tagStatus === 'succeeded') {
    content = (
      <div className="flex flex-wrap gap-2">
        <ul>
          {tags.map((tag) => (
            <li key={tag.id} >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (tagStatus === 'failed') {
    content = <p>Erreur: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tags disponibles</h2>
      {content}
    </div>
  );
};

export default TagList;
