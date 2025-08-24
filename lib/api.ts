import axios from 'axios';
import type { Note, NewNote } from '../types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface GetNote {
  notes: Note[]; // массив заметок
  totalPages: number; // всего страниц (для пагинации)
  total: number;
}

export const getSingleNote = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res.data;
};

export async function fetchNotes(
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: string
): Promise<GetNote> {
  try {
    // формируем объект params динамически
    const params: Record<string, string | number> = { page, perPage };

    if (search.trim() !== '') {
      params.search = search;
    }

    if (tag) {
      params.tag = tag;
    }

    const response = await axios.get<GetNote>(
      'https://notehub-public.goit.study/api/notes',
      {
        params,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `Failed to fetch notes: ${error.message}`
      );
    }
    throw new Error('Unknown error while fetching notes');
  }
}
/* export async function fetchNotes(
  search: string,
  page: number = 1,
  perPage: number = 12,
): Promise<GetNote> {
  try {
    const response = await axios.get<GetNote>(
      'https://notehub-public.goit.study/api/notes',
      {
        params:
          search.trim() !== '' ? { search, page, perPage } : { page, perPage },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `Failed to fetch notes: ${error.message}`
      );
    }
    throw new Error('Unknown error while fetching notes');
  }
} */

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    newNote,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return res.data;
};
