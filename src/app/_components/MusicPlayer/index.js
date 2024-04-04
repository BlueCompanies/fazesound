"use client";

import { useCurrentSong, usePlaySong } from "@/app/_store";
import { useEffect, useState } from "react";
import WaveVisualizer from "../WaveVisualizer";
import DownloadSong from "@/app/(root)/_components/Tools/Download";
import ShareSong from "@/app/(root)/_components/Tools/Share";
import AddToPlayList from "@/app/(root)/_components/Tools/AddToPlayList";
import styles from "./styles.module.css";
import YoutubeChanel from "@/app/(root)/_components/Tools/YoutubeChannel";
import { TbGridDots } from "react-icons/tb";

export default function MusicPlayer() {
  const { setIsPlaying, isPlaying } = usePlaySong();
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [songTools, setSongTools] = useState(false);
  const { currentSong } = useCurrentSong();
  const { audio, cover, duration, name, ytLink, audioId } = currentSong;

  const [audioSpectrumWidth, setAudioSpectrumWidth] = useState(
    typeof window !== "undefined" ? null : 0
  );

  useEffect(() => {
    // Update the screenWidth state when the window is resized
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth <= 645) {
          setAudioSpectrumWidth(190);
        }
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

  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const getCurrentSongTime = (currentTime) => {
    setCurrentAudioTime(currentTime);
  };

  const songToolsHandler = () => {
    setSongTools(!songTools);
  };

  return (
    <>
      {Object.entries(currentSong).length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "70px",
            backgroundColor: "#292F33",
            padding: "10px",
            textAlign: "center",
            zIndex: 99999999999,
            borderTop: "1px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          className={styles.songPlayer}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <button
              onClick={playSongHandler}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {isPlaying ? (
                <>
                  <img src={"/icons/pause.svg"} style={{ width: "60px" }}></img>
                </>
              ) : (
                <img
                  src={"/icons/main-play.svg"}
                  style={{ width: "60px" }}
                ></img>
              )}
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "flex-start", // Align items to the left
                margin: "10px",
              }}
            >
              <div className={styles.songCover}>
                <img
                  src={cover}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                  }}
                  key={cover}
                />
              </div>
              <div
                style={{
                  color: "#fff",
                  width: "100px",
                }}
              >
                <p
                  style={{
                    marginLeft: "5px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {name}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "13px",
                position: "relative",
                margin: "5px",
              }}
            >
              {currentAudioTime === 0 ? "00:00" : currentAudioTime}
            </span>
            <div className={styles.audioSpectrum}>
              <WaveVisualizer
                width={"100%"}
                height={60}
                songData={{
                  audio: audio,
                  audioId: audioId,
                }}
                isPlaying={isPlaying}
                isMainSong={true}
                getCurrentSongTime={getCurrentSongTime}
              />
            </div>

            <span className={styles.audioSeparator}>/</span>
            <span
              style={{
                color: "#fff",
                fontSize: "13px",
                position: "relative",
                margin: "5px",
              }}
            >
              {duration}
            </span>
          </div>

          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "50px",
            }}
          >
            <div className={styles.mainSongTools}>
              <YoutubeChanel youtubeLink={ytLink} songName={name} />

              <DownloadSong
                audioData={{
                  audioFile: audio,
                  songName: name,
                }}
              />

              <ShareSong audioFile={audio} />

              <AddToPlayList />
            </div>

            <div className={styles.mobileGridDots} onClick={songToolsHandler}>
              <TbGridDots style={{ fontSize: "30px" }} />
              {songTools && (
                <div
                  style={{
                    position: "absolute",
                    top: "-60px", // Adjust as needed to position the tooltip above the icon
                    left: "-90px",
                    background: "#fff",
                    width: "100px",
                    transform: "translateX(-60%)",
                    transform: "translateY(-70%)",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Add a shadow for better visibility
                    zIndex: "999", // Ensure the tooltip appears above other elements
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ border: "1px solid #dedede" }}>
                      <YoutubeChanel youtubeLink={ytLink} songName={name} />
                    </div>
                    <div style={{ border: "1px solid #dedede" }}>
                      <DownloadSong
                        audioData={{
                          audioFile: audio,
                          songName: name,
                        }}
                      />
                    </div>
                    <div style={{ border: "1px solid #dedede" }}>
                      <ShareSong audioFile={audio} />
                    </div>
                    <div style={{ border: "1px solid #dedede" }}>
                      <AddToPlayList />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
