import { Metadata } from "next";

import { fetchDocument } from "@/use-cases/actions/document/fetch-document";
import DocumentIdIndex from "@/app/_pages/document-id";


export const metadata: Metadata = {
  title: 'ドキュメント',
}

export default async function DocumentIdPage({ params }: { params: { id: string } }) {
  const { data } = await fetchDocument(params.id)

  return (
    <DocumentIdIndex defaultData={data} />
  )
}
