"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination";
import { components } from "@/open-api/oa-schema";
import { getPaginationIndex } from "@/utils/pagination-index";
import { useFetchDocumentWords } from "@/app/_pages/words/use-fetch-document-word";
import { useDebounce } from "@/hooks/use-debounce";


type WordsIndexProps = {
  words: components["schemas"]["DocumentWordPaginationResponse"];
  chapters: components["schemas"]["ChapterResponse"][];
  documentId: string;
}

export default function WordsIndex({ documentId, words, chapters }: WordsIndexProps) {

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const debounceSetSearch = useDebounce(setSearch, 2000)
  const showChapter = chapters && chapters.length > 1

  const { data } = useFetchDocumentWords({
    defaultData: words,
    page,
    search,
    id: documentId
  })

  const { current_page, pages } = data.pagination
  const paginationIndex = getPaginationIndex(current_page, pages)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          placeholder="Search"
          className="w-64"
          onChange={(e) => debounceSetSearch(e.target.value)}
        />
      </div>
      <Table className="bg-background rounded">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">単語</TableHead>
            {showChapter && <TableHead className="w-[5%]">章</TableHead>}
            <TableHead className="w-[40%]">意味</TableHead>
            <TableHead className="w-[40%]">例文</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((word) => (
            <TableRow key={word.id}>
              <TableCell className="font-medium">{word.word?.word}</TableCell>
              {showChapter && (
                <TableCell className="font-medium">{chapters.find(c => c.id === word.chapter_id)?.index + 1}</TableCell>
              )}
              <TableCell>{word.word.mean}</TableCell>
              <TableCell>{highlightText(word.example, word.word_raw) || word.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent className="bg-background rounded p-2">
          {paginationIndex.map((index, i) => (
            <PaginationItem key={i}>
              {index === -1 ? (
                <PaginationEllipsis/>
              ) : (
                <PaginationLink
                  onClick={() => setPage(index)}
                  isActive={index === current_page}
                >
                  {index}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  )
}


function highlightText(example: string, word: string) {
  const parts = example.split(new RegExp(`(\\b${word}\\b)`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <span key={index} className="bg-emerald-100">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}
