"use client";

import { ReactElement } from "react";

import DocumentCard from "@/components/blocks/document/document-card";
import { useFetchDocuments } from "@/app/_pages/loggin-in-top/use-fetch-documents";
import { components } from "@/open-api/oa-schema";


type ListDocumentProps = {
  defaultData?: components['schemas']['DocumentPaginationResponse'];
}

export default function ListDocument({ defaultData }: ListDocumentProps): ReactElement {
  const { data } = useFetchDocuments({
    interval: 1000 * 60, // 1 minute
    defaultData,
  })

  return (
    <>
      {data && data.items?.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </>
  )
}
