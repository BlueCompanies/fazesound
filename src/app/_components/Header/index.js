"use client";

import React, { useEffect } from "react";
import { usePlayListHandler } from "@/app/_store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const setPlayListPanel = usePlayListHandler(
    (state) => state.setPlayListPanel
  );

  const playListPanel = usePlayListHandler((state) => state.playListPanel);

  const playListPanelHandler = () => {
    setPlayListPanel(!playListPanel);
  };

  const homeHandler = () => {
    replace(pathname);
  };

  return (
    <header
      style={{
        width: "100%",
        height: "70px",
        background: "#fff",
        borderBottom: "1px solid #dedede",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed", // Make the header fixed
        top: "0", // Position it at the top of the viewport
        zIndex: "999", // Ensure it appears above other content
      }}
    >
      {/*
      <div
        style={{
          position: "absolute",
          left: 1,
          margin: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          background: "#292F33",
        }}
        onClick={playListPanelHandler}
      >
        <span style={{ fontSize: "13px", color: "#fff" }}>Playlist</span>
        <img
          src={"/icons/playlist.svg"}
          style={{ width: "50px", cursor: "pointer" }}
        />
      </div>
       */}

      <button
        style={{
          position: "absolute",
          left: 1,
          margin: "10px",
          border: "none",
          outline: "none",
          padding: "10px",
          backgroundColor: "#000",
          borderRadius: "4px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <a
          style={{
            outline: "none",
            border: "none",
            textDecoration: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "4px",
          }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/@FazeSound-FreeCinematicMusic?sub_confirmation=1"
        >
          Youtube
        </a>
      </button>

      <img
        src={"/brand/logo.svg"}
        onClick={homeHandler}
        style={{ cursor: "pointer" }}
      ></img>
    </header>
  );
}
