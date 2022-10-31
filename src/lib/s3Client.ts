import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.A_ACCESS_KEY_ID!,
    secretAccessKey: process.env.A_SECRET_KEY!,
  },
});

export { s3Client };
