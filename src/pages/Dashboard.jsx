import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotes } from '../features/notes/noteSlice';
import { fetchTags } from '../features/tags/tagSlice';

import Notes from '../components/Notes';
import TagForm from '../components/TagForm';
// TODO: Create these components
import TagList from '../components/TagList';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Notes Component */}
      <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
        <Notes />
      </div>

      {/* TagForm Component */}
      <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
        <TagForm />
      </div>

      {/* TagList Component */}
      <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
        <TagList />
      </div>
    </div>
  );
};

export default Dashboard;
