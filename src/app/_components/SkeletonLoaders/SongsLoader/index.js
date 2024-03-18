import ContentLoader from "react-content-loader";

export default function SongsLoader({ width, height }) {
  return (
    <>
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox="0 0 476 124"
        backgroundColor="#9e9e9e"
        foregroundColor="#787878"
      >
        <rect x="94" y="25" rx="6" ry="6" width="100%" height="86" />
        <rect x="12" y="24" rx="6" ry="6" width="100%" height="87" />
      </ContentLoader>
    </>
  );
}
