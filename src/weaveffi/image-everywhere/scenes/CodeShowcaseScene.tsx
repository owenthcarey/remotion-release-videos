import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, LANGUAGE_COLORS } from "../theme";

const C = COLORS;

type Span = { text: string; color: string };
type CodeBlock = {
  lang: string;
  langKey: keyof typeof LANGUAGE_COLORS;
  filename: string;
  lines: Span[][];
};

const PYTHON: CodeBlock = {
  lang: "Python",
  langKey: "python",
  filename: "demo.py",
  lines: [
    [
      { text: "import ", color: C.codeKeyword },
      { text: "weaveffi", color: C.textPrimary },
    ],
    [],
    [
      { text: "ops = [", color: C.textPrimary },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "resize", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
      { text: "512, 512", color: C.codeNumber },
      { text: "),", color: C.codePunctuation },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "blur", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
      { text: "2.0", color: C.codeNumber },
      { text: "),", color: C.codePunctuation },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "grayscale", color: C.codeFunction },
      { text: "(),", color: C.codePunctuation },
    ],
    [
      { text: "]", color: C.textPrimary },
    ],
    [],
    [
      { text: "out = weaveffi.", color: C.textPrimary },
      { text: "process", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
    ],
    [
      { text: "    input,", color: C.codeParam },
    ],
    [
      { text: "    ops,", color: C.textPrimary },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "ImageFormat", color: C.codeKeyword },
      { text: ".", color: C.textPrimary },
      { text: "Png", color: C.codeKeyword },
      { text: ",", color: C.codePunctuation },
    ],
    [
      { text: ")", color: C.codePunctuation },
    ],
  ],
};

const NODE: CodeBlock = {
  lang: "Node.js",
  langKey: "node",
  filename: "demo.mjs",
  lines: [
    [
      { text: "import ", color: C.codeKeyword },
      { text: "weaveffi ", color: C.textPrimary },
      { text: "from ", color: C.codeKeyword },
      { text: "'weaveffi'", color: C.codeString },
    ],
    [],
    [
      { text: "const ", color: C.codeKeyword },
      { text: "ops = [", color: C.textPrimary },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "resize", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
      { text: "512, 512", color: C.codeNumber },
      { text: "),", color: C.codePunctuation },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "blur", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
      { text: "2.0", color: C.codeNumber },
      { text: "),", color: C.codePunctuation },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "grayscale", color: C.codeFunction },
      { text: "(),", color: C.codePunctuation },
    ],
    [
      { text: "]", color: C.textPrimary },
    ],
    [],
    [
      { text: "const ", color: C.codeKeyword },
      { text: "out = weaveffi.", color: C.textPrimary },
      { text: "process", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
    ],
    [
      { text: "    input,", color: C.codeParam },
    ],
    [
      { text: "    ops,", color: C.textPrimary },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "ImageFormat", color: C.codeKeyword },
      { text: ".", color: C.textPrimary },
      { text: "Png", color: C.codeKeyword },
      { text: ",", color: C.codePunctuation },
    ],
    [
      { text: ")", color: C.codePunctuation },
    ],
  ],
};

const GO: CodeBlock = {
  lang: "Go",
  langKey: "go",
  filename: "demo.go",
  lines: [
    [
      { text: "import ", color: C.codeKeyword },
      { text: "\"weaveffi\"", color: C.codeString },
    ],
    [],
    [
      { text: "resize, _ := weaveffi.", color: C.textPrimary },
      { text: "ImageResize", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
      { text: "512, 512", color: C.codeNumber },
      { text: ")", color: C.codePunctuation },
    ],
    [
      { text: "blur,   _ := weaveffi.", color: C.textPrimary },
      { text: "ImageBlur", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
      { text: "2.0", color: C.codeNumber },
      { text: ")", color: C.codePunctuation },
    ],
    [
      { text: "gray,   _ := weaveffi.", color: C.textPrimary },
      { text: "ImageGrayscale", color: C.codeFunction },
      { text: "()", color: C.codePunctuation },
    ],
    [],
    [
      { text: "out, _ := weaveffi.", color: C.textPrimary },
      { text: "ImageProcess", color: C.codeFunction },
      { text: "(", color: C.codePunctuation },
    ],
    [
      { text: "    input,", color: C.codeParam },
    ],
    [
      { text: "    []*weaveffi.", color: C.textPrimary },
      { text: "Operation", color: C.codeKeyword },
      { text: "{resize, blur, gray},", color: C.codePunctuation },
    ],
    [
      { text: "    weaveffi.", color: C.textPrimary },
      { text: "ImageFormatPng", color: C.codeKeyword },
      { text: ",", color: C.codePunctuation },
    ],
    [
      { text: ")", color: C.codePunctuation },
    ],
  ],
};

const BLOCKS: CodeBlock[] = [PYTHON, NODE, GO];

const CodeWindow: React.FC<{
  block: CodeBlock;
  delayBase: number;
  index: number;
}> = ({ block, delayBase, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({
    frame,
    fps,
    delay: delayBase,
    config: { damping: 14 },
  });
  const cardOpacity = interpolate(cardProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(cardProgress, [0, 1], [0.92, 1]);
  const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

  const langColor = LANGUAGE_COLORS[block.langKey];

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 22,
          fontWeight: 700,
          color: langColor,
          marginBottom: 14,
          letterSpacing: 2,
          textTransform: "uppercase",
          textShadow: `0 0 20px ${langColor}80`,
        }}
      >
        {block.lang}
      </div>

      <div
        style={{
          backgroundColor: "#0a0717",
          borderRadius: 18,
          border: `1.5px solid ${langColor}55`,
          overflow: "hidden",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${langColor}30`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "12px 18px",
            borderBottom: `1px solid ${COLORS.border}`,
            backgroundColor: "#0d0a1f",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#28c840" }} />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: COLORS.textMuted,
              marginLeft: 10,
            }}
          >
            {block.filename}
          </span>
        </div>

        <div style={{ padding: "20px 22px" }}>
          {block.lines.map((line, lineIdx) => {
            const lineProgress = spring({
              frame,
              fps,
              delay: delayBase + 8 + index * 3 + lineIdx * 3,
              config: { damping: 200 },
            });
            const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1]);
            const lineX = interpolate(lineProgress, [0, 1], [12, 0]);

            if (line.length === 0) {
              return (
                <div
                  key={lineIdx}
                  style={{
                    height: 14,
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
                  fontSize: 15,
                  lineHeight: 1.75,
                  opacity: lineOpacity,
                  transform: `translateX(${lineX}px)`,
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
    </div>
  );
};

export const CodeShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [25, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1700,
          height: 800,
          background: `linear-gradient(90deg, ${COLORS.tertiary}14 0%, ${COLORS.accent}14 50%, ${COLORS.secondary}14 100%)`,
          filter: "blur(120px)",
          top: "20%",
          left: "5%",
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
            gap: 36,
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.textPrimary,
              opacity: headingProgress,
              transform: `translateY(${headingY}px)`,
              letterSpacing: -2,
              textAlign: "center",
            }}
          >
            Identical semantics.{" "}
            <span style={{ color: COLORS.accent }}>Idiomatic syntax.</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 22,
              width: "100%",
              maxWidth: 1700,
              alignItems: "flex-start",
            }}
          >
            {BLOCKS.map((block, i) => (
              <CodeWindow
                key={block.lang}
                block={block}
                delayBase={14 + i * 8}
                index={i}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
