"use client";

import { usePlaySong } from "@/app/_store";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PlaySong({ currentPlayedSongData }) {
  const [isHoveringCover, setIsHoveringCover] = useState(false);
  const { setIsPlaying } = usePlaySong();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSongCoverInteraction = (isHovering) => {
    setIsHoveringCover(isHovering);
  };

  const playSongHandler = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set("audio", currentPlayedSongData.audio);
    params.set("cover", currentPlayedSongData.cover);
    params.set("duration", currentPlayedSongData.duration);
    params.set("name", currentPlayedSongData.name);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsPlaying(false);
  };

  return (
    <>
      <div
        style={{
          width: "116px",
          height: "100%",
          borderRadius: "8px 0px 0px 8px",
          position: "relative",
        }}
        onMouseEnter={() => handleSongCoverInteraction(true)}
        onMouseLeave={() => handleSongCoverInteraction(false)}
        onClick={(e) => playSongHandler(e)}
      >
        {searchParams.get("cover") === currentPlayedSongData.cover && (
          <>
            <img
              src={"/icons/spinning-play.svg"}
              width={100}
              height={100}
              className={styles.spinningImage}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                marginLeft: "0",
                objectFit: "cover",
                borderRadius: "8px 0px 0px 8px",
                cursor: "pointer",
                opacity: 0.4,
              }}
            />
          </>
        )}

        {isHoveringCover && (
          <>
            <img
              src={
                searchParams.get("cover") === currentPlayedSongData.cover
                  ? null
                  : "/icons/play.svg"
              }
              width={100}
              height={100}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                marginLeft: "0",
                objectFit: "cover",
                borderRadius: "8px 0px 0px 8px",
                cursor: "pointer",
                opacity: 0.4,
              }}
            />
          </>
        )}
        <>
          <img
            src={currentPlayedSongData?.cover}
            width={100}
            height={100}
            style={{
              width: "100%",
              height: "100%",
              marginLeft: "0",
              objectFit: "cover",
              borderRadius: "8px 0px 0px 8px",
              cursor: "pointer",
            }}
          />
        </>
      </div>
    </>
  );
}
