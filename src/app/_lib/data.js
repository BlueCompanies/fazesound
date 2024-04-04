export default async function fetchSongs({
  currentPage,
  query,
  filteredByCategory,
}) {
  const { filtered, genre } = filteredByCategory || "";

  if (filtered) {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/data-oohbz/endpoint/getSongsByCategory?ms=${Date.now()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genre, currentPage: 1 }),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { status: 404 };
    }
  }

  try {
    const response = await fetch(
      `https://us-east-1.aws.data.mongodb-api.com/app/data-oohbz/endpoint/getAllSongs?ms=${Date.now()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
