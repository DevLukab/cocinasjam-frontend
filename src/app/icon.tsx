import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "transparent",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img
          src="http://localhost:3000/logo.jpeg"
          alt="Cocinas JAM"
          width="512"
          height="512"
          style={{
            borderRadius: "50%",
            display: "block",
          }}
        />
      </div>
    ),
    size,
  );
}
