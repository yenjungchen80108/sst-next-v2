"use client";

import styles from "./form.module.css";
import { useState } from "react";

export default function Form({ url }: { url: string }) {
  const [progress, setProgress] = useState(0);

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();

        const fileInput = (e.target as HTMLFormElement).file;
        const file = fileInput.files?.[0] ?? null;
        if (!file) return;

        // 檔案大小驗證（例如：限制 5MB）
        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
          alert("File is too large. Max 1MB allowed.");
          return;
        }

        // 檔案類型驗證
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
          alert("Only JPG and PNG files are allowed.");
          return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            window.open(url.split("?")[0], "_blank");
          } else {
            alert("Upload failed");
          }
        };

        xhr.onerror = () => alert("Upload error");
        xhr.send(file);
      }}
    >
      <input type="file" name="file" accept="image/png, image/jpeg" />
      <button type="submit">Upload</button>
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>
    </form>
  );
}
