"use client";

import { Link } from "lucide-react";
import toast from "react-hot-toast";

export function UrlShare() {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied! Share this URL to share your scale.");
  };

  return (
    <button
      onClick={copyUrl}
      className="flex h-7 w-7 items-center justify-center rounded-md text-[#94a3b8] transition-colors hover:bg-[#1e293b] hover:text-[#f8fafc]"
      title="Copy share link"
    >
      <Link className="h-3.5 w-3.5" />
    </button>
  );
}
