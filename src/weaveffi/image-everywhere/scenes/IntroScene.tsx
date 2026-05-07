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
import { MeshGradient } from "../components/MeshGradient";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoRotation = interpolate(logoScale, [0, 1], [-12, 0]);

  const titleProgress = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  const subtitleProgress = spring({
    frame,
    fps,
    delay: 26,
    config: { damping: 200 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  const versionProgress = spring({
    frame,
    fps,
    delay: 40,
    config: { damping: 14 },
  });
  const versionOpacity = interpolate(versionProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <MeshGradient />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
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
                width: 220,
                height: 220,
                borderRadius: 44,
                boxShadow: `0 0 100px ${COLORS.accentGlow}, 0 24px 80px rgba(0,0,0,0.55)`,
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
              textShadow: `0 4px 40px ${COLORS.accentGlow}`,
            }}
          >
            WeaveFFI
          </div>

          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 30,
              fontWeight: 600,
              color: COLORS.secondary,
              opacity: subtitleProgress,
              transform: `translateY(${subtitleY}px)`,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Image Everywhere
          </div>

          <div
            style={{
              transform: `scale(${versionProgress})`,
              opacity: versionOpacity,
              marginTop: 6,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.accent,
                backgroundColor: COLORS.accentDim,
                padding: "12px 36px",
                borderRadius: 14,
                border: `2px solid ${COLORS.accent}55`,
              }}
            >
              v0.4.0
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
