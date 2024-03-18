"use client";

export default function DownloadSong({ audioData }) {
  const { audioFile, songName } = audioData || {};

  const handleAudioDownload = async (audioFile, songName) => {
    try {
      const response = await fetch(audioFile);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${songName}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  return (
    <img
      src={"/icons/download.svg"}
      style={{
        width: "30px",
        cursor: "pointer",
      }}
      onClick={() => handleAudioDownload(audioFile, songName)}
      alt="Download icon"
    />
  );
}
