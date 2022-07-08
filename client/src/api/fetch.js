export default async function (...args) {
  try {
    const res = await fetch(...args);
    const json = res.status === 204 ? { deleted: true } : await res.json();
    return json;
  } catch (error) {
    throw new Error(`Fetch error: ${error}`);
  }
}
