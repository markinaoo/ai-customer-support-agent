"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadQrButton({
  svg,
  fileName
}: {
  svg: string;
  fileName: string;
}) {
  function handleDownload() {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleDownload}>
      <Download className="h-4 w-4" aria-hidden="true" />
      下载二维码
    </Button>
  );
}
