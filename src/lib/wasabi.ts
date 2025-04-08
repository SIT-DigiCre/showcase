import { env } from "@/env";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: env.WASABI_REGION,
  endpoint: env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: env.WASABI_ACCESS_KEY_ID,
    secretAccessKey: env.WASABI_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(
  key: string,
  file: Buffer,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: env.WASABI_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });
  return s3Client.send(command);
}
