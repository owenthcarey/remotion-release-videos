import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

export const IdentityScene: React.FC = () => {
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
    delay: 12,
    config: { damping: 200 },
  });
  const line2Y = interpolate(line2Progress, [0, 1], [40, 0]);

  const dividerProgress = spring({
    frame,
    fps,
    delay: 28,
    config: { damping: 200 },
  });
  const dividerWidth = interpolate(dividerProgress, [0, 1], [0, 260]);

  const pillsProgress = spring({
    frame,
    fps,
    delay: 38,
    config: { damping: 200 },
  });
  const pillsY = interpolate(pillsProgress, [0, 1], [20, 0]);

  const PILLS = [
    { label: "Signals", color: COLORS.accent },
    { label: "VDOM", color: COLORS.accent },
    { label: "Router", color: COLORS.accent },
    { label: "Context", color: COLORS.accent },
    { label: "Forms", color: COLORS.accent },
    { label: "Suspense", color: COLORS.accent },
  ];

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
          position: "absolute",
          width: 800,
          height: 400,
          background: `radial-gradient(ellipse, ${COLORS.accent}08 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 80,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: line1Progress,
              transform: `translateY(${line1Y}px)`,
              lineHeight: 1.15,
              letterSpacing: -3,
            }}
          >
            Python in the browser.
          </div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -3,
              opacity: line2Progress,
              transform: `translateY(${line2Y}px)`,
              marginTop: 4,
            }}
          >
            <span style={{ color: COLORS.accent }}>SolidJS</span>
            <span style={{ color: COLORS.textPrimary }}> under the hood.</span>
          </div>
        </div>

        <div
          style={{
            width: dividerWidth,
            height: 3,
            backgroundColor: COLORS.accent,
            borderRadius: 2,
            opacity: 0.4,
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 14,
            opacity: pillsProgress,
            transform: `translateY(${pillsY}px)`,
          }}
        >
          {PILLS.map((pill, i) => {
            const pillPop = spring({
              frame,
              fps,
              delay: 42 + i * 4,
              config: { damping: 14 },
            });
            return (
              <div
                key={pill.label}
                style={{
                  transform: `scale(${pillPop})`,
                  fontFamily: FONTS.mono,
                  fontSize: 22,
                  fontWeight: 500,
                  color: pill.color,
                  backgroundColor: COLORS.accentDim,
                  padding: "10px 22px",
                  borderRadius: 10,
                  border: `1px solid ${pill.color}30`,
                }}
              >
                {pill.label}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
