"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function YoutubeChanel({ youtubeLink, songName }) {
  const [showToolTip, setShowToolTip] = useState(false); // Initialize showToolTip state to false

  return (
    <>
      <div style={{ position: "relative", marginTop: "1px" }}>
        {showToolTip && (
          <div
            style={{
              position: "absolute",
              background: "#fff",
              marginTop: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              borderRadius: "5px",
              fontSize: "14px",
              padding: "4px",
              whiteSpace: "nowrap", // Prevent text from wrapping
            }}
          >
            {songName} on Youtube
          </div>
        )}

        <a target="_blank" rel="noopener noreferrer" href={youtubeLink}>
          <img
            src={"/icons/youtube.svg"}
            style={{
              width: "30px",
              cursor: "pointer",
              marginRight: "3px",
            }}
            onMouseEnter={() => setShowToolTip(true)}
            onMouseLeave={() => setShowToolTip(false)}
          ></img>
        </a>
      </div>
    </>
  );
}
