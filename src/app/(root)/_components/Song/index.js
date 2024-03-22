"use client";

import WaveVisualizer from "@/app/_components/WaveVisualizer";
import PlaySong from "../PlaySong";
import { useEffect, useState } from "react";
import YoutubeChanel from "../Tools/YoutubeChannel";
import DownloadSong from "../Tools/Download";
import ShareSong from "../Tools/Share";
import AddToPlayList from "../Tools/AddToPlayList";
import styles from "./styles.module.css";

export default function Song({ song }) {
  const [audioSpectrumWidth, setAudioSpectrumWidth] = useState(
    typeof window !== "undefined" ? null : 0
  );

  useEffect(() => {
    // Update the screenWidth state when the window is resized
    if (typeof window !== "undefined") {
      const handleResize = () => {
        console.log(window.innerWidth);
        if (window.innerWidth <= 645) {
          setAudioSpectrumWidth(180);
        }
        if (window.innerWidth > 645) {
          setAudioSpectrumWidth(240);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        // Clean up the event listener on unmount
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    console.log(audioSpectrumWidth);
  }, [audioSpectrumWidth]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#292F33",
        height: "90px",
        borderRadius: "8px",
        marginTop: "5px",
      }}
      id="container"
      className={styles.songContainer}
    >
      <PlaySong
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "4px",
            width: "100%",
          }}
        >
          <div
            style={{ position: "relative" }}
            className={styles.audioSpectrum}
          >
            <WaveVisualizer
              width={audioSpectrumWidth || 240}
              height={40}
              songData={{
                audio: song?.audioFile,
                audioId: song?.audioId,
              }}
              isMainSong={false}
              key={song.audioFile}
            />
          </div>
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <p
              style={{
                color: "#dedede",
                margin: "0",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginTop: "5px",
                fontSize: "13px",
              }}
            >
              {song.name}
            </p>
          </div>
        </div>

        <div style={{}} className={styles.sideRightTools}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#dedede",
              fontSize: "12px",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <span>{song.audioData.duration.minutes}</span>
            <span>{song.audioData.bpm} BPM</span>
          </div>
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
              <div
                style={{
                  flex: "1",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  margin: "4px",
                }}
                key={genre + index}
              >
                <span>{genre}</span>
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

          <div className={styles.songTools}>
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
      </div>
    </div>
  );
}
