"use client";

import React, { useEffect, useState } from "react";
import { useCurrentSong, usePlayListHandler } from "@/app/_store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import styles from "./styles.module.css";
import { FaLightbulb } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export default function Header() {
  const [showChannels, setShowChannels] = useState(false);
  const { setCurrentSong } = useCurrentSong();
  const { replace } = useRouter();

  const setPlayListPanel = usePlayListHandler(
    (state) => state.setPlayListPanel
  );

  const playListPanel = usePlayListHandler((state) => state.playListPanel);

  const playListPanelHandler = () => {
    setPlayListPanel(!playListPanel);
  };

  const homeHandler = () => {
    replace("/");
  };

  const openYtChannels = () => {
    setShowChannels(!showChannels);
  };

  const resetVariables = () => {
    setCurrentSong({});
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
        backgroundColor: "#fff",
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

      <div className={styles.desktopYtBtns}>
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
          <FaYoutube style={{ fontSize: "21px" }} />
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

      <div className={styles.mobileYtBtns}>
        <div
          style={{
            width: "80px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <FaYoutube
            style={{
              fontSize: "50px",
              cursor: "pointer",
              position: "absolute",
            }}
            onClick={openYtChannels}
          />
        </div>

        {showChannels && (
          <div
            style={{
              position: "absolute",
              background: "#fff",
              marginTop: "120px",
              left: "25%",
              transform: "translateX(-50%)",
              textAlign: "center",
              borderRadius: "5px",
              fontSize: "14px",
              padding: "4px",
              whiteSpace: "nowrap",
              height: "70px",
            }}
          >
            <button
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <FaYoutube style={{ fontSize: "21px" }} />
              <a
                style={{
                  outline: "none",
                  border: "none",
                  textDecoration: "none",
                  color: "#fff",
                  cursor: "pointer",
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
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "50%",
                width: "100%",
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
        )}
      </div>

      <img
        src={"/brand/logo.svg"}
        onClick={homeHandler}
        style={{ cursor: "pointer" }}
      ></img>

      <div
        style={{
          position: "absolute",
          right: 0,
          margin: "20px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link
          style={{
            padding: "15px",
            borderRadius: "4px",
            background: "#000",
            color: "#fff",
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
          }}
          href="/how-it-works"
        >
          <IoSettingsSharp style={{ marginRight: "5px" }} />
          HOW IT WORKS
        </Link>
        {/*
        <Link
          style={{
            padding: "15px",
            borderRadius: "4px",
            background: "#000",
            color: "#fff",
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={resetVariables}
          href="/blog"
        >
          <FaLightbulb style={{ marginRight: "5px" }} />
          LEARN
        </Link>
         */}
      </div>
    </header>
  );
}
