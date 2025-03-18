import DocumentNew from "@/components/blocks/document/document-new";
import ListDocument from "@/components/blocks/document/list-document";
import { serverHttpClient } from "@/utils/server-fetch";

export default async function LoggedInTopIndex() {
  const { data } = await serverHttpClient.GET('/documents')

  return (
    <div className="grid grid-cols-[repeat(auto-fit,200px)] gap-5">
      <DocumentNew/>
      <ListDocument defaultData={data}/>
    </div>
  );
}
