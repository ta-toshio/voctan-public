"use client";

import useSWR from "swr";

import { fetcher } from "@/utils/client-fetch";
import { components } from "@/open-api/oa-schema";

type useFetchDocumentWordsProps = {
  id: string;
  page: number;
  search?: string;
  defaultData?: components['schemas']['DocumentWordPaginationResponse'];
}

type useFetchDocumentWords = (props: useFetchDocumentWordsProps) => {
  data: components['schemas']['DocumentWordPaginationResponse'];
  error: components['schemas']['Error'];
  isLoading: boolean;
}

export const useFetchDocumentWords: useFetchDocumentWords = (props) => {
  const { data, error, isLoading } = useSWR(
    [ `/api/bff/documents/${props.id}/words`, props.page, props.search ],
    ([url, page, search]) => fetcher(`${url}?${new URLSearchParams({
      page: page.toString(),
      search: search || ""
    }).toString()}` ),
    {
      fallbackData: props?.defaultData,
      revalidateOnMount: true,
    }
  )

  return {
    data,
    error,
    isLoading
  }
}
