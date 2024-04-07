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
  const { audio, audioId, songName } = songData || {};
  const [waveSurfer, setWaveSurfer] = useState(null);
  const waveformRef = useRef(null);
  const [currentFormatedTime, setCurrentFormatedTime] = useState("00:00");
  const currentTimeAudioHandler = () => {
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
      barWidth: 1, // Adjust bar width as needed
      barHeight: 0,
      barGap: 1,
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
        .catch(() => {
          // If the first fetch fails, try the second URL
          fetch(
            `https://fazestore.online/music/${audioId}-${songName}/output.json`
          )
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
            .catch(() => {}); // Add an empty catch block here
        });
    }
  }, [waveSurfer, audio, audioId, songName]);

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
      waveSurfer.on("timeupdate", (e) => {
        const formattedTime = convertDurationToTime(e);
        if (formattedTime) setCurrentFormatedTime(formattedTime);
      });

      return () => {
        waveSurfer.un("audioprocess", handleAudioProcess);
      };
    }
  }, [waveSurfer, currentFormatedTime]);

  useEffect(() => {
    getCurrentSongTime && getCurrentSongTime(currentFormatedTime);
  }, [currentFormatedTime]);

  return <div ref={waveformRef} style={{ width: "100%", height: "100%" }} />;
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
