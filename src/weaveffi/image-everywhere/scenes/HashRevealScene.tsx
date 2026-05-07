import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, LANGUAGE_COLORS } from "../theme";

const HASH = "5934a11538833074236ba2110ba1698e7e98633428203a20bfb131fed3203397";
const HASH_SHORT = `${HASH.slice(0, 12)}…${HASH.slice(-10)}`;

type LangRow = {
  key: keyof typeof LANGUAGE_COLORS;
  name: string;
};

const LANGS: LangRow[] = [
  { key: "python", name: "python" },
  { key: "node", name: "node" },
  { key: "go", name: "go" },
  { key: "ruby", name: "ruby" },
  { key: "swift", name: "swift" },
  { key: "dart", name: "dart" },
  { key: "c", name: "c" },
  { key: "cpp", name: "cpp" },
  { key: "csharp", name: "csharp" },
  { key: "kotlin", name: "kotlin" },
  { key: "wasm", name: "wasm" },
];

// Timing layout (in frames):
//   0  - 30 : transformation builds up on the left
//  20  - 130: hashes cascade in (one every ~10 frames)
//  140 - 180: emerald MATCH flash + "BYTE-IDENTICAL" verdict
const HASH_CASCADE_START = 20;
const HASH_CASCADE_STEP = 8;
const MATCH_FLASH_START = 130;
const VERDICT_START = 142;

export const HashRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ------- Left side: image transformation pipeline -------

  // The three filters animate in sequence over the first ~90 frames so the
  // viewer feels each operation land. After frame 90 the image is in its
  // "fully processed" state matching the actual demo output.
  const resizeProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const blurProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 200 },
  });
  const grayscaleProgress = spring({
    frame: frame - 38,
    fps,
    config: { damping: 200 },
  });

  // Resize: shrink the photo into a smaller square frame.
  const photoWidth = interpolate(resizeProgress, [0, 1], [620, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoBlur = interpolate(blurProgress, [0, 1], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoSaturation = interpolate(grayscaleProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Step badges glow in sync with the filter applying to the image.
  const stepStates = [resizeProgress, blurProgress, grayscaleProgress];

  // ------- Right side: the SHA-256 hash cascade -------

  const allHashesIn = LANGS.every((_, i) => {
    const delay = HASH_CASCADE_START + i * HASH_CASCADE_STEP;
    return frame >= delay + 12;
  });

  // Match flash: all hashes glow emerald together.
  const matchFlash = interpolate(
    frame,
    [MATCH_FLASH_START, MATCH_FLASH_START + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Verdict pop-in.
  const verdictProgress = spring({
    frame: frame - VERDICT_START,
    fps,
    config: { damping: 12 },
  });
  const verdictOpacity = interpolate(verdictProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      {/* Soft side glows */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.secondaryGlow} 0%, transparent 65%)`,
          filter: "blur(140px)",
          top: "10%",
          left: "-5%",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${matchFlash > 0.2 ? COLORS.successGlow : COLORS.tertiaryGlow} 0%, transparent 65%)`,
          filter: "blur(140px)",
          top: "20%",
          right: "-10%",
          opacity: interpolate(matchFlash, [0, 1], [0.4, 0.85]),
        }}
      />

      <AbsoluteFill
        style={{
          padding: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* ----------------- Left: image transformation ----------------- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 18,
              fontWeight: 500,
              color: COLORS.textSecondary,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            same pipeline
          </div>

          <div
            style={{
              width: 540,
              height: 540,
              borderRadius: 24,
              backgroundColor: COLORS.surface,
              border: `2px solid ${COLORS.borderBright}`,
              padding: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 25px 80px rgba(0,0,0,0.5), 0 0 60px ${COLORS.tertiaryGlow}`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Img
              src={staticFile("weaveffi/image-everywhere/input.jpg")}
              style={{
                width: photoWidth,
                height: photoWidth * (683 / 1024),
                objectFit: "cover",
                borderRadius: 12,
                filter: `blur(${photoBlur}px) saturate(${photoSaturation})`,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {[
              { name: "Resize", color: COLORS.secondary },
              { name: "Blur", color: COLORS.accent },
              { name: "Grayscale", color: COLORS.tertiary },
            ].map((step, i) => {
              const active = stepStates[i] ?? 0;
              const opacity = interpolate(active, [0, 0.4], [0.25, 1], {
                extrapolateRight: "clamp",
              });
              const scale = interpolate(active, [0, 1], [0.9, 1]);
              return (
                <div
                  key={step.name}
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: step.color,
                    backgroundColor: `${step.color}1f`,
                    border: `1.5px solid ${step.color}${active > 0.4 ? "cc" : "55"}`,
                    padding: "8px 18px",
                    borderRadius: 10,
                    opacity,
                    transform: `scale(${scale})`,
                    boxShadow: active > 0.4 ? `0 0 24px ${step.color}80` : "none",
                  }}
                >
                  {step.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* ----------------- Right: hash list ----------------- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flex: 1,
            maxWidth: 1080,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                fontWeight: 500,
                color: COLORS.textSecondary,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              SHA-256 of output.png
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: 500,
                color: COLORS.textMuted,
                letterSpacing: 3,
                textTransform: "uppercase",
                opacity: allHashesIn ? 1 : 0,
              }}
            >
              11 / 11
            </div>
          </div>

          {LANGS.map((lang, i) => {
            const delay = HASH_CASCADE_START + i * HASH_CASCADE_STEP;
            const rowProgress = spring({
              frame: frame - delay,
              fps,
              config: { damping: 200 },
            });
            const rowOpacity = interpolate(rowProgress, [0, 1], [0, 1]);
            const rowX = interpolate(rowProgress, [0, 1], [30, 0]);

            const langColor = LANGUAGE_COLORS[lang.key];
            const matched = matchFlash;

            // Each row's border + text blends from its language colour to
            // emerald success when the match flash fires.
            const blendedBorder =
              matched > 0.5 ? COLORS.success : `${langColor}80`;
            const hashColor =
              matched > 0.5
                ? COLORS.success
                : COLORS.textPrimary;
            const rowBg =
              matched > 0.5
                ? `${COLORS.success}1f`
                : COLORS.surface;
            const rowGlow =
              matched > 0.5
                ? `0 0 24px ${COLORS.successGlow}`
                : `0 8px 24px rgba(0,0,0,0.3)`;

            return (
              <div
                key={lang.key}
                style={{
                  opacity: rowOpacity,
                  transform: `translateX(${rowX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: `1.5px solid ${blendedBorder}`,
                  backgroundColor: rowBg,
                  boxShadow: rowGlow,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    backgroundColor: langColor,
                    padding: "6px 12px",
                    borderRadius: 6,
                    minWidth: 92,
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {lang.name}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 17,
                    fontWeight: 500,
                    color: hashColor,
                    letterSpacing: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {HASH_SHORT}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.success,
                    opacity: matched,
                    width: 24,
                    textAlign: "center",
                  }}
                >
                  ✓
                </div>
              </div>
            );
          })}

          {/* Verdict */}
          <div
            style={{
              marginTop: 18,
              opacity: verdictOpacity,
              transform: `scale(${interpolate(verdictProgress, [0, 1], [0.7, 1])})`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: FONTS.heading,
                fontSize: 44,
                fontWeight: 800,
                color: COLORS.background,
                backgroundColor: COLORS.success,
                padding: "16px 40px",
                borderRadius: 16,
                letterSpacing: 1,
                boxShadow: `0 12px 50px ${COLORS.successGlow}`,
              }}
            >
              <span style={{ fontSize: 36 }}>✓</span>
              BYTE-IDENTICAL
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
