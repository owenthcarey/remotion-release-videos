import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const PATTERNS = [
  {
    name: "Builder Pattern",
    description: "Fluent API construction across all generators",
    label: "{ }",
  },
  {
    name: "Iterator / Streaming",
    description: "Lazy sequences and streaming data across FFI boundaries",
    label: ">>",
  },
  {
    name: "Callbacks & Events",
    description: "Event listener pattern with callback typedef and codegen",
    label: "fn",
  },
];

export const PatternsScene: React.FC = () => {
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
          Powerful{" "}
          <span style={{ color: COLORS.accent }}>Patterns</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: "100%",
            maxWidth: 1050,
          }}
        >
          {PATTERNS.map((pattern, i) => {
            const cardProgress = spring({
              frame,
              fps,
              delay: 15 + i * 10,
              config: { damping: 15 },
            });
            const cardOpacity = interpolate(
              cardProgress,
              [0, 0.4],
              [0, 1],
              { extrapolateRight: "clamp" },
            );
            const cardScale = interpolate(
              cardProgress,
              [0, 1],
              [0.9, 1],
            );

            return (
              <div
                key={pattern.name}
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.surface,
                    borderRadius: 18,
                    padding: "32px 44px",
                    border: `1.5px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.accent,
                      width: 76,
                      height: 76,
                      borderRadius: 18,
                      backgroundColor: COLORS.accentDim,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {pattern.label}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 34,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        marginBottom: 8,
                      }}
                    >
                      {pattern.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 22,
                        fontWeight: 400,
                        color: COLORS.textMuted,
                        lineHeight: 1.4,
                      }}
                    >
                      {pattern.description}
                    </div>
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
