"use client";

import { useAudioData, useCurrentSong, usePlaySong } from "@/app/_store";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function SongCover({ currentPlayedSongData, height, width }) {
  const [isHoveringCover, setIsHoveringCover] = useState(false);
  const { isPlaying, setIsPlaying } = usePlaySong();
  const { setCurrentSong, currentSong } = useCurrentSong();
  const [isCurrentSong, setIsCurrentSong] = useState(false);

  const handleSongCoverInteraction = (isHovering) => {
    setIsHoveringCover(isHovering);
  };

  const { audio, cover, duration, name, ytLink, audioId } =
    currentPlayedSongData;

  const playSongHandler = (e) => {
    e.preventDefault();
    console.log(audio, cover, duration, name, ytLink, audioId);
    setCurrentSong({ audio, cover, duration, name, ytLink, audioId });
  };

  useEffect(() => {
    setIsCurrentSong(cover === currentSong.cover);
    setIsPlaying(false);
  }, [currentSong]);

  const coverStyle = {
    width,
    height,
    transition: "border-radius 0.6s ease",
    borderRadius: isCurrentSong ? "50%" : "8px 0px 0px 8px",
    animation: isCurrentSong ? "spin 10s linear infinite" : "", // Slow and linear rotation animation for the current song
    transformOrigin: "center", // Set the rotation origin to the center of the image
  };

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={cover}
        width={70}
        height={70}
        style={{
          ...coverStyle,
          marginLeft: "0",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={(e) => playSongHandler(e)}
      />
      {isCurrentSong && (
        <>
          <div
            style={{
              color: "#fff",
              position: "absolute",
              top: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={"/icons/play-min.webp"}></img>
          </div>
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg); // Start rotation from 0 degrees
              }
              100% {
                transform: rotate(360deg); // End rotation at 360 degrees
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
