"use client";

import React, { useEffect } from "react";
import { usePlayListHandler } from "@/app/_store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

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

      <div
        style={{
          position: "absolute",
          left: 1,
          margin: "10px",
          width: "350px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "#000",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            padding: "10px",
          }}
        >
          <FaYoutube style={{ fontSize: "21px", marginRight: "5px" }} />
          <a
            style={{
              outline: "none",
              border: "none",
              textDecoration: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@FazeSound-FreeCinematicMusic?sub_confirmation=1"
          >
            Cinematic music
          </a>
        </button>

        <button
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "#000",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <FaYoutube style={{ fontSize: "21px", marginRight: "5px" }} />
          <a
            style={{
              outline: "none",
              border: "none",
              textDecoration: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@FazeSound-FreeElectronic-qv4wo?sub_confirmation=1"
          >
            Electronic music
          </a>
        </button>
      </div>

      <img
        src={"/brand/logo.svg"}
        onClick={homeHandler}
        style={{ cursor: "pointer" }}
      ></img>
    </header>
  );
}
