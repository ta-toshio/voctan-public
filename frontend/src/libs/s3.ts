import {S3Client} from "@aws-sdk/client-s3";

const s3ClientSingleton = () => {
  return new S3Client({
    region: process.env.V_AWS_REGION,
    credentials: {
      accessKeyId: process.env.V_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.V_AWS_SECRET_ACCESS_KEY,
    },
  });
}

declare const globalThis: {
  s3Global: ReturnType<typeof s3ClientSingleton>;
} & typeof global;

export const s3Client = globalThis.s3Global ?? s3ClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.s3Global = s3Client
