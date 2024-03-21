import { usePlayListHandler } from "../_store";
import Songs from "./_components/SongsArea";
//import styles from "./page.module.css";

export const runtime = "edge";

export default async function Page({ searchParams }) {
  //const [playlist, setPlaylist] = useState([]);
  // const playListPanel = usePlayListHandler((state) => state.playListPanel);

  /*
  const getAllSongs = async () => {
    const { currentPage } = await request.json();
    try {
      const response = await fetch(
        `https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/getDesigns?ms=${Date.now()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "api-key":
              "s5lWj1OL7r578NX3d8dcJ6TOfNrTPjQp3gfzWdF0trpmQEOX1z7DStx8eCwk7SfG",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "cache-control": "no-store",
          },
          body: JSON.stringify({
            currentPage,
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();

        return data;
      } else {
        return;
      }
    } catch (error) {
      return NextResponse.json({}, { status: 404 });
    }
  };

  getAllSongs();
   */

  return (
    <>
      {/*
      {playListPanel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "300px",
            height: "82.5%",
            marginTop: "70px",
            background: "lightgray",
            overflowY: "auto", // Add overflowY to enable scrolling if needed
            zIndex: 999, // Ensure the side panel appears above other content
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      )}
       */}

      <div
        style={{
          width: "100%",
          background: "#fff",
          height: "400px",
          color: "#000",
          marginTop: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "55px" }}>Enjoy music completely free</span>{" "}
          <span style={{ fontSize: "55px" }}>
            without having to give attributions
          </span>
        </p>
        <p style={{ fontSize: "22px" }}>
          We&apos;re aiming to make it increasingly easier for creators to
          implement music in their creations.
        </p>
      </div>

      {/* Main content */}
      <div style={{ width: "100%", background: "#515151" }}>
        <Songs searchParams={searchParams} />
      </div>
    </>
  );
}
