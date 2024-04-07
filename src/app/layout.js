import "./globals.css";
import Header from "./_components/Header";
import MusicPlayer from "./_components/MusicPlayer";
import { useCurrentSong } from "./_store";
import Link from "next/link";

export const metadata = {
  title: "FazeSound",
  description: "Free Music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Header />
        <main>{children}</main>
        <MusicPlayer />
        <div style={{ background: "red", width: "100%" }}></div>
        <footer
          style={{
            height: "300px",
            background: "#292F33",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link
              href="/privacy-policy"
              style={{
                margin: "10px",
                textDecoration: "underline",
                color: "#fff",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              style={{
                margin: "10px",
                textDecoration: "underline",
                color: "#fff",
              }}
            >
              Terms of Service
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
