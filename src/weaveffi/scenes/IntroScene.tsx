import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoRotation = interpolate(logoScale, [0, 1], [-8, 0]);

  const glowOpacity = interpolate(frame, [0, fps], [0, 0.7], {
    extrapolateRight: "clamp",
  });
  const glowScale = interpolate(frame, [0, fps * 2], [0.8, 1.1], {
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  const versionProgress = spring({
    frame,
    fps,
    delay: 24,
    config: { damping: 14 },
  });
  const versionOpacity = interpolate(versionProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`,
          opacity: glowOpacity,
          transform: `scale(${glowScale})`,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          }}
        >
          <Img
            src={staticFile("logos/weaveffi.jpeg")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 40,
              boxShadow: `0 0 80px ${COLORS.accentGlow}`,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 108,
            fontWeight: 800,
            color: COLORS.textPrimary,
            opacity: titleProgress,
            transform: `translateY(${titleY}px)`,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          WeaveFFI
        </div>

        <div
          style={{
            transform: `scale(${versionProgress})`,
            opacity: versionOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 40,
              fontWeight: 700,
              color: COLORS.accent,
              backgroundColor: COLORS.accentDim,
              padding: "14px 36px",
              borderRadius: 16,
              border: `2px solid ${COLORS.accent}50`,
            }}
          >
            v0.3.0
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
