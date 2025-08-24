import css from './SidebarNotes.module.css';
import type { NoteTag } from '@/types/note';
import Link from 'next/link';


const NotesSidebar = async () => {
  const allTags: NoteTag[] = [
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
    'Todo',
  ];
  
  return (
    <div>
      <h2>Tags</h2>
      <ul className={css.menuList}>
        {/* список тегів */}
        <li className={css.menuItem}>
          <Link
            href="/notes/filter/all"
            className={css.menuLink}
          >
            All notes
          </Link>
        </li>
        {allTags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSidebar;
