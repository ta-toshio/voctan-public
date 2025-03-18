"use server"

import { v7 as uuidv7 } from 'uuid';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { S3_BUCKET_NAME } from "@/const";
import { s3Client } from "@/libs/s3";

export const getUploadSignedUrl = async (fileName: string) => {
  const key = `document-pdf/${uuidv7()}/${fileName}`

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: 'application/pdf',
  });

  try {
    const url = await getSignedUrl(
      s3Client,
      command,
      { expiresIn: 60 }
    );

    return { url, key };
  } catch (error) {
    return { error };
  }
}
