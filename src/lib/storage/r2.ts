import "server-only";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

export function isR2Configured() {
  return Boolean(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME && process.env.R2_PUBLIC_URL);
}

export async function createUploadUrl(input: { filename: string; contentType: string; size: number }) {
  if (!isR2Configured()) throw new Error("Cloudflare R2 no está configurado.");
  if (!allowedTypes.has(input.contentType) || input.size <= 0 || input.size > MAX_UPLOAD_BYTES) {
    throw new Error("Archivo no permitido. Se aceptan imágenes y PDF de hasta 10 MB.");
  }
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! },
  });
  const extension = input.filename.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "bin";
  const key = `uploads/${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}.${extension}`;
  const command = new PutObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key, ContentType: input.contentType, ContentLength: input.size });
  return { key, uploadUrl: await getSignedUrl(client, command, { expiresIn: 300 }), publicUrl: `${process.env.R2_PUBLIC_URL!.replace(/\/$/, "")}/${key}` };
}

export async function confirmUploadedFile(key: string, expectedSize: number, expectedType: string) {
  if (!isR2Configured()) throw new Error("Cloudflare R2 no está configurado.");
  const client = new S3Client({ region: "auto", endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! } });
  const { HeadObjectCommand } = await import("@aws-sdk/client-s3");
  const object = await client.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }));
  if (object.ContentLength !== expectedSize || object.ContentType !== expectedType) throw new Error("El archivo cargado no coincide con los datos enviados.");
  return { url: `${process.env.R2_PUBLIC_URL!.replace(/\/$/, "")}/${key}`, filename: key.split("/").pop() ?? "archivo", contentType: object.ContentType, size: object.ContentLength };
}
