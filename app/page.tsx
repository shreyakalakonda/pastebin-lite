"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  async function createPaste() {
    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });

    const data = await res.json();
    console.log(data);
    setLink(`${window.location.origin}/${data.id}`);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={10}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
      />

      <br />
      <button onClick={createPaste}>Create Paste</button>

      {link && (
        <p>
          Your paste link: <a href={link}>{link}</a>
        </p>
      )}
    </main>
  );
}
