import Song from "@/app/(root)/_components/Song";

const getSongsRecommendation = async () => {
  try {
    const response = await fetch(
      `https://us-east-1.aws.data.mongodb-api.com/app/data-oohbz/endpoint/songsRecommendation?ms=${Date.now()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 404 };
  }
};

export default async function SongsRecommendation() {
  const { recommendedSongs } = await getSongsRecommendation();
  console.log(recommendedSongs);

  return (
    <>
      {recommendedSongs.map((song) => (
        <Song song={song} />
      ))}
    </>
  );
}
