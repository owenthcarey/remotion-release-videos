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

const META = [
  { label: "DIMENSIONS", value: "1024 × 683" },
  { label: "FORMAT", value: "JPEG" },
  { label: "SIZE", value: "130 KB" },
];

export const InputScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const labelY = interpolate(labelProgress, [0, 1], [20, 0]);

  const photoProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 14 },
  });
  const photoScale = interpolate(photoProgress, [0, 1], [0.9, 1]);
  const photoOpacity = interpolate(photoProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const filenameProgress = spring({
    frame,
    fps,
    delay: 22,
    config: { damping: 200 },
  });
  const filenameY = interpolate(filenameProgress, [0, 1], [10, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      {/* Soft tinted glow behind the photo to bridge into the colourful image */}
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.secondary}26 0%, transparent 65%)`,
          filter: "blur(120px)",
          top: "5%",
          left: "10%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.accent}1f 0%, transparent 65%)`,
          filter: "blur(120px)",
          top: "30%",
          left: "55%",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
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
              fontFamily: FONTS.mono,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.textSecondary,
              opacity: labelProgress,
              transform: `translateY(${labelY}px)`,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Input
          </div>

          <div
            style={{
              opacity: photoOpacity,
              transform: `scale(${photoScale})`,
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: `0 25px 80px rgba(0,0,0,0.6), 0 0 80px ${COLORS.secondaryGlow}`,
              border: `2px solid ${COLORS.borderBright}`,
            }}
          >
            <Img
              src={staticFile("weaveffi/image-everywhere/input.jpg")}
              style={{
                width: 880,
                height: 587,
                display: "block",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: filenameProgress,
              transform: `translateY(${filenameY}px)`,
              marginTop: 4,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.accent,
                backgroundColor: COLORS.accentDim,
                padding: "10px 22px",
                borderRadius: 12,
                border: `1.5px solid ${COLORS.accent}40`,
              }}
            >
              input.jpg
            </div>
            {META.map((m, i) => {
              const metaProgress = spring({
                frame,
                fps,
                delay: 26 + i * 5,
                config: { damping: 200 },
              });
              return (
                <div
                  key={m.label}
                  style={{
                    opacity: metaProgress,
                    transform: `translateY(${interpolate(metaProgress, [0, 1], [10, 0])}px)`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 12,
                      fontWeight: 500,
                      color: COLORS.textMuted,
                      letterSpacing: 2,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 22,
                      fontWeight: 500,
                      color: COLORS.textPrimary,
                      lineHeight: 1.2,
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
