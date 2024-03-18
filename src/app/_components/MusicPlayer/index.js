"use client";

import { usePlaySong } from "@/app/_store";
import Image from "next/image";
import { useState } from "react";
import WaveVisualizer from "../WaveVisualizer";
import DownloadSong from "@/app/(root)/_components/Tools/Download";
import ShareSong from "@/app/(root)/_components/Tools/Share";
import AddToPlayList from "@/app/(root)/_components/Tools/AddToPlayList";
import styles from "./styles.module.css";

export default function MusicPlayer({ searchParams }) {
  const { setIsPlaying, isPlaying } = usePlaySong();
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const getCurrentSongTime = (currentTime) => {
    setCurrentAudioTime(currentTime);
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
            width: "300px", // Initial width
            justifyContent: "flex-start", // Align items to the left
            margin: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              width={60}
              height={60}
              src={searchParams.get("cover")}
              style={{ objectFit: "cover", borderRadius: "50%" }}
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
          <WaveVisualizer
            width={500}
            height={70}
            songData={{ audio: searchParams.get("audio") }}
            isPlaying={isPlaying}
            isMainSong={true}
            getCurrentSongTime={getCurrentSongTime}
          />

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
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <DownloadSong
              audioData={{
                audioFile: searchParams.get("audio"),
                songName: searchParams.get("name"),
              }}
            />

            <ShareSong audioFile={searchParams.get("audio")} />

            <AddToPlayList />
          </div>
        </div>
      </div>
    </>
  );
}
