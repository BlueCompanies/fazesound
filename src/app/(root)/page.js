import Image from "next/image";
import { usePlayListHandler } from "../_store";
import SongsCategories from "./_components/SongsCategories";
import styles from "./styles.module.css";
import SongCategory from "./_components/SongCategory";
import { FaMusic } from "react-icons/fa";
import SongTable from "./_components/SongTable";
import SearchSongBar from "./_components/Search";

export const runtime = "edge";

export default async function Page({ searchParams }) {
  console.log("mrd", searchParams);
  const { query } = searchParams;
  console.log(query);
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
          height: "600px",
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#000",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            height: "50%",
            marginLeft: "50px",
            color: "#fff",
          }}
        >
          <p style={{ fontSize: "40px", fontWeight: 700 }}>
            First website with 100% free music.
          </p>
          <p style={{ fontSize: "30px" }}>Just download and use it.</p>
          <p style={{ fontSize: "20px" }}>
            Free tracks for your podcasts, video games, YouTube channel, and
            everything else you can think of.
          </p>
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex" }}>
              <img
                src={"/icons/no-copyright.webp"}
                style={{ width: "30px" }}
              ></img>
              <span style={{ marginLeft: "5px", fontSize: "26px" }}>
                No copyright
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <img
                src={"/icons/no-attribution.webp"}
                style={{ width: "30px" }}
              ></img>
              <p style={{ marginLeft: "5px", fontSize: "26px" }}>
                No attribution
              </p>
            </div>
          </div>
          {/*
          <button className={styles.exploreMusicBtn}>
            <span>EXPLORE MUSIC</span>
            <FaMusic style={{ marginLeft: "10px" }} />
          </button>
           */}

          <Image
            src={"/images/bottom-arrow.webp"}
            width={100}
            height={100}
            style={{ transform: "rotate(290deg)" }}
            className={styles.arrow}
          ></Image>
        </div>
        <Image
          src={"/images/vinyl.webp"}
          width={400}
          height={400}
          draggable={false}
          objectFit="cover"
          style={{
            position: "absolute",
            right: 0,
          }}
          className={styles.vinylImg}
        ></Image>
      </div>

      <div
        style={{
          background: "#fff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.categories}>
          <SongCategory
            categoryImage={"/icons/categories/cinematic.webp"}
            category={"CINEMATIC"}
          />
          <SongCategory
            categoryImage={"/icons/categories/adventure.webp"}
            category={"ADVENTURE"}
          />
          <SongCategory
            categoryImage={"/icons/categories/action.webp"}
            category={"ACTION"}
          />
          <SongCategory
            categoryImage={"/icons/categories/electronic.webp"}
            category={"ELECTRONIC"}
          />
        </div>
        <SearchSongBar />
        <SongTable query={query} />
      </div>

      {/* Main content 
      
      <div style={{ width: "100%", background: "#515151" }}>
        <SongsCategories searchParams={searchParams} />
      </div>
      */}
    </>
  );
}
