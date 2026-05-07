import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

type Op = {
  name: string;
  args: string;
  color: string;
  glow: string;
};

const OPS: Op[] = [
  {
    name: "Resize",
    args: "512, 512",
    color: COLORS.secondary,
    glow: COLORS.secondaryGlow,
  },
  {
    name: "Blur",
    args: "2.0",
    color: COLORS.accent,
    glow: COLORS.accentGlow,
  },
  {
    name: "Grayscale",
    args: "",
    color: COLORS.tertiary,
    glow: COLORS.tertiaryGlow,
  },
];

export const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [25, 0]);

  const captionProgress = spring({
    frame,
    fps,
    delay: 60,
    config: { damping: 200 },
  });
  const captionY = interpolate(captionProgress, [0, 1], [10, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1600,
          height: 700,
          background: `linear-gradient(90deg, ${COLORS.secondary}1a 0%, ${COLORS.accent}1a 50%, ${COLORS.tertiary}1a 100%)`,
          filter: "blur(120px)",
          top: "25%",
          left: "8%",
          opacity: 0.7,
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
            gap: 60,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: headingProgress,
              transform: `translateY(${headingY}px)`,
              letterSpacing: -2,
              textAlign: "center",
            }}
          >
            One{" "}
            <span
              style={{
                fontFamily: FONTS.mono,
                color: COLORS.accent,
                fontSize: 56,
              }}
            >
              image.yml
            </span>{" "}
            pipeline
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {OPS.map((op, i) => {
              const tileProgress = spring({
                frame,
                fps,
                delay: 16 + i * 12,
                config: { damping: 14 },
              });
              const tileOpacity = interpolate(tileProgress, [0, 0.5], [0, 1], {
                extrapolateRight: "clamp",
              });
              const tileScale = interpolate(tileProgress, [0, 1], [0.7, 1]);
              const tileY = interpolate(tileProgress, [0, 1], [30, 0]);

              const arrowProgress = spring({
                frame,
                fps,
                delay: 22 + i * 12,
                config: { damping: 200 },
              });
              const arrowOpacity = interpolate(
                arrowProgress,
                [0, 1],
                [0, 1],
                { extrapolateRight: "clamp" },
              );

              return (
                <div
                  key={op.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                  }}
                >
                  <div
                    style={{
                      opacity: tileOpacity,
                      transform: `translateY(${tileY}px) scale(${tileScale})`,
                      backgroundColor: COLORS.surface,
                      border: `2px solid ${op.color}`,
                      borderRadius: 22,
                      padding: "32px 40px",
                      minWidth: 280,
                      boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 80px ${op.glow}`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 14,
                        fontWeight: 500,
                        color: op.color,
                        letterSpacing: 4,
                        textTransform: "uppercase",
                        marginBottom: 10,
                        opacity: 0.85,
                      }}
                    >
                      Step {i + 1}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 44,
                        fontWeight: 800,
                        color: COLORS.textPrimary,
                        letterSpacing: -1,
                        marginBottom: 6,
                      }}
                    >
                      {op.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 22,
                        fontWeight: 500,
                        color: op.color,
                        opacity: 0.9,
                      }}
                    >
                      ({op.args || "\u2009"})
                    </div>
                  </div>

                  {i < OPS.length - 1 && (
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 56,
                        fontWeight: 700,
                        color: COLORS.textSecondary,
                        opacity: arrowOpacity * 0.8,
                      }}
                    >
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.textSecondary,
              opacity: captionProgress,
              transform: `translateY(${captionY}px)`,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Defined once · Generated everywhere
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
