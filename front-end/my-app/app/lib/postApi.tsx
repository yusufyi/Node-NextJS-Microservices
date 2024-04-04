const POST_URL = "http://localhost:4000/posts";
const ADDPOST_URL = "http://localhost:4001/posts";

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

export async function addPost(content: string, user: Object) {
  const res = await fetch(ADDPOST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  if (!res.ok) {
    throw new Error("Failed to add post");
  }
  return res.json();
}
