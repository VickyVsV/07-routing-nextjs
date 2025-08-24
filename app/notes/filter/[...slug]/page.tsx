import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';

type Props = {
    params: Promise <{slug: string[]}>
}

export default async function NotesPage({ params }: Props) {
  /* const tag = params.slug?.[0] || null; */
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? null : slug?.[0] ?? null;
  // SSR загрузка первой страницы без поиска
  const initialData = await fetchNotes('', 1, 12);

  return <Notes initialData={initialData} tag={tag} />;
}