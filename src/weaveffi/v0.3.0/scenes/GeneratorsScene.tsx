import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const GENERATORS = [
  {
    name: "C++",
    detail: "RAII wrappers, CMakeLists.txt, std::future async",
    symbol: "{}",
  },
  {
    name: "Dart",
    detail: "dart:ffi bindings, pubspec.yaml scaffold",
    symbol: ">>",
  },
  {
    name: "Go",
    detail: "CGo bindings, go.mod scaffold",
    symbol: "go",
  },
  {
    name: "Ruby",
    detail: "Ruby FFI bindings, gemspec scaffold",
    symbol: "rb",
  },
];

export const GeneratorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  const countProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12 },
  });

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
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.textSecondary,
              opacity: headingProgress,
              transform: `translateY(${headingY}px)`,
              textTransform: "uppercase",
              letterSpacing: 5,
              marginBottom: 14,
            }}
          >
            Introducing
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 128,
                fontWeight: 800,
                color: COLORS.accent,
                transform: `scale(${countProgress})`,
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              4
            </span>
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 64,
                fontWeight: 700,
                color: COLORS.textPrimary,
                opacity: headingProgress,
                lineHeight: 1,
              }}
            >
              New Generators
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            width: "100%",
            maxWidth: 1100,
          }}
        >
          {GENERATORS.map((gen, i) => {
            const cardProgress = spring({
              frame,
              fps,
              delay: 20 + i * 8,
              config: { damping: 15 },
            });
            const cardOpacity = interpolate(
              cardProgress,
              [0, 0.4],
              [0, 1],
              { extrapolateRight: "clamp" },
            );
            const cardY = interpolate(cardProgress, [0, 1], [40, 0]);

            return (
              <div
                key={gen.name}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px) scale(${interpolate(cardProgress, [0, 1], [0.95, 1])})`,
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.surface,
                    borderRadius: 18,
                    padding: "32px 40px",
                    border: `1.5px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 24,
                      fontWeight: 700,
                      color: COLORS.accent,
                      backgroundColor: COLORS.accentDim,
                      width: 68,
                      height: 68,
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {gen.symbol}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 36,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        marginBottom: 6,
                      }}
                    >
                      {gen.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 22,
                        fontWeight: 400,
                        color: COLORS.textMuted,
                        lineHeight: 1.3,
                      }}
                    >
                      {gen.detail}
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
