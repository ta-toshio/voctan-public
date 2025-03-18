import { PanelsTopLeft, FileText, TvMinimalPlay } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PdfSVG from "@/components/elements/svg/pdf";

type DocumentCreateIndexProps = {
  open: boolean
  setOpen: (open: boolean) => void
  setPdfFormOpen: (open: boolean) => void
  setVideoFormOpen: (open: boolean) => void
  setWebFormOpen: (open: boolean) => void
}

export default function DocumentCreateIndex(
  {
    open,
    setOpen,
    setPdfFormOpen,
    setVideoFormOpen,
    setWebFormOpen,
  }: DocumentCreateIndexProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>登録フォーム</DialogTitle>
        </DialogHeader>
        <div className="space-y-1 py-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            onClick={() => {
              setOpen(false)
              setPdfFormOpen(true)
            }}
          >
            <PdfSVG width={24} height={24} className="mr-2"/>
            PDF
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            onClick={() => {
              setOpen(false)
              setVideoFormOpen(true)
            }}
          >
            <TvMinimalPlay className="mr-2"/>
            Youtube URL
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            onClick={() => {
              setOpen(false)
              setWebFormOpen(true)
            }}
          >
            <PanelsTopLeft className="mr-2"/>
            Web Page URL
          </Button>
          {/*
          <Button variant="ghost" className="w-full justify-start text-base" disabled={true}>
            <FileText className="mr-2"/>
            Text
          </Button>
          */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
