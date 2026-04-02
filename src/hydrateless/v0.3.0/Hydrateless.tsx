import { AbsoluteFill } from "remotion";

export const Hydrateless: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#09090b",
        justifyContent: "center",
        alignItems: "center",
        color: "#fafafa",
        fontSize: 48,
        fontFamily: "sans-serif",
      }}
    >
      Hydrateless v0.3.0
    </AbsoluteFill>
  );
};
