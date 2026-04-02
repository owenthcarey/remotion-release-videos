import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const PLATFORMS = [
  { name: "C", existing: true },
  { name: "Swift", existing: true },
  { name: "Android", existing: true },
  { name: "Node", existing: true },
  { name: "WASM", existing: true },
  { name: "C++", existing: false },
  { name: "Dart", existing: false },
  { name: "Go", existing: false },
  { name: "Ruby", existing: false },
];

export const TaglineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Progress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  const line2Progress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 72,
              fontWeight: 700,
              color: COLORS.textPrimary,
              opacity: line1Progress,
              transform: `translateY(${line1Y}px)`,
              lineHeight: 1.2,
              letterSpacing: -2,
            }}
          >
            One Rust library.
          </div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 72,
              fontWeight: 700,
              color: COLORS.accent,
              opacity: line2Progress,
              transform: `translateY(${line2Y}px)`,
              lineHeight: 1.2,
              letterSpacing: -2,
              marginTop: 10,
            }}
          >
            Every platform.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            maxWidth: 1100,
          }}
        >
          {PLATFORMS.map((platform, i) => {
            const badgeProgress = spring({
              frame,
              fps,
              delay: 25 + i * 4,
              config: { damping: 14 },
            });
            const isNew = !platform.existing;

            return (
              <div
                key={platform.name}
                style={{
                  transform: `scale(${badgeProgress})`,
                  opacity: interpolate(badgeProgress, [0, 0.5], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 28,
                    fontWeight: 500,
                    color: isNew ? COLORS.accent : COLORS.textSecondary,
                    backgroundColor: isNew
                      ? COLORS.accentDim
                      : COLORS.surface,
                    padding: "14px 28px",
                    borderRadius: 12,
                    border: `1.5px solid ${isNew ? COLORS.accent + "40" : COLORS.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {isNew ? `+ ${platform.name}` : platform.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
