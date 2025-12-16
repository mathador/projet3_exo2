import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
// import { addTag, fetchTags } from '../features/tags/tagSlice'; // Will create addTag action later

const TagForm = () => {
  const [tagName, setTagName] = useState('');
  //const dispatch = useDispatch();
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError('Tag name cannot be empty.');
      return;
    }

    try {
      setStatus('loading');
      setError(null);
      // await dispatch(addTag(tagName)).unwrap(); // Call the async thunk
      console.log('Simulating tag creation for:', tagName); // Placeholder
      setTagName('');
      setStatus('succeeded');
      // After success, you might want to refetch tags to update the list
      // dispatch(fetchTags()); // Uncomment when addTag and fetchTags are fully implemented
    } catch (err) {
      setError(err.message || 'Failed to create tag.');
      setStatus('failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create New Tag</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="tagName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Tag Name
          </label>
          <input
            type="text"
            id="tagName"
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Creating...' : 'Create Tag'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {status === 'succeeded' && !error && <p className="text-green-500 text-sm">Tag created successfully!</p>}
      </form>
    </div>
  );
};

export default TagForm;
