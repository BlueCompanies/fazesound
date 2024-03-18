"use client";

import React, { useEffect } from "react";
import { usePlayListHandler } from "@/app/_store";

export default function Header() {
  const setPlayListPanel = usePlayListHandler(
    (state) => state.setPlayListPanel
  );

  const playListPanel = usePlayListHandler((state) => state.playListPanel);

  const playListPanelHandler = () => {
    setPlayListPanel(!playListPanel);
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
      <img src={"/brand/logo.svg"}></img>
    </header>
  );
}
