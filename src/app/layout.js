import "./globals.css";
import Header from "./_components/Header";
import MusicPlayer from "./_components/MusicPlayer";
import { useCurrentSong } from "./_store";

export const metadata = {
  title: "FazeSound",
  description: "Free Music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8002352274904314"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header />
        {children}

        <MusicPlayer />
      </body>
    </html>
  );
}
