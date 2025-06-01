// need the force-dynamic because we don’t want Next.js to cache the pre-signed URL.
export const dynamic = "force-dynamic";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_BUCKET_NAME } from "@/constants/s3";
import s3 from "@/utils/s3";
import Form from "@/components/form";
import styles from "./page.module.css";

export default async function Home() {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: `images/other/${crypto.randomUUID()}`,
    ContentType: "image/jpeg",
    ACL: "public-read", // 如果需要公開讀取
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 900 }); // URL 有效期 15 分钟

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Form url={presignedUrl} />
      </main>
    </div>
  );
}
