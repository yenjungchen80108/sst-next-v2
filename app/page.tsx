// need the force-dynamic because we don’t want Next.js to cache the pre-signed URL.
export const dynamic = "force-dynamic";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_BUCKET_NAME } from "@/constants/s3";

import Form from "@/components/form";
import styles from "./page.module.css";

export default async function Home() {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: `images/other/${crypto.randomUUID()}`,
    ContentType: "image/jpeg",
    ACL: "public-read", // 如果需要公開讀取
  });

  const url = await getSignedUrl(new S3Client({}), command, {
    expiresIn: 60 * 15, // 15 minutes
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Form url={url} />
      </main>
    </div>
  );
}
