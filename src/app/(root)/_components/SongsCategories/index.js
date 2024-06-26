import SearchSongBar from "../Search";
import WaveVisualizer from "@/app/_components/WaveVisualizer";
import SongTable from "../SongTable";
import { Suspense } from "react";
import SongsLoader from "@/app/_components/SkeletonLoaders/SongsLoader";
import MiniLoader from "@/app/_components/Loaders/MiniLoader";
import SongCategory from "../SongCategory";

export default async function SongsCategories({ searchParams }) {
  const { query, pagination } = searchParams;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "100px",
          background: "#515151",
        }}
      >
        <SongCategory
          categoryName={"Cinematic"}
          categoryIcon={"/icons/categories/cinematic.webp"}
          headerColor={"#272727"}
        />
        <SongCategory categoryName={"Action"} />
        <SongCategory categoryName={"Electronic"} />
      </div>
      {/*
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px", // Adjust marginTop to accommodate the header
            marginBottom: "100px",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              background: "#515151",
              padding: "8px",
            }}
          >
            <div
              style={{
                background: "#292f33",
                width: "fit-content",
                padding: "6px",
                borderRadius: "4px 4px 0px 0px",
              }}
            >
              <p style={{ color: "#fff" }}>
                Just download and use it, new songs everyday.
              </p>
            </div>

            <SearchSongBar />

            <Suspense
              fallback={
                <div
                  style={{
                    position: "absolute",
                    margin: "auto",
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MiniLoader />
                </div>
              }
              key={query}
            >
              <SongTable query={query} pagination={pagination} />
            </Suspense>
          </div>
        </div>
      </div>
               */}
    </>
  );
}
