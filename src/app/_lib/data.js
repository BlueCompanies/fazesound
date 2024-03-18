export default async function fetchSongs({ currentPage, query }) {
  try {
    const response = await fetch(
      `https://us-east-1.aws.data.mongodb-api.com/app/data-oohbz/endpoint/getAllSongs?ms=${Date.now()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pragma: "no-cache",
          "cache-control": "no-store",
        },
        body: JSON.stringify({
          currentPage,
          query,
        }),
      }
    );
    if (response.status === 200) {
      const data = await response.json();

      return data;
    } else {
      return;
    }
  } catch (error) {
    return { status: 404 };
  }
}
