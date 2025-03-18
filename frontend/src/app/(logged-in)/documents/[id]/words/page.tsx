import { redirect } from "next/navigation";
import { Metadata } from "next";

import { fetchDocumentWord } from "@/use-cases/actions/word/fetch-document-word";
import WordsIndex from "@/app/_pages/words";
import { fetchChapter } from "@/use-cases/actions/chapter/fetch-chapter";

export const metadata: Metadata = {
  title: 'すべての単語一覧',
}

export default async function WordsPage({ params }: { params: { id: string } }) {
  const [documentWords, chapters] = await Promise.all([
    fetchDocumentWord(params.id),
    fetchChapter(params.id)
  ])
  if (documentWords.error) {
    redirect("/documents")
  }

  return (
    <WordsIndex
      words={documentWords.data}
      documentId={params.id}
      chapters={chapters.data}
    />
  )
}


