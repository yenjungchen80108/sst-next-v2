import { S3Client } from "@aws-sdk/client-s3";
// import { fromIni } from "@aws-sdk/credential-providers";

// 初始化 S3 Client (Server-Side)
// [personal]
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
// const s3 = new S3Client({
//   region: "us-east-1", // 替换为你的 AWS 区域
//   credentials: fromIni({ profile: "personal" }), // 指定 personal Profile
// });

export default s3;
