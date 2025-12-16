import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetNotesQuery, useGetTagsQuery } from '../services/api';
import { setNotes, setNoteStatus } from '../features/notes/noteSlice';
import { setTags, setTagStatus } from '../features/tags/tagSlice';

import Notes from '../components/Notes';
import TagForm from '../components/TagForm';
import TagList from '../components/TagList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotesQuery();
  const { data: tags, error: tagsError, isLoading: tagsLoading } = useGetTagsQuery();


  useEffect(() => {
    if (notesLoading) {
        dispatch(setNoteStatus('loading'));
    }
    if (notes) {
      dispatch(setNotes(notes));
    }
    if (notesError) {
        dispatch(setNoteStatus('failed'));
    }

    if (tagsLoading) {
        dispatch(setTagStatus('loading'));
    }
    if (tags) {
        dispatch(setTags(tags));
    }
    if (tagsError) {
        dispatch(setTagStatus('failed'));
    }
  }, [dispatch, notes, notesLoading, notesError, tags, tagsLoading, tagsError]);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>

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
