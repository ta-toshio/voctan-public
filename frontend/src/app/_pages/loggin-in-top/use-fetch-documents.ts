"use client";

import useSWR from "swr";

import {fetcher} from "@/utils/client-fetch";
import {components} from "@/open-api/oa-schema";

type useFetchDocumentsProps = {
  interval?: number;
  defaultData?: components['schemas']['DocumentPaginationResponse'];
}

type useFetchDocuments = (props: useFetchDocumentsProps) => {
  data: components['schemas']['DocumentPaginationResponse'];
  error: components['schemas']['Error'];
  isLoading: boolean;
}

export const useFetchDocuments: useFetchDocuments = (props) => {
  const { data, error, isLoading } = useSWR('/api/bff/documents', fetcher, {
    ...(props?.interval ? { refreshInterval: props.interval } : {}),
    fallbackData: props?.defaultData,
    revalidateOnMount: true,
  })

  return {
    data,
    error,
    isLoading
  }
}
