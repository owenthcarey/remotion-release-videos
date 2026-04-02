import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const C = COLORS;
type Span = { text: string; color: string };

const FOR_CODE: Span[][] = [
  [
    { text: "For", color: C.codeFunction },
    { text: "(", color: C.codePunctuation },
  ],
  [
    { text: "    each=", color: C.codeParam },
    { text: "items", color: C.textPrimary },
    { text: ",", color: C.codePunctuation },
  ],
  [
    { text: "    children=", color: C.codeParam },
    { text: "lambda ", color: C.codeKeyword },
    { text: "item, idx", color: C.codeParam },
    { text: ":", color: C.codePunctuation },
  ],
  [
    { text: "        li(", color: C.textPrimary },
    { text: "f\"{idx()}: {item()}\"", color: C.codeString },
    { text: ", key=idx())", color: C.textPrimary },
  ],
  [
    { text: ")", color: C.codePunctuation },
  ],
];

const IMPROVEMENTS = [
  {
    component: "For",
    detail: "Stable per-item reactive scopes, keyed by identity",
    icon: "[ ]",
  },
  {
    component: "Index",
    detail: "Per-index scopes with signal-backed item getters",
    icon: "[i]",
  },
  {
    component: "Show",
    detail: "Keyed branch scopes with proper teardown on transition",
    icon: "if",
  },
];

export const FlowScopesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  const codeBlockProgress = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 15 },
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
          gap: 36,
          width: "100%",
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
          Rewritten{" "}
          <span style={{ color: COLORS.accent }}>Flow Controls</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            width: "100%",
            maxWidth: 1200,
            alignItems: "center",
          }}
        >
          {/* Left: code example */}
          <div
            style={{
              flex: 1,
              opacity: interpolate(codeBlockProgress, [0, 0.4], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(codeBlockProgress, [0, 1], [0.93, 1])})`,
            }}
          >
            <div
              style={{
                backgroundColor: "#0d1117",
                borderRadius: 18,
                border: `1px solid ${COLORS.border}`,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 22px",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#ff5f57" }} />
                <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#febc2e" }} />
                <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#28c840" }} />
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    color: COLORS.textMuted,
                    marginLeft: 10,
                  }}
                >
                  flow_demo.py
                </span>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: 16,
                    fontWeight: 600,
                    color: COLORS.codeComment,
                    marginBottom: 16,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  # Each item gets its own reactive scope
                </div>
                {FOR_CODE.map((line, li) => {
                  const lp = spring({
                    frame,
                    fps,
                    delay: 22 + li * 4,
                    config: { damping: 200 },
                  });
                  return (
                    <div
                      key={li}
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 26,
                        lineHeight: 1.8,
                        opacity: lp,
                        whiteSpace: "pre",
                      }}
                    >
                      {line.map((s, si) => (
                        <span key={si} style={{ color: s.color }}>
                          {s.text}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: improvement cards */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              justifyContent: "center",
            }}
          >
            {IMPROVEMENTS.map((item, i) => {
              const cardProgress = spring({
                frame,
                fps,
                delay: 30 + i * 8,
                config: { damping: 15 },
              });
              const cardOpacity = interpolate(
                cardProgress,
                [0, 0.4],
                [0, 1],
                { extrapolateRight: "clamp" },
              );
              const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

              return (
                <div
                  key={item.component}
                  style={{
                    opacity: cardOpacity,
                    transform: `translateY(${cardY}px)`,
                    backgroundColor: COLORS.surface,
                    borderRadius: 16,
                    padding: "24px 28px",
                    border: `1.5px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 20,
                      fontWeight: 700,
                      color: COLORS.secondary,
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      backgroundColor: COLORS.secondaryDim,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 26,
                        fontWeight: 700,
                        color: COLORS.accent,
                        marginBottom: 4,
                      }}
                    >
                      {`<${item.component}>`}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 20,
                        fontWeight: 400,
                        color: COLORS.textSecondary,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
