import css from "./NoteList.module.css";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../app/types/note";
import { deleteNote } from "../../app/lib/api";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutationDel = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      // 3. Коли мутація успішно виконується,
      // інвалідовуємо всі запити з ключем "notes"
      // для оновлення списку завдань
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutationDel.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}