import Header from "./_components/Header";
import "./globals.css";

export const metadata = {
  title: "FazeSound",
  description: "Free Music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
