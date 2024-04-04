import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export default function SongCategory({ categoryImage, category }) {
  return (
    <Link
      href={`/genre/${category.toLowerCase()}`}
      className={styles.songCategoryContainer}
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "8px",
        cursor: "pointer",
        background: "#FFFAE4",
        position: "relative",
      }}
    >
      <div className={styles.overlay}>
        <p className={styles.overlayText}>{category}</p>
      </div>
      <Image
        src={categoryImage}
        width={200}
        height={200}
        style={{ borderRadius: "8px" }}
      />
    </Link>
  );
}
