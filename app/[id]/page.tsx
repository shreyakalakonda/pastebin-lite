"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PastePage() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    fetch(`/api/paste/${id}`, { cache: "no-store" })
      .then(res => {
        if (!res.ok) throw new Error("Expired");
        return res.json();
      })
      .then(data => {
        setContent(data.content);
        setExpiresAt(data.expiresAt);
      })
      .catch(() => {
        setExpired(true);
      });
  }, [id]);

  // ⏱ FRONTEND TIMER
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      if (Date.now() > expiresAt) {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (expired) {
    return (
      <div className="text-red-500 text-center mt-10">
        Paste expired ⏱
      </div>
    );
  }

  if (!content) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <pre className="bg-gray-100 p-4 rounded">{content}</pre>
    </div>
  );
}
