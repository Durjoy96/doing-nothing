export async function apiFetch(url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
      // throw the error so caller can handle it
      throw new Error(data.error || "Something went wrong");
    }
    return data; // success response
  } catch (err) {
    throw err; // network or server error
  }
}
