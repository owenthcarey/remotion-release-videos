import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";
import { MeshGradient } from "../components/MeshGradient";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Progress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  const line2Progress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const line2Y = interpolate(line2Progress, [0, 1], [40, 0]);

  const line3Progress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const line3Y = interpolate(line3Progress, [0, 1], [40, 0]);

  const numberPop = spring({
    frame,
    fps,
    delay: 14,
    config: { damping: 10 },
  });

  const dividerProgress = spring({
    frame,
    fps,
    delay: 36,
    config: { damping: 200 },
  });
  const dividerWidth = interpolate(dividerProgress, [0, 1], [0, 320]);

  const tagProgress = spring({
    frame,
    fps,
    delay: 46,
    config: { damping: 14 },
  });
  const tagOpacity = interpolate(tagProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <MeshGradient intensity={0.8} />

      <AbsoluteFill
        style={{
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
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 88,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: line1Progress,
              transform: `translateY(${line1Y}px)`,
              letterSpacing: -3,
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            Same code.
          </div>

          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 88,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: line2Progress,
              transform: `translateY(${line2Y}px)`,
              letterSpacing: -3,
              lineHeight: 1.05,
              textAlign: "center",
              display: "flex",
              alignItems: "baseline",
              gap: 20,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 144,
                fontWeight: 800,
                color: COLORS.accent,
                transform: `scale(${numberPop})`,
                display: "inline-block",
                lineHeight: 1,
                textShadow: `0 0 60px ${COLORS.accentGlow}`,
              }}
            >
              11
            </span>
            <span>languages.</span>
          </div>

          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 88,
              fontWeight: 800,
              opacity: line3Progress,
              transform: `translateY(${line3Y}px)`,
              letterSpacing: -3,
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            <span style={{ color: COLORS.secondary }}>Identical</span>
            <span style={{ color: COLORS.textPrimary }}> bytes.</span>
          </div>

          <div
            style={{
              width: dividerWidth,
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary}, ${COLORS.tertiary})`,
              marginTop: 16,
            }}
          />

          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.textSecondary,
              opacity: tagOpacity,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Powered by WeaveFFI
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
