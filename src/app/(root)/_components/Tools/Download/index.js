"use client";

import { useState } from "react";

export default function DownloadSong({ audioData }) {
  const { audioFile, songName } = audioData || {};
  const [showToolTip, setShowToolTip] = useState(false);

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
    <div style={{ position: "relative", marginTop: "1px" }}>
      {showToolTip && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            marginTop: "-30px", // Adjust the marginTop to position the tooltip above the image
            left: "50%", // Center the tooltip horizontally
            transform: "translateX(-50%)", // Center the tooltip horizontally
            width: "100px", // Set width as needed
            textAlign: "center", // Center the text
            borderRadius: "5px", // Add border radius for styling
            fontSize: "14px",
            padding: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Download song
        </div>
      )}
      <img
        src={"/icons/download.svg"}
        style={{
          width: "30px",
          cursor: "pointer",
        }}
        onClick={() => handleAudioDownload(audioFile, songName)}
        alt="Download icon"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      />
    </div>
  );
}
