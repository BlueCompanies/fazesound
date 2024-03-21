"use client";

import { usePagination } from "@/app/_store";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaMusic } from "react-icons/fa";

export default function SearchSongBar() {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { currentPage, setCurrentPage } = usePagination();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("query", searchValue);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
    setCurrentPage(1);
  };

  const getAllSongsHandler = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={searchSubmit}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            style={{
              border: "none",
              outline: "none",
              padding: "5px",
              width: "100%",
              height: "100%",
            }}
            onChange={(e) => handleInputChange(e)}
            placeholder="Search for genre, moods, song name, and even how you feel..."
          />

          <button
            type="submit"
            style={{
              border: "none",
              outline: "none",
              padding: "5px",
              cursor: "pointer",
              backgroundColor: "#292F33",
              color: "#fff",
              width: "50px",
              fontSize: "12px",
              borderRadius: "0px 4px 4px 0px",
            }}
          >
            <FaSearch />
          </button>
        </form>
        <div
          style={{
            background: "#fff",
            width: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {searchParams.get("query") ? (
            searchParams.get("query").length > 0 && (
              <button
                onClick={getAllSongsHandler}
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "#fff",
                  color: "red",
                  padding: "5px",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                <IoIosCloseCircle style={{ fontSize: "12px" }} />
              </button>
            )
          ) : (
            <button
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#fff",
                color: "#000",
                padding: "5px",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <FaMusic style={{ fontSize: "12px" }} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
