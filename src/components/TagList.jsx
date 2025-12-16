import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from '../features/tags/tagSlice';

const TagList = () => {
  const tags = useSelector((state) => state.tags.items);
  const tagStatus = useSelector((state) => state.tags.status);
  const error = useSelector((state) => state.tags.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tagStatus === 'idle') {
      dispatch(fetchTags());
    }
  }, [tagStatus, dispatch]);

  let content;

  if (tagStatus === 'loading') {
    content = <p>Loading tags...</p>;
  } else if (tagStatus === 'succeeded') {
    content = (
      <div className="flex flex-wrap gap-2">
        {tags.data.map((tag) => (
          <span key={tag.id} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
            {tag.name}
          </span>
        ))}
      </div>
    );
  } else if (tagStatus === 'failed') {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Tags</h2>
      {content}
    </div>
  );
};

export default TagList;
