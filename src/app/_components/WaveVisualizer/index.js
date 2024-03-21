"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveVisualizer({
  width,
  height,
  songData,
  isMainSong,
  isPlaying,
  getCurrentSongTime,
}) {
  const { audio, audioId } = songData || {};
  const [waveSurfer, setWaveSurfer] = useState(null);
  const waveformRef = useRef(null);
  const [currentFormatedTime, setCurrentFormatedTime] = useState("00:00");
  const currentTimeAudioHandler = () => {
    console.log("jiji: ", currentTime);
    if (waveSurfer.isPlaying()) {
      const currentTime = waveSurfer.getCurrentTime();
      const formattedTime = convertDurationToTime(currentTime);
      getCurrentSongTime(formattedTime);
    }
  };

  const manualTimeAudioHandler = () => {
    const currentTime = waveSurfer.getCurrentTime();
    const formattedTime = convertDurationToTime(currentTime);
    getCurrentSongTime(formattedTime);
  };

  useEffect(() => {
    if (!audio) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#7B7B7B", // Adjust color as needed
      progressColor: "#dedede", // Adjust color as needed
      barWidth: 0, // Adjust bar width as needed
      barHeight: 0,
      barGap: 0,
      height,
      width,
      cursorWidth: 0,
      cursorHeight: 0,
      interact: isMainSong ? true : false,
    });

    setWaveSurfer(wavesurfer);

    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
    };
  }, [audio]);

  useEffect(() => {
    waveSurfer && waveSurfer.playPause();
  }, [isPlaying]);

  useEffect(() => {
    if (audio && waveSurfer) {
      console.log("pouta merida de vida: ", audioId);
      fetch(`https://fazestore.online/audiowaves/${audioId}-output.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((peaks) => {
          if (waveSurfer) {
            waveSurfer.load(audio, peaks.data);
          }
        })
        .catch((e) => {
          console.error("error", e);
        });
    }
  }, [waveSurfer, audio]);

  // sets the currentFormatedTime if formattedTime is different, so it updates the state
  // then, in the second useEffect we call the function with the updated state, so we dont call it multiple times
  useEffect(() => {
    if (waveSurfer) {
      const handleAudioProcess = (currentTime) => {
        const formattedTime = convertDurationToTime(currentTime);
        if (formattedTime !== currentFormatedTime) {
          setCurrentFormatedTime(formattedTime);
        }
      };

      waveSurfer.on("audioprocess", handleAudioProcess);

      return () => {
        waveSurfer.un("audioprocess", handleAudioProcess);
      };
    }
  }, [waveSurfer, currentFormatedTime]);

  useEffect(() => {
    getCurrentSongTime && getCurrentSongTime(currentFormatedTime);
  }, [currentFormatedTime]);

  return (
    <div style={{ position: "relative", width, height }}>
      <div ref={waveformRef} style={{ width: "100%", height: "100%" }} />
    </div>
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
