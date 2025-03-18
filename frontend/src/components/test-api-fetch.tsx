"use client"

import useSWR from "swr";

import {fetcher} from "@/utils/client-fetch";

export default function TestApiFetch() {
  const { data, error, isLoading } = useSWR('/api/bff/document', fetcher, {
    refreshInterval: 10000,
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>Failed to load</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  )
}
