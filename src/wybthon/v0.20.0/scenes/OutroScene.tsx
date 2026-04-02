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

const STATS = [
  { value: "1,564", label: "Lines added" },
  { value: "14", label: "Files changed" },
  { value: "808", label: "Test lines" },
];

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
    delay: 8,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  const statsProgress = spring({
    frame,
    fps,
    delay: 18,
    config: { damping: 200 },
  });

  const urlProgress = spring({
    frame,
    fps,
    delay: 32,
    config: { damping: 200 },
  });
  const urlY = interpolate(urlProgress, [0, 1], [15, 0]);

  const ctaProgress = spring({
    frame,
    fps,
    delay: 42,
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
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 65%)`,
          opacity: glowOpacity,
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondaryGlow} 0%, transparent 65%)`,
          opacity: glowOpacity * 0.6,
          filter: "blur(100px)",
          bottom: "20%",
          left: "28%",
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
        <div style={{ transform: `scale(${logoProgress})` }}>
          <Img
            src={staticFile("logos/wybthon.jpeg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              boxShadow: `0 0 60px ${COLORS.accentGlow}`,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.textPrimary,
            opacity: titleProgress,
            transform: `translateY(${titleY}px)`,
            letterSpacing: -3,
          }}
        >
          Wybthon{" "}
          <span style={{ color: COLORS.accent }}>v0.20.0</span>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            opacity: statsProgress,
            marginTop: 4,
          }}
        >
          {STATS.map((stat, i) => {
            const statPop = spring({
              frame,
              fps,
              delay: 20 + i * 5,
              config: { damping: 14 },
            });
            return (
              <div
                key={stat.label}
                style={{
                  transform: `scale(${statPop})`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 38,
                    fontWeight: 700,
                    color: COLORS.secondary,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 18,
                    fontWeight: 400,
                    color: COLORS.textMuted,
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.textSecondary,
            opacity: urlProgress,
            transform: `translateY(${urlY}px)`,
            marginTop: 12,
          }}
        >
          github.com/wybthon/wybthon
        </div>

        <div
          style={{
            transform: `scale(${ctaProgress})`,
            opacity: interpolate(ctaProgress, [0, 0.5], [0, 1], {
              extrapolateRight: "clamp",
            }),
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.background,
              backgroundColor: COLORS.accent,
              padding: "18px 52px",
              borderRadius: 16,
              boxShadow: `0 0 50px ${COLORS.accentGlow}`,
            }}
          >
            pip install wybthon
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
