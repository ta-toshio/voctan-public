import React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { components } from "@/open-api/oa-schema";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Progress } from "@/components/ui/progress";

type ImportStatusProps = {
  importStatus?: components["schemas"]["DocumentImportStatusResponse"]
}

export default function ImportStatus({ importStatus }: ImportStatusProps) {
  if (!importStatus) {
    return null
  }

  const createdAtOneHourLater = (new Date(importStatus.created_at)).getTime() + 60 * 60 * 1000
  const isOneHourPassed = new Date().getTime() > createdAtOneHourLater
  if (importStatus.status === 'COMPLETED' && isOneHourPassed) {
    return null
  }

  return (
    <Alert>
      <AlertDescription className="flex flex-col gap-4">
        <div className="flex items-center">
          <LoadingSpinner className="w-8 h-8 inline mr-4"/>
          <span>
          取込み中です。{importStatus.progress} / {importStatus.total_steps} 進行中
          </span>
        </div>
        <Progress value={importStatus.progress / importStatus.total_steps * 100} className=""/>
      </AlertDescription>
    </Alert>
  )
}
