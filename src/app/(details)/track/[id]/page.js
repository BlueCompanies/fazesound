import DownloadSong from "@/app/(root)/_components/Tools/Download";
import YoutubeChanel from "@/app/(root)/_components/Tools/YoutubeChannel";
import WaveVisualizer from "@/app/_components/WaveVisualizer";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaKey } from "react-icons/fa";
import { IoMusicalNote } from "react-icons/io5";
import { TbLicense } from "react-icons/tb";
import SongCover from "@/app/(root)/_components/SongCover";
import Link from "next/link";
import styles from "./styles.module.css";
import SongsRecommendation from "./_components";
import AddToPlayList from "@/app/(root)/_components/Tools/AddToPlayList";
import { GiDuration } from "react-icons/gi";

const details = async (id) => {
  try {
    const response = await fetch(
      `https://us-east-1.aws.data.mongodb-api.com/app/data-oohbz/endpoint/getSongDetails?ms=${Date.now()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audioId: id }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 404 };
  }
};

export default async function Page(searchParams) {
  const { params } = searchParams;
  const { id } = params;

  const trackDetails = await details(id);

  return (
    <>
      <div
        style={{
          marginTop: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{ background: "#000", width: "100%", height: "300px" }}
        ></div>
        <div
          style={{
            background: "#fff",
            width: "80%",
            height: "150px",
            backgroundColor: "#fff",
            borderRadius: "6px",
            transform: "translateY(-75px)",
            boxShadow: "1px 1px 40px rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0px 10px 10px",
          }}
        >
          <SongCover
            height={"150px"}
            width={"150px"}
            currentPlayedSongData={{
              name: trackDetails.name,
              audio: trackDetails.audioFile,
              cover: trackDetails.cover,
              duration: trackDetails.audioData.duration.minutes,
              ytLink: trackDetails.youtubeLink,
              audioId: trackDetails.audioId,
            }}
          />
          <div
            style={{
              width: "20%",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "initial",
              marginLeft: "10px",
            }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#3B3B3B",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", // Añadido para evitar que el texto se divida en múltiples líneas
                maxWidth: "300px", // Define el ancho máximo del contenedor del texto
              }}
            >
              {trackDetails.name}
            </p>
            <p style={{ fontWeight: 700, color: "#7B7B7B" }}>
              {trackDetails.artist}
            </p>
          </div>
          <div
            style={{
              width: "100%",
              margin: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className={styles.audioSpectrumContainer}>
              <WaveVisualizer
                width={"100%"}
                height={100}
                songData={{
                  audio: trackDetails?.audioFile,
                  audioId: trackDetails?.audioId,
                }}
                isMainSong={false}
                key={trackDetails.audioFile}
              />
            </div>
          </div>

          <div className={styles.songTools}>
            <YoutubeChanel
              youtubeLink={trackDetails.youtubeLink}
              songName={trackDetails.name}
            />

            <DownloadSong
              audioData={{
                audioFile: trackDetails.audioFile,
                songName: trackDetails.name,
              }}
            />

            <AddToPlayList />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "70%", marginTop: "20px" }}>
          <div>
            <p
              style={{ fontSize: "25px", fontWeight: 700, marginTop: "100px" }}
            >
              DURATION
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px",
                  flexDirection: "row",
                }}
              >
                <GiDuration
                  style={{
                    fontSize: "25px",
                    color: "#8C52FF",
                    marginRight: "3px",
                  }}
                />
                Duration:
                {trackDetails.audioData.duration.minutes} minutes /{" "}
                {trackDetails.audioData.duration.seconds} seconds
              </span>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "25px", fontWeight: 700 }}>GENRE</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {trackDetails.genre.map((genre, index) => (
                <Link
                  href={`/genre/${genre}`}
                  key={index}
                  className={styles.genre}
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "25px", fontWeight: 700 }}>MOOD</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {trackDetails.mood.map((mood, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #8C52FF",
                    width: "fit-content",
                    padding: "10px",
                    borderRadius: "6px",
                    margin: "5px",
                    color: "#8C52FF",
                  }}
                >
                  {mood}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "25px", fontWeight: 700 }}>ADITIONAL DATA</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  //color: "#8C52FF",
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "5px",
                    flexDirection: "row",
                  }}
                >
                  <TbActivityHeartbeat
                    style={{ fontSize: "25px", color: "#8C52FF" }}
                  />{" "}
                  BPM:
                  {trackDetails.audioData.bpm}
                </span>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "5px",
                  }}
                >
                  <FaKey
                    style={{
                      fontSize: "18px",
                      marginRight: "3px",
                      color: "#8C52FF",
                    }}
                  />{" "}
                  Key:
                  {trackDetails.audioData.key}
                </span>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "5px",
                  }}
                >
                  <IoMusicalNote
                    style={{
                      fontSize: "18px",
                      marginRight: "3px",
                      color: "#8C52FF",
                    }}
                  />{" "}
                  AltKey:
                  {trackDetails.audioData.key}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "25px", fontWeight: 700 }}>LICENSE</p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px",
                //color: "#8C52FF",
                fontWeight: 700,
                margin: "5px",
              }}
            >
              <TbLicense
                style={{
                  fontSize: "18px",
                  marginRight: "3px",
                  color: "#8C52FF",
                }}
              />{" "}
              License: {trackDetails.license}
            </span>
          </div>
        </div>

        <p
          style={{
            width: "70%",
            fontSize: "25px",
            fontWeight: 700,
            marginTop: "20px",
          }}
        >
          YOU MAY LIKE
        </p>
        <div
          style={{
            width: "70%",
            height: "100%",
            marginBottom: "150px",
          }}
        >
          <SongsRecommendation />
        </div>
      </div>
      <div style={{ height: "200px" }}></div>
    </>
  );
}
