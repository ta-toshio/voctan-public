"use client";

import useSWR from "swr";

import {fetcher} from "@/utils/client-fetch";
import {components} from "@/open-api/oa-schema";

type useFetchDocumentProps = {
  id: string;
  interval?: number;
  defaultData?: components['schemas']['DocumentResponse'];
}

type useFetchDocument = (props: useFetchDocumentProps) => {
  data: components['schemas']['DocumentResponse'];
  error: components['schemas']['Error'];
  isLoading: boolean;
}

export const useFetchDocument: useFetchDocument = (props) => {
  const { data, error, isLoading } = useSWR(`/api/bff/documents/${props.id}`, fetcher, {
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
