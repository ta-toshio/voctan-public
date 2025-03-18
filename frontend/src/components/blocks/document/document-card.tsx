import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "@formkit/tempo"

import DocumentAction from "@/components/blocks/document/document-action";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { components } from "@/open-api/oa-schema";
import { cn } from "@/libs/utils";

import style from './document-card.module.scss'

type DocumentCardProps = {
  document: components["schemas"]["DocumentResponse"]
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const loading = document.document_import_status &&
    !["COMPLETED", "FAILED"].includes(document.document_import_status.status)

  const showActionMenu = !loading

  return (
    <Link
      href={`/documents/${document.id}`}
      className={cn(
        "flex flex-col h-72 border-2 rounded-xl bg-background",
        loading ? "opacity-60" : ""
      )}
    >
      <div className="flex items-center h-1/2 max-h-1/2 border-b relative">
        <Image
          src={`/images/${document.type.toLowerCase()}.png`}
          alt={document.type} width={100} height={100}
          className="w-2/3 h-2/3 object-cover rounded-md"
        />
        {showActionMenu && (
          <div className="absolute top-1 right-1">
            <DocumentAction documentId={document.id}/>
          </div>)}
        {loading && <LoadingSpinner className="w-8 h-8 absolute right-1 bottom-1"/>}
      </div>
      <div className="h-1/3 pt-2 px-4">
        <p className={cn(style.text, "text-xl")}>{document.name}</p>
      </div>
      <div className="pt-2 px-4">
        <span className="text-sm">{format(document.created_at, "medium")}</span>
      </div>
    </Link>

  )
}
