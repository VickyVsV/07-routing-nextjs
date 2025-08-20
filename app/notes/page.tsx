import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';

export default async function NotesPage() {
  // SSR загрузка первой страницы без поиска
  const initialData = await fetchNotes('', 1, 12);

  return <Notes initialData={initialData} />;
}