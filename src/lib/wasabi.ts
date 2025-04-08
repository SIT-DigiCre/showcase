import { env } from "@/env";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

const s3Client = new S3Client({
  region: env.WASABI_REGION,
  endpoint: env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: env.WASABI_ACCESS_KEY_ID,
    secretAccessKey: env.WASABI_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(
  file: File,
  options: {
    prefix: string;
  }
) {
  const key = `${options.prefix}/${nanoid()}`;
  const fileBuffer = await file.arrayBuffer();
  const uint8FileData = new Uint8Array(fileBuffer);
  const command = new PutObjectCommand({
    Bucket: env.WASABI_BUCKET_NAME,
    Key: key,
    Body: uint8FileData,
    ContentType: file.type,
    ACL: "public-read",
  });
  await s3Client.send(command);
  return `https://${env.WASABI_BUCKET_NAME}.s3.wasabisys.com/${key}`;
}
