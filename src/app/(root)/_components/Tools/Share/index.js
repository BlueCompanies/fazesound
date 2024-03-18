"use client";

import { useState } from "react";

export default function ShareSong() {
  const [showToolTip, setShowToolTip] = useState(false); // Initialize showToolTip state to false
  return (
    <>
      <div style={{ position: "relative", marginTop: "1px" }}>
        {showToolTip && (
          <div
            style={{
              position: "absolute",
              background: "#fff",
              marginTop: "-30px", // Adjust the marginTop to position the tooltip above the image
              left: "50%", // Center the tooltip horizontally
              transform: "translateX(-50%)", // Center the tooltip horizontally
              width: "100px", // Set width as needed
              textAlign: "center", // Center the text
              borderRadius: "5px", // Add border radius for styling
              fontSize: "14px",
              padding: "4px",
            }}
          >
            Coming soon
          </div>
        )}
        <img
          src={"/icons/share.svg"}
          style={{
            width: "30px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        ></img>
      </div>
    </>
  );
}
