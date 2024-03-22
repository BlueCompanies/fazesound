"use client";

import { useAudioData, usePlaySong } from "@/app/_store";
import Image from "next/image";
import { useEffect, useState } from "react";
import WaveVisualizer from "../WaveVisualizer";
import DownloadSong from "@/app/(root)/_components/Tools/Download";
import ShareSong from "@/app/(root)/_components/Tools/Share";
import AddToPlayList from "@/app/(root)/_components/Tools/AddToPlayList";
import styles from "./styles.module.css";
import YoutubeChanel from "@/app/(root)/_components/Tools/YoutubeChannel";
import { TbGridDots } from "react-icons/tb";

export default function MusicPlayer({ searchParams }) {
  const { setIsPlaying, isPlaying } = usePlaySong();
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [songTools, setSongTools] = useState(false);

  const [audioSpectrumWidth, setAudioSpectrumWidth] = useState(
    typeof window !== "undefined" ? null : 0
  );

  useEffect(() => {
    // Update the screenWidth state when the window is resized
    if (typeof window !== "undefined") {
      const handleResize = () => {
        console.log(window.innerWidth);
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999999999,
          borderTop: "1px solid #fff",
        }}
        className={styles.songPlayer}
      >
        <div
          style={{
            display: "flex",
            minWidth: "15%",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/*
        
          <div
            //onClick={volumeHandler}
            style={{
              outline: "none",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {showVolumeSlider && (
              <div
                style={{
                  position: "absolute",
                  top: "-180px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "160px",
                  backgroundColor: "#292F33",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                }}
              >
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  className={styles.inputRange}
                  onChange={(e) => volumeHandler(e)}
                ></input>
              </div>
            )}
            <img
              src={"/icons/volume.svg"}
              style={{ width: "60px" }}
              onClick={showVolumeSliderHandler}
            />
          </div>
          */}
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
              <img src={"/icons/main-play.svg"} style={{ width: "60px" }}></img>
            )}
          </button>
        </div>
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
              src={searchParams.get("cover")}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
              }}
              key={searchParams.get("cover")}
            />
          </div>
          <span
            style={{
              marginLeft: "5px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis", // Add ellipsis for text overflow
              overflow: "hidden", // Hide overflowed text
              color: "#fff",
            }}
            //className={styles.songName}
          >
            {searchParams.get("name")}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: "40%",
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
              width={audioSpectrumWidth || 240}
              height={60}
              songData={{
                audio: searchParams.get("audio"),
                audioId: searchParams.get("audioId"),
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
            {searchParams.get("duration")}
          </span>
        </div>

        <div
          style={{
            width: "30%",
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            margin: "10px",
            alignItems: "center",
          }}
        >
          <div className={styles.mainSongTools}>
            <YoutubeChanel
              youtubeLink={searchParams.get("ytLink")}
              songName={searchParams.get("name")}
            />

            <DownloadSong
              audioData={{
                audioFile: searchParams.get("audio"),
                songName: searchParams.get("name"),
              }}
            />

            <ShareSong audioFile={searchParams.get("audio")} />

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
                    <YoutubeChanel
                      youtubeLink={searchParams.get("ytLink")}
                      songName={searchParams.get("name")}
                    />
                  </div>
                  <div style={{ border: "1px solid #dedede" }}>
                    <DownloadSong
                      audioData={{
                        audioFile: searchParams.get("audio"),
                        songName: searchParams.get("name"),
                      }}
                    />
                  </div>
                  <div style={{ border: "1px solid #dedede" }}>
                    <ShareSong audioFile={searchParams.get("audio")} />
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
    </>
  );
}
