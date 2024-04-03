const POST_URL = "http://localhost:4000/posts";

export async function getPosts() {
  const res = await fetch(POST_URL, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
}
