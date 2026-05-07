import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: headingFont } = loadPlusJakartaSans("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const { fontFamily: monoFont } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const FONTS = {
  heading: headingFont,
  mono: monoFont,
};

// Deep midnight base — warmer than pure black, lets color glows breathe.
export const COLORS = {
  background: "#0d0a1f",
  backgroundDeep: "#080513",
  surface: "#1a1538",
  surfaceLight: "#241c4d",
  border: "#332866",
  borderBright: "#4a3a8c",

  // Brand: WeaveFFI canary yellow.
  accent: "#F5C518",
  accentDim: "rgba(245, 197, 24, 0.12)",
  accentGlow: "rgba(245, 197, 24, 0.35)",
  accentSoft: "rgba(245, 197, 24, 0.20)",

  // Secondary: vivid magenta — complementary to yellow on the colour wheel.
  secondary: "#EC4899",
  secondaryDim: "rgba(236, 72, 153, 0.12)",
  secondaryGlow: "rgba(236, 72, 153, 0.35)",

  // Tertiary: cyan — for code keywords and the third gradient blob.
  tertiary: "#22D3EE",
  tertiaryDim: "rgba(34, 211, 238, 0.12)",
  tertiaryGlow: "rgba(34, 211, 238, 0.30)",

  // Success: emerald — used when the SHA-256 hashes match.
  success: "#10B981",
  successGlow: "rgba(16, 185, 129, 0.45)",

  textPrimary: "#f5f3ff",
  textSecondary: "#b4a8e6",
  textMuted: "#7a6db0",

  codeKeyword: "#C792EA",
  codeFunction: "#82AAFF",
  codeString: "#C3E88D",
  codeParam: "#F78C6C",
  codeComment: "#546E7A",
  codePunctuation: "#89DDFF",
  codeNumber: "#F78C6C",
};

// Each language card uses its official-ish brand colour.
export const LANGUAGE_COLORS = {
  python: "#3776AB",
  node: "#83CD29",
  go: "#00ADD8",
  ruby: "#CC342D",
  swift: "#F05138",
  dart: "#00B4AB",
  c: "#A8B9CC",
  cpp: "#5C8DBC",
  csharp: "#9B4DCA",
  kotlin: "#B07FFF",
  wasm: "#7B3FE4",
};

export const SCENE_DURATIONS = {
  intro: 90,
  hook: 90,
  input: 90,
  pipeline: 100,
  languages: 130,
  code: 150,
  hash: 180,
  outro: 100,
};

export const TRANSITION_DURATION = 12;
