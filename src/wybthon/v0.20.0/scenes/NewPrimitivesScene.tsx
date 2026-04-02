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

const MAP_ARRAY_CODE: Span[][] = [
  [
    { text: "mapped = ", color: C.textPrimary },
    { text: "map_array", color: C.codeFunction },
    { text: "(", color: C.codePunctuation },
  ],
  [
    { text: "    items,", color: C.textPrimary },
  ],
  [
    { text: "    ", color: C.textPrimary },
    { text: "lambda ", color: C.codeKeyword },
    { text: "item, idx", color: C.codeParam },
    { text: ":", color: C.codePunctuation },
  ],
  [
    { text: "        ", color: C.textPrimary },
    { text: "f\"{idx()}: {item()}\"", color: C.codeString },
  ],
  [
    { text: ")", color: C.codePunctuation },
  ],
];

const INDEX_ARRAY_CODE: Span[][] = [
  [
    { text: "mapped = ", color: C.textPrimary },
    { text: "index_array", color: C.codeFunction },
    { text: "(", color: C.codePunctuation },
  ],
  [
    { text: "    items,", color: C.textPrimary },
  ],
  [
    { text: "    ", color: C.textPrimary },
    { text: "lambda ", color: C.codeKeyword },
    { text: "item, idx", color: C.codeParam },
    { text: ":", color: C.codePunctuation },
  ],
  [
    { text: "        ", color: C.textPrimary },
    { text: "f\"[{idx}] {item()}\"", color: C.codeString },
  ],
  [
    { text: ")", color: C.codePunctuation },
  ],
];

const CodeBlock: React.FC<{
  lines: Span[][];
  title: string;
  description: string;
  delayBase: number;
  highlightColor: string;
}> = ({ lines, title, description, delayBase, highlightColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({
    frame,
    fps,
    delay: delayBase,
    config: { damping: 15 },
  });
  const cardScale = interpolate(cardProgress, [0, 1], [0.93, 1]);
  const cardOpacity = interpolate(cardProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 28,
          fontWeight: 700,
          color: highlightColor,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FONTS.heading,
          fontSize: 20,
          fontWeight: 400,
          color: COLORS.textMuted,
          marginBottom: 20,
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>

      <div
        style={{
          backgroundColor: "#0d1117",
          borderRadius: 16,
          padding: "24px 28px",
          border: `1px solid ${highlightColor}25`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.3)`,
        }}
      >
        {lines.map((line, lineIdx) => {
          const lineProgress = spring({
            frame,
            fps,
            delay: delayBase + 10 + lineIdx * 4,
            config: { damping: 200 },
          });

          return (
            <div
              key={lineIdx}
              style={{
                fontFamily: FONTS.mono,
                fontSize: 24,
                lineHeight: 1.8,
                opacity: lineProgress,
                whiteSpace: "pre",
              }}
            >
              {line.map((span, si) => (
                <span key={si} style={{ color: span.color }}>
                  {span.text}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NewPrimitivesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [30, 0]);

  const badgeProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 14 },
  });

  const vsProgress = spring({
    frame,
    fps,
    delay: 35,
    config: { damping: 14 },
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
          gap: 40,
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: headingProgress,
              transform: `translateY(${headingY}px)`,
              letterSpacing: -2,
            }}
          >
            New{" "}
            <span style={{ color: COLORS.secondary }}>List Primitives</span>
          </div>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.textSecondary,
              opacity: badgeProgress,
              marginTop: 12,
            }}
          >
            Keyed by identity or stable by index. You choose.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            width: "100%",
            maxWidth: 1200,
            alignItems: "flex-start",
          }}
        >
          <CodeBlock
            lines={MAP_ARRAY_CODE}
            title="map_array()"
            description="One scope per unique item. Keyed by identity."
            delayBase={18}
            highlightColor={COLORS.accent}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              opacity: vsProgress,
              transform: `scale(${vsProgress})`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.textMuted,
                padding: "12px 20px",
                borderRadius: 12,
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              vs
            </div>
          </div>

          <CodeBlock
            lines={INDEX_ARRAY_CODE}
            title="index_array()"
            description="One scope per index slot. Signals update in place."
            delayBase={28}
            highlightColor={COLORS.secondary}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
