"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchSongBar() {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
  };

  return (
    <>
      <form
        onSubmit={searchSubmit}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
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
          value={searchValue} // Use value instead of defaultValue
        />
        <button
          type="submit"
          style={{
            border: "none",
            outline: "none",
            padding: "5px",
            cursor: "pointer",
            borderRadius: "0px 4px 4px 0px",
            backgroundColor: "#292F33",
            color: "#fff",
            width: "50px",
          }}
        >
          <FaSearch />
        </button>
      </form>
    </>
  );
}
