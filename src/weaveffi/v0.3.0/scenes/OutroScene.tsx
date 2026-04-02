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

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  const glowOpacity = interpolate(frame, [0, fps], [0, 0.5], {
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  const urlProgress = spring({
    frame,
    fps,
    delay: 22,
    config: { damping: 200 },
  });
  const urlY = interpolate(urlProgress, [0, 1], [20, 0]);

  const ctaProgress = spring({
    frame,
    fps,
    delay: 34,
    config: { damping: 14 },
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
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div style={{ transform: `scale(${logoProgress})` }}>
          <Img
            src={staticFile("logos/weaveffi.jpeg")}
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              boxShadow: `0 0 60px ${COLORS.accentGlow}`,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.textPrimary,
            opacity: titleProgress,
            transform: `translateY(${titleY}px)`,
            letterSpacing: -3,
          }}
        >
          WeaveFFI{" "}
          <span style={{ color: COLORS.accent }}>v0.3.0</span>
        </div>

        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.textSecondary,
            opacity: urlProgress,
            transform: `translateY(${urlY}px)`,
            marginTop: 8,
          }}
        >
          github.com/weavefoundry/weaveffi
        </div>

        <div
          style={{
            transform: `scale(${ctaProgress})`,
            opacity: interpolate(ctaProgress, [0, 0.5], [0, 1], {
              extrapolateRight: "clamp",
            }),
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.background,
              backgroundColor: COLORS.accent,
              padding: "18px 52px",
              borderRadius: 16,
              boxShadow: `0 0 50px ${COLORS.accentGlow}`,
            }}
          >
            Upgrade today
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
