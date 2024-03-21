"use client";

import WaveVisualizer from "@/app/_components/WaveVisualizer";
import fetchSongs from "@/app/_lib/data";
import PlaySong from "../PlaySong";
import AddToPlayList from "../Tools/AddToPlayList";
import ShareSong from "../Tools/Share";
import DownloadSong from "../Tools/Download";
import YoutubeChanel from "../Tools/YoutubeChannel";
import Pages from "../Pagination/Pages";
import { useEffect, useState } from "react";
import { usePagination } from "@/app/_store";
import { usePathname, useSearchParams } from "next/navigation";

export default function SongTable({ query }) {
  const { currentPage, setCurrentPage } = usePagination();
  const [songs, setSongs] = useState([]);
  const [songsQueryData, setSongsQueryData] = useState({});

  useEffect(() => {
    const getSongs = async () => {
      const isQuery = query === "" || query === undefined ? "" : query;
      const data = await fetchSongs({ currentPage, query: isQuery });
      const { totalSongsPerPage, totalSongsPerQuery, totalSongs, totalPages } =
        data;
      setSongsQueryData({ totalSongsPerQuery, totalPages });
      setSongs(totalSongsPerPage);
    };

    getSongs();
  }, [currentPage]);

  return (
    <>
      <Pages songsQueryData={songsQueryData} />
      {songs.map((song, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#292F33",
            width: "100%",
            height: "90px",
            borderRadius: "8px",
            marginTop: "5px",
          }}
          key={song.audioFile}
          id="container"
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
              }}
            >
              <div style={{ position: "relative" }}>
                <WaveVisualizer
                  width={240}
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
                  width: "240px",
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

            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            >
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

              <div
                style={{
                  display: "flex",
                  minWidth: "100px",
                  justifyContent: "space-between",
                }}
              >
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
      ))}
    </>
  );
}
