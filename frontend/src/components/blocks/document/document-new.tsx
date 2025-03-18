"use client"

import {useCallback, useState} from "react";

import {cn} from "@/libs/utils";
import style from "@/components/blocks/document/document-new.module.scss";
import DocumentCreateIndex from "@/components/blocks/document/create-index";
import CreateFromPdf from "@/components/blocks/document/create-from-pdf";
import CreateFromVideo from "@/components/blocks/document/create-from-video";
import CreateFromWeb from "@/components/blocks/document/create-from-web";

export default function DocumentNew() {
  const [open, setOpen] = useState(false);
  const [pdfFormOpen, setPdfFormOpen] = useState(false);
  const [videoFormOpen, setVideoFormOpen] = useState(false);
  const [webFormOpen, setWebFormOpen] = useState(false);

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <DocumentCreateIndex
        open={open}
        setOpen={setOpen}
        setPdfFormOpen={setPdfFormOpen}
        setVideoFormOpen={setVideoFormOpen}
        setWebFormOpen={setWebFormOpen}
      />
      <CreateFromPdf open={pdfFormOpen} setOpen={setPdfFormOpen} />
      <CreateFromVideo open={videoFormOpen} setOpen={setVideoFormOpen} />
      <CreateFromWeb open={webFormOpen} setOpen={setWebFormOpen} />
      <button
        className={cn(style.document, "h-72 rounded-xl")}
        onClick={onClick}
      >
        <div className="font-bold text-9xl">+</div>
        新しい単語帳を作成
      </button>
    </>
  );
}
