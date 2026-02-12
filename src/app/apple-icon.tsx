import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 58,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        OLM
      </div>
    ),
    size,
  );
}
