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
import Song from "../Song";

export default function SongTable({ query }) {
  const { currentPage } = usePagination();
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
      {songs.length > 0 && songs.map((song, index) => <Song song={song} />)}
    </>
  );
}
