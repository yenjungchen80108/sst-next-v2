import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1, // 同時只有 1 個使用者
  duration: "10s", // 測試持續 10 秒
  thresholds: {
    http_req_failed: ["rate<0.1"], // 錯誤率低於 10%
    http_req_duration: ["p(95)<1000"], // 95% 請求低於 1000ms
  },
};

export default function () {
  const res = http.get("https://sst-next-v2.vercel.app/");
  check(res, {
    "狀態碼為 200": (r) => r.status === 200,
  });
  sleep(1);
}
