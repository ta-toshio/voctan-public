import { components } from "@/open-api/oa-schema";

export const DocumentType: {
  [key in components['schemas']['CreateDocumentRequest']['type']]: components['schemas']['CreateDocumentRequest']['type']
} = {
  BOOK: 'BOOK',
  VIDEO: 'VIDEO',
  WEB: 'WEB',
  TEXT: 'TEXT',
}

export type DocumentType = typeof DocumentType[keyof typeof DocumentType]
