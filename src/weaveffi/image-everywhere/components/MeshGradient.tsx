import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

type Props = {
  intensity?: number;
};

export const MeshGradient: React.FC<Props> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow drift cycle (~6s per orbit) so the colour blobs feel alive without
  // distracting from foreground content.
  const t = (frame / fps) * 0.5;

  const yellowX = interpolate(Math.sin(t), [-1, 1], [-12, 12]);
  const yellowY = interpolate(Math.cos(t * 0.9), [-1, 1], [-8, 8]);

  const magentaX = interpolate(Math.cos(t * 1.1 + 1), [-1, 1], [-10, 10]);
  const magentaY = interpolate(Math.sin(t * 0.8 + 0.5), [-1, 1], [-12, 12]);

  const cyanX = interpolate(Math.sin(t * 0.7 + 2), [-1, 1], [-14, 14]);
  const cyanY = interpolate(Math.cos(t * 1.2 + 1.5), [-1, 1], [-10, 10]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.background,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}aa 0%, ${COLORS.accent}33 35%, transparent 70%)`,
          filter: "blur(100px)",
          opacity: 0.85 * intensity,
          top: `${-10 + yellowY}%`,
          left: `${-10 + yellowX}%`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondary}aa 0%, ${COLORS.secondary}30 35%, transparent 70%)`,
          filter: "blur(120px)",
          opacity: 0.85 * intensity,
          top: `${-5 + magentaY}%`,
          left: `${50 + magentaX}%`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.tertiary}99 0%, ${COLORS.tertiary}30 35%, transparent 70%)`,
          filter: "blur(110px)",
          opacity: 0.8 * intensity,
          top: `${40 + cyanY}%`,
          left: `${15 + cyanX}%`,
        }}
      />

      {/* Subtle vignette to keep edges grounded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 55%, ${COLORS.backgroundDeep}cc 100%)`,
          opacity: 0.5,
        }}
      />
    </div>
  );
};
