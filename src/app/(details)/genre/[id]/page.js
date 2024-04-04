import { useParams, useSearchParams } from "next/navigation";
import SongTable from "@/app/(root)/_components/SongTable";

export const runtime = "edge";

export default function Page({ params }) {
  const { id } = params;

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "60px",
            borderBottom: "1px solid #dedede",
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          {id.toUpperCase()}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            transform: "translateY(-50px)",
          }}
        >
          <SongTable
            filteredByCategory={
              id
                ? { filtered: true, genre: id }
                : { filtered: false, genre: "" }
            }
          />
        </div>
      </div>
    </>
  );
}
