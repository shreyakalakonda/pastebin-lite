async function getPaste(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/paste/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const data = await getPaste(id);

  if (!data) return <h1>Paste not found</h1>;

  return (
    <pre style={{ padding: 20, whiteSpace: "pre-wrap" }}>
      {data.content}
    </pre>
  );
}