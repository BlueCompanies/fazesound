"use client";

import { usePlaySong } from "@/app/_store";
import WavesurferPlayer from "@wavesurfer/react";
import { useEffect, useState } from "react";
import MiniLoader from "../Loaders/MiniLoader";

export default function WaveVisualizer({
  width,
  height,
  songData,
  isPlaying,
  isMainSong,
  getCurrentSongTime,
}) {
  const { audio } = songData || {};
  const [wavesurfer, setWavesurfer] = useState(null);
  const [loading, setLoading] = useState(true);

  const onReady = (ws) => {
    setLoading(false);
    setWavesurfer(ws);
    const audioDuration = ws.getDuration();
    const formattedTime = convertDurationToTime(audioDuration);
    setAudioLength(formattedTime);
  };

  const currentTimeAudioHandler = () => {
    if (wavesurfer.isPlaying()) {
      const currentTime = wavesurfer.getCurrentTime();
      const formattedTime = convertDurationToTime(currentTime);
      getCurrentSongTime(formattedTime);
    }
  };

  const manualTimeAudioHandler = () => {
    const currentTime = wavesurfer.getCurrentTime();
    const formattedTime = convertDurationToTime(currentTime);
    getCurrentSongTime(formattedTime);
  };

  useEffect(() => {
    wavesurfer && wavesurfer.playPause();
  }, [isPlaying]);

  // switchs loading to true when the audioFile has changed, then "onReady" set loading back to false when the audioFile has laoded.
  useEffect(() => {
    setLoading(true);
  }, [audio]);

  return (
    <>
      <div style={{ width, height, position: "relative" }}>
        {loading && (
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MiniLoader />
          </div>
        )}
        <WavesurferPlayer
          width={width}
          height={height}
          cursorColor={"#fff"}
          waveColor={"#7B7B7B"}
          progressColor={"#dedede"}
          cursorWidth={isMainSong ? 2 : 0}
          cursorHeight={isMainSong ? 1 : 0}
          // Set a bar width
          barWidth={isMainSong ? 2 : 0}
          // Optionally, specify the spacing between bars
          barGap={isMainSong ? 1 : 0}
          // And the bar radius
          barRadius={isMainSong ? 2 : 0}
          interact={isMainSong ? true : false}
          url={audio}
          onReady={onReady}
          onAudioprocess={currentTimeAudioHandler}
          onClick={manualTimeAudioHandler}
        />
      </div>
    </>
  );
}

function convertDurationToTime(duration) {
  // Get the integer part of the duration
  const totalSeconds = Math.floor(duration);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Format the time
  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, "0")}:`;
  }
  formattedTime += `${minutes.toString().padStart(2, "0")}:${(totalSeconds % 60)
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}
