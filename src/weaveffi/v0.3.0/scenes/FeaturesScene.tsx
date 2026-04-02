import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const FEATURES = [
  { name: "Zero-Copy FFI", detail: "BorrowedStr & BorrowedBytes" },
  { name: "Arena Management", detail: "Batch handle lifecycle" },
  { name: "TypedHandle", detail: "Type-safe opaque handles" },
  { name: "Nested Modules", detail: "Deep module hierarchies" },
  { name: "Template Engine", detail: "Tera + user overrides" },
  { name: "Shell Completions", detail: "Bash, Zsh, Fish, PowerShell" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
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
          gap: 48,
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.textPrimary,
            opacity: headingProgress,
            transform: `translateY(${headingY}px)`,
            letterSpacing: -3,
            textAlign: "center",
          }}
        >
          And{" "}
          <span style={{ color: COLORS.accent }}>Much More</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {FEATURES.map((feature, i) => {
            const cellProgress = spring({
              frame,
              fps,
              delay: 12 + i * 6,
              config: { damping: 14 },
            });
            const cellOpacity = interpolate(
              cellProgress,
              [0, 0.4],
              [0, 1],
              { extrapolateRight: "clamp" },
            );

            return (
              <div
                key={feature.name}
                style={{
                  opacity: cellOpacity,
                  transform: `scale(${cellProgress})`,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.surface,
                    borderRadius: 16,
                    padding: "32px 32px",
                    border: `1.5px solid ${COLORS.border}`,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 30,
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {feature.name}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 20,
                      fontWeight: 400,
                      color: COLORS.textMuted,
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
