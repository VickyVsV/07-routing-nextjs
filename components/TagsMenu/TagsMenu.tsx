'use client';

import css from './TagsMenu.module.css';
import { useState } from 'react';
import type { NoteTag } from '@/types/note';
import Link from 'next/link';

export function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const allTags: NoteTag[] = [
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
    'Todo',
  ];

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          <li className={css.menuItem}>
            <Link href="/notes/filter/all" className={css.menuLink} onClick={() => setIsOpen(false)}>
              All notes
            </Link>
          </li>
          {allTags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setIsOpen(false)}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
