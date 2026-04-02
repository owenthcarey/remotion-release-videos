import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const ASYNC_TARGETS = [
  { lang: "Swift", keyword: "async/await" },
  { lang: "Python", keyword: "asyncio" },
  { lang: "Kotlin", keyword: "coroutines" },
  { lang: ".NET", keyword: "Task<T>" },
  { lang: "Node", keyword: "Promise" },
  { lang: "WASM", keyword: "Promise" },
  { lang: "C++", keyword: "std::future" },
];

export const AsyncScene: React.FC = () => {
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
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}15 0%, transparent 60%)`,
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateRight: "clamp",
          }),
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 76,
            fontWeight: 800,
            color: COLORS.textPrimary,
            opacity: headingProgress,
            transform: `translateY(${headingY}px)`,
            letterSpacing: -3,
            textAlign: "center",
          }}
        >
          Async{" "}
          <span style={{ color: COLORS.accent }}>Everywhere</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: 900,
          }}
        >
          {ASYNC_TARGETS.map((target, i) => {
            const rowProgress = spring({
              frame,
              fps,
              delay: 15 + i * 5,
              config: { damping: 200 },
            });
            const rowX = interpolate(
              rowProgress,
              [0, 1],
              [i % 2 === 0 ? -60 : 60, 0],
            );

            return (
              <div
                key={target.lang}
                style={{
                  opacity: rowProgress,
                  transform: `translateX(${rowX}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.surface,
                  borderRadius: 14,
                  padding: "18px 32px",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 30,
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                  }}
                >
                  {target.lang}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 24,
                    fontWeight: 500,
                    color: COLORS.accent,
                    backgroundColor: COLORS.accentDim,
                    padding: "6px 18px",
                    borderRadius: 10,
                  }}
                >
                  {target.keyword}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
