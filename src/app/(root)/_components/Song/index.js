"use client";

import WaveVisualizer from "@/app/_components/WaveVisualizer";
import SongCover from "../SongCover";
import { useEffect, useState } from "react";
import YoutubeChanel from "../Tools/YoutubeChannel";
import DownloadSong from "../Tools/Download";
import ShareSong from "../Tools/Share";
import AddToPlayList from "../Tools/AddToPlayList";
import styles from "./styles.module.css";
import { TbGridDots } from "react-icons/tb";
import Link from "next/link";

export default function Song({ song }) {
  const [audioSpectrumWidth, setAudioSpectrumWidth] = useState(
    typeof window !== "undefined" ? null : 0
  );
  const [songTools, setSongTools] = useState(false);

  useEffect(() => {
    // Update the screenWidth state when the window is resized
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth <= 645) {
          setAudioSpectrumWidth(180);
        }
        if (window.innerWidth > 645) {
          setAudioSpectrumWidth(240);
        }
        if (window.innerWidth > 1190) {
          setAudioSpectrumWidth(200);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        // Clean up the event listener on unmount
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const songToolsHandler = () => {
    setSongTools(!songTools);
  };

  return (
    <div id="container" className={styles.songContainer}>
      <SongCover
        height={"70px"}
        width={"70px"}
        currentPlayedSongData={{
          name: song.name,
          audio: song.audioFile,
          cover: song.cover,
          duration: song.audioData.duration.minutes,
          ytLink: song.youtubeLink,
          audioId: song.audioId,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          textDecoration: "none",
        }}
        href={`/track/${song.audioId}`}
      >
        <div className={styles.songNameAndArtist}>
          <Link href={`/track/${song.audioId}`} className={styles.songNameText}>
            {song.name}
          </Link>
          <p
            style={{
              fontSize: "10px",
              color: "#dedede",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {song.artist}
          </p>
        </div>
        <div className={styles.audioSpectrum}>
          <div style={{ position: "relative" }}>
            <WaveVisualizer
              width={"100%"}
              height={40}
              songData={{
                audio: song?.audioFile,
                audioId: song?.audioId,
                songName: song.name,
              }}
              isMainSong={false}
              key={song.audioFile}
            />
          </div>
        </div>

        <div className={styles.songLengthAndBPM}>
          <span
            style={{
              fontSize: "12px",
            }}
          >
            {song.audioData.duration.minutes}
          </span>
          <span className={styles.songBPM}>{song.audioData.bpm} BPM</span>
        </div>
        <div className={styles.sideRightTools}>
          <div
            style={{
              height: "100%",
              width: "80px",
              display: "flex",
              flexDirection: "column", // Align tags in a column
              color: "#dedede",
              overflow: "hidden", // Hide overflowing content
              fontSize: "12px",
            }}
          >
            {song.genre.map((genre, index) => (
              <div key={genre + index} style={{ marginTop: "5px" }}>
                <Link href={`/genre/${genre}`} className={styles.genre}>
                  {genre}
                </Link>
              </div>
            ))}
            {song.mood.map((mood, index) => (
              <div
                style={{
                  flex: "1",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  margin: "4px",
                }}
                key={mood + index}
              >
                <span>{mood}</span>
              </div>
            ))}
          </div>

          <div className={styles.songDesktopTools}>
            <YoutubeChanel
              youtubeLink={song.youtubeLink}
              songName={song.name}
            />

            <DownloadSong
              audioData={{
                audioFile: song.audioFile,
                songName: song.name,
              }}
            />

            <ShareSong />

            <AddToPlayList />
          </div>
        </div>
        <div className={styles.mobileGridDots} onClick={songToolsHandler}>
          {songTools && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                background: "#fff",
                transform: "translate(-60px, -60px)",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.6)", // Add a shadow for better visibility
                zIndex: "999", // Ensure the tooltip appears above other elements
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ border: "1px solid #dedede" }}>
                  <YoutubeChanel
                    youtubeLink={song.youtubeLink}
                    songName={song.name}
                  />
                </div>
                <div style={{ border: "1px solid #dedede" }}>
                  <DownloadSong
                    audioData={{
                      audioFile: song.audio,
                      songName: song.name,
                    }}
                  />
                </div>
                <div style={{ border: "1px solid #dedede" }}>
                  <ShareSong audioFile={song.audio} />
                </div>
                <div style={{ border: "1px solid #dedede" }}>
                  <AddToPlayList />
                </div>
              </div>
            </div>
          )}
          <TbGridDots style={{ fontSize: "30px", color: "#fff" }} />
        </div>
      </div>
    </div>
  );
}
