
export const APP_ENV = process.env.APP_ENV;
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

export const API_URL = process.env.API_URL;
export const APP_URL = process.env.APP_URL;

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME

export const APP_ENVS = {
  develop: "devel",
  prod: "prod",
}
export type APP_ENVS = typeof APP_ENVS[keyof typeof APP_ENVS]
