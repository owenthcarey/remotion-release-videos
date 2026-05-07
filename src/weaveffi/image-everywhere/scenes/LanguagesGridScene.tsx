import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, LANGUAGE_COLORS } from "../theme";

type Lang = {
  key: keyof typeof LANGUAGE_COLORS;
  name: string;
  badge: string;
};

const LANGS: Lang[] = [
  { key: "python", name: "Python", badge: "py" },
  { key: "node", name: "Node.js", badge: "js" },
  { key: "go", name: "Go", badge: "go" },
  { key: "ruby", name: "Ruby", badge: "rb" },
  { key: "swift", name: "Swift", badge: "sw" },
  { key: "dart", name: "Dart", badge: "dt" },
  { key: "c", name: "C", badge: "{ }" },
  { key: "cpp", name: "C++", badge: "++" },
  { key: "csharp", name: ".NET", badge: "C#" },
  { key: "kotlin", name: "Kotlin", badge: "kt" },
  { key: "wasm", name: "WASM", badge: "wa" },
];

export const LanguagesGridScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headingY = interpolate(headingProgress, [0, 1], [25, 0]);

  const arrowProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

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
          height: 1000,
          background: `radial-gradient(ellipse, ${COLORS.accent}10 0%, transparent 65%)`,
          filter: "blur(120px)",
          top: "5%",
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
            gap: 40,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              opacity: headingProgress,
              transform: `translateY(${headingY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.accent,
                backgroundColor: COLORS.accentDim,
                padding: "12px 24px",
                borderRadius: 14,
                border: `1.5px solid ${COLORS.accent}55`,
              }}
            >
              1 IDL
            </span>
            <span
              style={{
                fontFamily: FONTS.heading,
                fontSize: 50,
                fontWeight: 700,
                color: COLORS.textSecondary,
                opacity: arrowProgress,
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.secondary,
                backgroundColor: COLORS.secondaryDim,
                padding: "12px 24px",
                borderRadius: 14,
                border: `1.5px solid ${COLORS.secondary}55`,
              }}
            >
              11 native SDKs
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 18,
              width: "100%",
              maxWidth: 1320,
            }}
          >
            {LANGS.map((lang, i) => {
              const cardProgress = spring({
                frame,
                fps,
                delay: 22 + i * 4,
                config: { damping: 14 },
              });
              const cardOpacity = interpolate(
                cardProgress,
                [0, 0.5],
                [0, 1],
                { extrapolateRight: "clamp" },
              );
              const cardScale = interpolate(cardProgress, [0, 1], [0.7, 1]);
              const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

              const langColor = LANGUAGE_COLORS[lang.key];

              return (
                <div
                  key={lang.key}
                  style={{
                    opacity: cardOpacity,
                    transform: `translateY(${cardY}px) scale(${cardScale})`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: COLORS.surface,
                      borderRadius: 18,
                      padding: "26px 22px",
                      border: `2px solid ${langColor}80`,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 40px ${langColor}30`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#fff",
                        backgroundColor: langColor,
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 6px 20px ${langColor}80`,
                      }}
                    >
                      {lang.badge}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 28,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        letterSpacing: -0.5,
                      }}
                    >
                      {lang.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 12th cell — fill with a "WeaveFFI" branded card to balance the 4×3 grid */}
            {(() => {
              const cardProgress = spring({
                frame,
                fps,
                delay: 22 + LANGS.length * 4,
                config: { damping: 14 },
              });
              const cardOpacity = interpolate(
                cardProgress,
                [0, 0.5],
                [0, 1],
                { extrapolateRight: "clamp" },
              );
              const cardScale = interpolate(cardProgress, [0, 1], [0.7, 1]);
              const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

              return (
                <div
                  style={{
                    opacity: cardOpacity,
                    transform: `translateY(${cardY}px) scale(${cardScale})`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: COLORS.accent,
                      borderRadius: 18,
                      padding: "26px 22px",
                      border: `2px solid ${COLORS.accent}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 16,
                      boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 50px ${COLORS.accentGlow}`,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.heading,
                        fontSize: 24,
                        fontWeight: 800,
                        color: COLORS.background,
                        letterSpacing: -0.5,
                        textAlign: "center",
                      }}
                    >
                      + WeaveFFI
                      <div
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 14,
                          fontWeight: 500,
                          color: COLORS.background,
                          opacity: 0.7,
                          marginTop: 4,
                          letterSpacing: 1,
                        }}
                      >
                        glues them all
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
