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

const STATS = [
  { value: "1", label: "IDL file" },
  { value: "11", label: "languages" },
  { value: "100%", label: "byte-identical" },
];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 14 },
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
  const urlY = interpolate(urlProgress, [0, 1], [12, 0]);

  const ctaProgress = spring({
    frame,
    fps,
    delay: 42,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill>
      <MeshGradient intensity={0.9} />

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
            gap: 26,
          }}
        >
          <div style={{ transform: `scale(${logoProgress})` }}>
            <Img
              src={staticFile("logos/weaveffi.jpeg")}
              style={{
                width: 130,
                height: 130,
                borderRadius: 30,
                boxShadow: `0 0 70px ${COLORS.accentGlow}, 0 16px 60px rgba(0,0,0,0.5)`,
              }}
            />
          </div>

          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: titleProgress,
              transform: `translateY(${titleY}px)`,
              letterSpacing: -2,
              textAlign: "center",
            }}
          >
            <span style={{ color: COLORS.accent }}>WeaveFFI</span>{" "}
            <span style={{ color: COLORS.textPrimary }}>0.4.0</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 56,
              opacity: statsProgress,
            }}
          >
            {STATS.map((stat, i) => {
              const statPop = spring({
                frame,
                fps,
                delay: 20 + i * 6,
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
                      fontSize: 44,
                      fontWeight: 700,
                      color:
                        i === 0
                          ? COLORS.accent
                          : i === 1
                            ? COLORS.secondary
                            : COLORS.tertiary,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 18,
                      fontWeight: 500,
                      color: COLORS.textSecondary,
                      marginTop: 8,
                      letterSpacing: 1,
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
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.textSecondary,
              opacity: urlProgress,
              transform: `translateY(${urlY}px)`,
              marginTop: 12,
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
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.background,
                backgroundColor: COLORS.accent,
                padding: "16px 44px",
                borderRadius: 14,
                boxShadow: `0 12px 50px ${COLORS.accentGlow}`,
                letterSpacing: 1,
              }}
            >
              cargo install weaveffi-cli
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
