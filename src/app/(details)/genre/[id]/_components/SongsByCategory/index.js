export default function SongsByCategory({ songs }) {
  console.log(songs);
  return (
    <>
      <p>Songs category</p>
      {songs.map((song) => (
        <div key={song.audioId}>{}</div>
      ))}
    </>
  );
}
