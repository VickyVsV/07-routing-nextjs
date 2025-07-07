import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "../../lib/api";
import NoteDetailsClient from "./NoteDetails.client"; // путь зависит от структуры

type Props = {
  params: { id: string };
};

export default async function NoteDetails({ params }: Props) {
  const id = params.id; // оставить как строку

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
