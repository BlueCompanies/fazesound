"use client";
import { useEffect, useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import styles from "./styles.module.css";
import WaveVisualizer from "../_components/WaveVisualizer";
import { useSearchParams } from "next/navigation";
import AddToPlayList from "./_components/Tools/AddToPlayList";
import DownloadSong from "./_components/Tools/Download";
import ShareSong from "./_components/Tools/Share";
import MusicPlayer from "../_components/MusicPlayer";
import { useCurrentSong } from "../_store";

export default function RootLayout({ children }) {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const searchParams = useSearchParams();

  // sets the current audio volume
  const volumeHandler = (event) => {
    const newVolume = parseFloat(event.target.value);
    if (!isNaN(newVolume) && isFinite(newVolume)) {
      setVolume(newVolume);
    }
  };

  const showVolumeSliderHandler = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  useEffect(() => {
    searchParams.get("audio");
    searchParams.get("cover");
    searchParams.get("duration");
    searchParams.get("name");
  }, [searchParams]);

  // updates the current audio volume
  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setVolume(volume);
    }
  }, [volume]);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
