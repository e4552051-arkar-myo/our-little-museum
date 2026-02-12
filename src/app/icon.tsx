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
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "linear-gradient(135deg, #ffdbe5, #ffeccf)",
          color: "#7a1f36",
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: 6,
        }}
      >
        OLM
      </div>
    ),
    size,
  );
}
