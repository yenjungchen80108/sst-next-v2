import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: Array.from({ length: 20 }, (_, i) => ({
    duration: "30s",
    target: (i + 1) * 5, // 5, 10, ..., 100 VUs
  })),
  thresholds: {
    http_req_failed: ["rate<0.01"], // 失敗率小於 1%
    http_req_duration: ["p(95)<1500"], // 95% 請求低於 1500ms
  },
};

export default function () {
  const res = http.get("https://sst-next-v2.vercel.app/", { timeout: "10s" }); // 10 秒超時
  check(res, {
    "狀態碼為 200": (r) => r.status === 200,
  });
}
