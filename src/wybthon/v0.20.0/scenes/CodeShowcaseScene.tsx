import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS } from "../theme";

type Span = { text: string; color: string };
type CodeLine = Span[];

const C = COLORS;

const CODE_LINES: CodeLine[] = [
  [
    { text: "@", color: C.codeDecorator },
    { text: "component", color: C.codeDecorator },
  ],
  [
    { text: "def ", color: C.codeKeyword },
    { text: "Counter", color: C.codeFunction },
    { text: "():", color: C.codePunctuation },
  ],
  [
    { text: "    count, set_count = ", color: C.textPrimary },
    { text: "create_signal", color: C.codeFunction },
    { text: "(0)", color: C.textPrimary },
  ],
  [],
  [
    { text: "    ", color: C.textPrimary },
    { text: "def ", color: C.codeKeyword },
    { text: "render", color: C.codeFunction },
    { text: "():", color: C.codePunctuation },
  ],
  [
    { text: "        ", color: C.textPrimary },
    { text: "return ", color: C.codeKeyword },
    { text: "div", color: C.codeFunction },
    { text: "(", color: C.codePunctuation },
  ],
  [
    { text: "            p(", color: C.textPrimary },
    { text: "f\"Count: ", color: C.codeString },
    { text: "{count()}", color: C.textPrimary },
    { text: "\"", color: C.codeString },
    { text: "),", color: C.textPrimary },
  ],
  [
    { text: "            button(", color: C.textPrimary },
    { text: "\"+\"", color: C.codeString },
    { text: ",", color: C.textPrimary },
  ],
  [
    { text: "                on_click=", color: C.textPrimary },
    { text: "lambda ", color: C.codeKeyword },
    { text: "e", color: C.codeParam },
    { text: ": set_count(count() + 1)", color: C.textPrimary },
  ],
  [
    { text: "            ),", color: C.textPrimary },
  ],
  [
    { text: "        )", color: C.textPrimary },
  ],
  [],
  [
    { text: "    ", color: C.textPrimary },
    { text: "return ", color: C.codeKeyword },
    { text: "render", color: C.codeFunction },
  ],
];

export const CodeShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const labelY = interpolate(labelProgress, [0, 1], [20, 0]);

  const windowProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 15 },
  });
  const windowScale = interpolate(windowProgress, [0, 1], [0.92, 1]);

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
          width: 900,
          height: 600,
          background: `radial-gradient(ellipse, ${COLORS.accent}0a 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

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
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.textPrimary,
            opacity: labelProgress,
            transform: `translateY(${labelY}px)`,
            letterSpacing: -1,
          }}
        >
          This is a{" "}
          <span style={{ color: COLORS.accent }}>Wybthon</span> component.
        </div>

        <div
          style={{
            opacity: interpolate(windowProgress, [0, 0.4], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `scale(${windowScale})`,
            width: "100%",
            maxWidth: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "#0d1117",
              borderRadius: 20,
              border: `1px solid ${COLORS.border}`,
              overflow: "hidden",
              boxShadow: `0 25px 80px rgba(0,0,0,0.5), 0 0 60px ${COLORS.accentGlow}`,
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 24px",
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#ff5f57" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#febc2e" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#28c840" }} />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 16,
                  color: COLORS.textMuted,
                  marginLeft: 12,
                }}
              >
                counter.py
              </span>
            </div>

            {/* Code body */}
            <div style={{ padding: "28px 36px" }}>
              {CODE_LINES.map((line, lineIdx) => {
                const lineDelay = 18 + lineIdx * 5;
                const lineProgress = spring({
                  frame,
                  fps,
                  delay: lineDelay,
                  config: { damping: 200 },
                });
                const lineOpacity = interpolate(
                  lineProgress,
                  [0, 1],
                  [0, 1],
                );
                const lineX = interpolate(lineProgress, [0, 1], [20, 0]);

                if (line.length === 0) {
                  return (
                    <div
                      key={lineIdx}
                      style={{
                        height: 18,
                        opacity: lineOpacity,
                      }}
                    />
                  );
                }

                return (
                  <div
                    key={lineIdx}
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 25,
                      lineHeight: 1.65,
                      opacity: lineOpacity,
                      transform: `translateX(${lineX}px)`,
                      whiteSpace: "pre",
                      display: "flex",
                    }}
                  >
                    <span
                      style={{
                        color: COLORS.textMuted,
                        width: 48,
                        minWidth: 48,
                        flexShrink: 0,
                        textAlign: "right",
                        marginRight: 24,
                        userSelect: "none",
                        fontSize: 22,
                        opacity: 0.5,
                      }}
                    >
                      {lineIdx + 1}
                    </span>
                    <span>
                      {line.map((span, spanIdx) => (
                        <span key={spanIdx} style={{ color: span.color }}>
                          {span.text}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
