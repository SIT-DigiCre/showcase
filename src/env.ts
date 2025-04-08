import { createEnv } from "valibot-env/nextjs";
import { string, url, pipe } from "valibot";

export const env = createEnv({
  schema: {
    private: {
      GOOGLE_CLIENT_ID: string(),
      GOOGLE_CLIENT_SECRET: string(),
      GOOGLE_HOSTED_DOMAIN: string(),
      NEXTAUTH_SECRET: string(),
      TURSO_DATABASE_URL: pipe(string(), url()),
      TURSO_AUTH_TOKEN: string(),
      WASABI_REGION: string(),
      WASABI_ENDPOINT: pipe(string(), url()),
      WASABI_ACCESS_KEY_ID: string(),
      WASABI_SECRET_ACCESS_KEY: string(),
      WASABI_BUCKET_NAME: string(),
    },
  },
  values: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_HOSTED_DOMAIN: process.env.GOOGLE_HOSTED_DOMAIN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    WASABI_REGION: process.env.WASABI_REGION,
    WASABI_ENDPOINT: process.env.WASABI_ENDPOINT,
    WASABI_ACCESS_KEY_ID: process.env.WASABI_ACCESS_KEY_ID,
    WASABI_SECRET_ACCESS_KEY: process.env.WASABI_SECRET_ACCESS_KEY,
    WASABI_BUCKET_NAME: process.env.WASABI_BUCKET_NAME,
  },
});
