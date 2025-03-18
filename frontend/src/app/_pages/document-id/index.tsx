"use client";

import Link from "next/link";
import Image from "next/image";

import ImportStatus from "@/components/blocks/document/import-status";
import { components } from "@/open-api/oa-schema";
import { useRedirectIfError } from "@/hooks/use-redirect";

import { useFetchDocument } from "./use-fetch-document";

type DocumentIdProps = {
  defaultData?: components['schemas']['DocumentResponse'];
}

export default function DocumentIdIndex({ defaultData }: DocumentIdProps) {

  const { data: document, error } = useFetchDocument({
    id: defaultData.id,
    interval: 1000 * 60, // 1 minute
    defaultData,
  })

  useRedirectIfError(error, '取得できませんでした')

  const importStatus = document.document_import_status

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{document.name}</h1>
      <div className="mb-8">
        <ImportStatus importStatus={importStatus}/>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,400px)] gap-8">
        <Link href={`/documents/${document.id}/words`}>
          <div className="h-36 border bg-background rounded-xl flex">
            <div className="w-40 flex justify-center items-center">
              <Image src="/images/sheet2.png" alt="sheet" width={100} height={100} className="rounded-md"/>
            </div>
            <div className="flex flex-col w-full py-8 px-4">
              <h3 className="text-xl font-bold mb-2">すべての単語リスト</h3>
              <span className="text-sm">ここには、ぬきだしたことばを出てきた順番に並べてあるよ&#128077;</span>
            </div>
          </div>
        </Link>
        <div className="h-36 border bg-background rounded-xl flex opacity-60">
          <div className="w-40 flex justify-center items-center">
            <Image src="/images/flashcard.png" alt="sheet" width={100} height={100} className="rounded-md"/>
          </div>
          <div className="flex flex-col w-full py-8 px-4">
            <h3 className="text-xl font-bold mb-2">フラッシュカード</h3>
            <span className="text-sm">作っているとちゅうだよ。もう少し待ってね &#129303;</span>
          </div>
        </div>
      </div>
    </>
  )
}
