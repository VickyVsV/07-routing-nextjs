import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';

export default async function NotesPage({ params }: { params: { slug?: string[] } }) {
  // SSR загрузка первой страницы без поиска
  const initialData = await fetchNotes('', 1, 12);
  /* const tag = params.slug?.[0] || null; */
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const tag = slug?.[0] === 'all' ? null : slug?.[0] ?? null;

  return <Notes initialData={initialData} tag={tag} />;
}