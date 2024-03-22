"use client";

import fetchSongs from "@/app/_lib/data";
import { usePagination } from "@/app/_store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pages({ songsQueryData, songs }) {
  const { currentPage, setCurrentPage } = usePagination();
  const [pageNumbers, setPageNumbers] = useState([]);
  const manualPaginationHandler = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    let totalSongsPerPage = 15; // Define the limit of songs per page
    let totalSongs = songsQueryData.totalSongsPerQuery;
    let totalPages = Math.ceil(totalSongs / totalSongsPerPage);

    // If there is only one page, set pageNumbers to contain only one page number
    if (totalPages === 1) {
      setPageNumbers([1]);
      return;
    }

    // Otherwise, create pageNumbers array with the appropriate range of page numbers
    let pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    setPageNumbers(pageNumbers);
  }, [songsQueryData]);

  return (
    <div style={{ color: "#fff" }}>
      <div style={{ display: "flex" }}>
        {pageNumbers.map((page, index) => (
          <div
            key={index}
            style={{
              width: "20px",
              padding: "10px",
              background: currentPage === page ? "#fff" : "#292f33",
              color: currentPage === page ? "#292f33" : "#fff",
              display: "flex",
              justifyContent: "center",
              borderRadius:
                index === pageNumbers.length - 1
                  ? "0px 0px 4px 0px"
                  : pageNumbers.length === 0 && "p4x",
              cursor: "pointer",
            }}
            onClick={() => manualPaginationHandler(page)}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}
