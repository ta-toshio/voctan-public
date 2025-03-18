import { MoreVertical, Edit, Trash2 } from "lucide-react"
import { useCallback } from "react";
import { useSWRConfig } from "swr";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { deleteDocument } from "@/use-cases/actions/document/delete-document";
import { useToast } from "@/hooks/use-toast";
import { deleteDocumentFailed, deleteDocumentSuccess } from "@/message";


export default function DocumentAction({ documentId }: { documentId: string }) {

  const { toast } = useToast()
  const { mutate } = useSWRConfig()

  const handleDelete = useCallback(async () => {
    try {
      const { error } = await deleteDocument(documentId)
      if (error) {
        throw new Error(error.message)
      }

      toast({ title: deleteDocumentSuccess })
      mutate('/api/bff/documents')
    } catch (e) {
      console.error(e)
      toast({ variant: 'destructive', title: deleteDocumentFailed })
      return
    }
  }, [documentId, mutate, toast])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" focusVisible={false}>
          <MoreVertical className="h-4 w-4"/>
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={e => e.stopPropagation()}>
        {/*<DropdownMenuItem*/}
        {/*  onClick={event => event.stopPropagation()}*/}
        {/*  onSelect={(e) => {*/}
        {/*    console.log("title selected")*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Edit className="mr-2 h-4 w-4"/>*/}
        {/*  <span>Edit Title</span>*/}
        {/*</DropdownMenuItem>*/}
        <DropdownMenuItem
          onClick={event => event.stopPropagation()}
          onSelect={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4"/>
          <span>削除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
