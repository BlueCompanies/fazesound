"use client";

import fetchSongs from "@/app/_lib/data";
import Pages from "../Pagination/Pages";
import { useEffect, useState } from "react";
import { usePagination } from "@/app/_store";
import Song from "../Song";
import styles from "./styles.module.css";

export default function SongTable({ query, filteredByCategory }) {
  const { currentPage } = usePagination();
  const [songs, setSongs] = useState([]);
  const [songsQueryData, setSongsQueryData] = useState({});

  useEffect(() => {
    const getSongs = async () => {
      const isQuery = query === "" || query === undefined ? "" : query;
      const data = await fetchSongs({
        currentPage,
        query: isQuery,
        filteredByCategory,
      });
      const { totalSongsPerPage, totalSongsPerQuery, totalSongs, totalPages } =
        data;
      console.log(data);
      setSongsQueryData({ totalSongsPerQuery, totalPages });
      setSongs(totalSongsPerPage);
    };

    getSongs();
  }, [currentPage, query]);

  return (
    <>
      <div className={styles.songsContainer}>
        {songs?.length > 0 &&
          songs.map((song) => <Song song={song} key={song} />)}
        <Pages songsQueryData={songsQueryData} />
        <div style={{ height: "100px" }}></div>
      </div>
    </>
  );
}
