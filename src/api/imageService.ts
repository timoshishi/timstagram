// Import the required AWS SDK clients and commands for Node.js
import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  GetBucketCorsCommand,
  GetBucketAclCommand,
  PutBucketCorsCommand,
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
} from '@aws-sdk/client-s3';
import { s3Client } from '../lib/s3Client'; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class ImageService {
  bucket: string;
  botId: string;
  constructor(bucket: string) {
    this.bucket = bucket;
  }

  async createSignedUrl({ file, filename }: { file: Express.Multer.File; filename: string }) {
    const command = new PutObjectCommand({
      Bucket: process.env.PHOTO_BUCKET,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ChecksumAlgorithm: 'SHA256',
    });
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });
    return signedUrl;
  }

  async uploadFileToS3({ file, filename }: { file: Buffer; filename: string }) {
    const command = new PutObjectCommand({
      Bucket: process.env.PHOTO_BUCKET,
      Key: filename,
      Body: file,
      // ContentType: file.mimetype,
    });
    return s3Client.send(command);
  }

  public async deleteFile(fileName: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });
      await s3Client.send(command);
    } catch (error) {
      console.error(error);
    }
  }

  public async duplicateExampleBucket() {
    const defaultBucket = { Bucket: process.env.EXAMPLE_BUCKET };
    try {
      const acl = await s3Client.send(new GetBucketAclCommand(defaultBucket));
      console.log('ACL', JSON.stringify(acl));
      console.log(`Creating bucket ${this.bucket}`);
      await s3Client.send(
        new CreateBucketCommand({
          Bucket: this.bucket,
        })
      );
      console.log(`Waiting for "${this.bucket}" bucket creation...`);

      // duplicate corsPolicies
      const corsData = await s3Client.send(new GetBucketCorsCommand(defaultBucket));
      const corsUpdate = await s3Client.send(
        new PutBucketCorsCommand({
          Bucket: this.bucket,
          CORSConfiguration: {
            CORSRules: corsData.CORSRules,
          },
        })
      );
      console.log('Cors Policy', JSON.stringify(corsUpdate));

      const bucketPolicy = await s3Client.send(new GetBucketPolicyCommand(defaultBucket));
      console.log('original bucket policy', JSON.stringify(bucketPolicy.Policy));
      const updatePolicy = await s3Client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucket,
          Policy: bucketPolicy.Policy,
        })
      );
      console.log('Bucket Policy', JSON.stringify(updatePolicy));
      console.log('ACL', JSON.stringify(acl));
    } catch (err) {
      console.log('Error creating bucket', err);
    }
  }
}

const imageService = new ImageService(process.env.PHOTO_BUCKET!);

export { imageService };
