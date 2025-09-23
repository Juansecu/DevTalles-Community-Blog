import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';

@Injectable()
export class CloudflareR2Service {
  private readonly bucketName: string;
  private readonly s3Client: S3Client;
  private readonly publicDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>(
      'CLOUDFLARE_R2_BUCKET'
    ) as string;
    this.s3Client = new S3Client({
      region: this.configService.get<string>(
        'CLOUDFLARE_R2_BUCKET_HINT',
        'auto'
      ),
      credentials: {
        accessKeyId: this.configService.get<string>(
          'CLOUDFLARE_R2_ACCESS_KEY_ID'
        ) as string,
        secretAccessKey: this.configService.get<string>(
          'CLOUDFLARE_R2_SECRET_ACCESS_KEY'
        ) as string
      },
      endpoint: this.configService.get<string>('CLOUDFLARE_R2_ENDPOINT')
    });
    this.publicDomain = this.configService.get<string>(
      'CLOUDFLARE_R2_PUBLIC_DOMAIN'
    ) as string;
  }

  async uploadFile(
    key: string,
    body: StreamingBlobPayloadInputTypes,
    contentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
    });

    await this.s3Client.send(command);

    // Remove the trailing slash if present
    const domain = this.publicDomain.replace(/\/$/, '');
    return `https://${domain}/${this.bucketName}/${key}`;
  }
}
