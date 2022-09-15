// Import the required AWS SDK clients and commands for Node.js
import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
  ListBucketsCommand,
  S3Client,
  ListObjectsCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import { s3Client } from '../../lib/s3Client'; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class ImageService {
  bucket: string;
  botId: string;
  s3Client: S3Client;
  constructor(bucket: string, s3Client: S3Client) {
    this.bucket = bucket;
    this.s3Client = s3Client;
  }

  async createSignedUrl({ file, filename }: { file: Express.Multer.File; filename: string }) {
    const command = new PutObjectCommand({
      Bucket: process.env.PHOTO_BUCKET,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ChecksumAlgorithm: 'SHA256',
    });
    const signedUrl = await getSignedUrl(this.s3Client, command, {
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
    return this.s3Client.send(command);
  }

  public async deleteFile(fileName: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });
      await this.s3Client.send(command);
    } catch (error) {
      console.error(error);
    }
  }

  public async duplicateExampleBucket() {
    const defaultBucket = { Bucket: process.env.EXAMPLE_BUCKET };
    try {
      const buckets = await this.s3Client.send(new ListBucketsCommand({}));
      if (!buckets?.Buckets?.filter(({ Name }) => Name === this.bucket).length) {
        console.info(`Creating bucket ${this.bucket}`);
        console.info(`Waiting for "${this.bucket}" bucket creation...`);
        await this.s3Client.send(
          new CreateBucketCommand({
            Bucket: this.bucket,
          })
        );
        console.info(`${process.env.PHOTO_BUCKET} successfully created`);
      }
      console.info('Duplicating Policies...');

      // CORS
      const corsData = await this.s3Client.send(new GetBucketCorsCommand(defaultBucket));
      await this.s3Client.send(
        new PutBucketCorsCommand({
          Bucket: this.bucket,
          CORSConfiguration: {
            CORSRules: corsData.CORSRules,
          },
        })
      );

      // POLICIES
      const bucketPolicy = await this.s3Client.send(new GetBucketPolicyCommand(defaultBucket));
      const parsedPolicy = JSON.parse(bucketPolicy.Policy!);
      parsedPolicy.Statement.forEach((state: any) => {
        state.Resource = state.Resource.replace(process.env.EXAMPLE_BUCKET!, this.bucket);
      });

      await this.s3Client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucket,
          Policy: JSON.stringify(parsedPolicy),
        })
      );
    } catch (err) {
      console.error('Error creating bucket', JSON.stringify(err));
    }
  }

  public async copyOrReplaceExampleObjects(): Promise<
    {
      filename: string;
      dimensions: {
        width: number;
        height: number;
      };
      aspectRatio: number;
      size: number;
      bucket: string;
      url: string;
    }[]
  > {
    try {
      // list the objects
      const objects = await this.s3Client.send(
        new ListObjectsCommand({
          Bucket: process.env.EXAMPLE_BUCKET,
        })
      );

      // copy and replace the objects to this.bucket if they don't exist there already
      const copyObjectPromises = objects.Contents?.map(async (object) => {
        const command = new CopyObjectCommand({
          Bucket: this.bucket,
          Key: object.Key!,
          CopySource: `${process.env.EXAMPLE_BUCKET}/${object.Key!}`,
        });
        await this.s3Client.send(command);
      });
      await Promise.all(copyObjectPromises!);
      const exampleImages = (objects.Contents || [])
        .filter(({ Key }) => Key?.includes('example-images'))
        .map(({ Key, Size }) => {
          const [folder, size, filename] = Key!.split('/');
          const [aspectFirst, aspectSecond, width, height] = size.split('-');
          const aspectRatio = parseInt(aspectFirst) / parseInt(aspectSecond);
          return {
            filename,
            aspectRatio,
            dimensions: {
              width: parseInt(width),
              height: parseInt(height),
            },
            url: `https://${this.bucket}.s3.amazonaws.com/${Key}`,
            size: Size!,
            bucket: this.bucket,
          };
        });
      return exampleImages || [];
    } catch (err) {
      console.error('Error copying objects', err);
      return Promise.reject();
    }
  }
}

const imageService = new ImageService(process.env.PHOTO_BUCKET!, s3Client);

export { imageService };
