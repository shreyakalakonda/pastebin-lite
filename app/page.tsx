"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [expiresIn, setExpiresIn] = useState(60); // seconds
  const [maxViews, setMaxViews] = useState(1);
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultUrl("");

    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        expiresIn,
        maxViews,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to create paste");
      setLoading(false);
      return;
    }

    setResultUrl(`${window.location.origin}/${data.id}`);
    setContent("");
    setLoading(false);
  }

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Pastebin Lite</h1>

      <form onSubmit={handleSubmit}>
        {/* Paste content */}
        <div style={{ marginBottom: "16px" }}>
          <label>Paste Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
            style={{ width: "100%", marginTop: "6px" }}
          />
        </div>

        {/* Expiry time */}
        <div style={{ marginBottom: "16px" }}>
          <label>Expiry Time (seconds)</label>
          <input
            type="number"
            min={2}
            value={expiresIn}
            onChange={(e) => setExpiresIn(Number(e.target.value))}
            required
            style={{ width: "100%", marginTop: "6px" }}
          />
          <small>Must be greater than 1 second</small>
        </div>

        {/* Max views */}
        <div style={{ marginBottom: "16px" }}>
          <label>Maximum Views</label>
          <input
            type="number"
            min={1}
            max={100}
            value={maxViews}
            onChange={(e) => setMaxViews(Number(e.target.value))}
            required
            style={{ width: "100%", marginTop: "6px" }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Paste"}
        </button>
      </form>

      {/* Error */}
      {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}

      {/* Result */}
      {resultUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Paste created successfully:</p>
          <a href={resultUrl} target="_blank">
            {resultUrl}
          </a>
        </div>
      )}
    </main>
  );
}
