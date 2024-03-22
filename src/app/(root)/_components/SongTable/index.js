"use client";

import fetchSongs from "@/app/_lib/data";
import Pages from "../Pagination/Pages";
import { useEffect, useState } from "react";
import { usePagination } from "@/app/_store";
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
      {songs.length > 0 &&
        songs.map((song, index) => (
          <div key={index}>
            <Song song={song} />
          </div>
        ))}
    </>
  );
}
