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
  const logoRotation = interpolate(logoScale, [0, 1], [-10, 0]);

  const blueGlow = interpolate(frame, [0, fps], [0, 0.7], {
    extrapolateRight: "clamp",
  });
  const glowScale = interpolate(frame, [0, fps * 2], [0.6, 1.15], {
    extrapolateRight: "clamp",
  });
  const yellowGlow = interpolate(frame, [0, fps * 1.5], [0, 0.35], {
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({
    frame,
    fps,
    delay: 14,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);

  const subtitleProgress = spring({
    frame,
    fps,
    delay: 26,
    config: { damping: 200 },
  });

  const versionProgress = spring({
    frame,
    fps,
    delay: 38,
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
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 65%)`,
          opacity: blueGlow,
          transform: `scale(${glowScale})`,
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondaryGlow} 0%, transparent 65%)`,
          opacity: yellowGlow,
          filter: "blur(110px)",
          top: "55%",
          left: "30%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          }}
        >
          <Img
            src={staticFile("logos/wybthon.jpeg")}
            style={{
              width: 240,
              height: 240,
              borderRadius: 48,
              boxShadow: `0 0 100px ${COLORS.accentGlow}, 0 20px 80px rgba(0,0,0,0.5)`,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 116,
            fontWeight: 800,
            color: COLORS.textPrimary,
            opacity: titleProgress,
            transform: `translateY(${titleY}px)`,
            letterSpacing: -5,
            lineHeight: 1,
          }}
        >
          Wybthon
        </div>

        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.textSecondary,
            opacity: subtitleProgress,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Release Highlights
        </div>

        <div
          style={{
            transform: `scale(${versionProgress})`,
            opacity: versionOpacity,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 42,
              fontWeight: 700,
              color: COLORS.secondary,
              backgroundColor: COLORS.secondaryDim,
              padding: "14px 40px",
              borderRadius: 16,
              border: `2px solid ${COLORS.secondary}40`,
            }}
          >
            v0.20.0
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
