import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadFiraCode } from "@remotion/google-fonts/FiraCode";

const { fontFamily: headingFont } = loadPlusJakartaSans("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const { fontFamily: monoFont } = loadFiraCode("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const FONTS = {
  heading: headingFont,
  mono: monoFont,
};

export const COLORS = {
  background: "#0a0a12",
  surface: "#12122a",
  surfaceLight: "#1a1a3a",
  border: "#2a2a4a",
  accent: "#3B9CF4",
  accentDim: "rgba(59, 156, 244, 0.10)",
  accentGlow: "rgba(59, 156, 244, 0.25)",
  secondary: "#F4D03F",
  secondaryDim: "rgba(244, 208, 63, 0.10)",
  secondaryGlow: "rgba(244, 208, 63, 0.20)",
  textPrimary: "#eeeef6",
  textSecondary: "#9898b8",
  textMuted: "#686888",

  codeKeyword: "#7EB6FF",
  codeDecorator: "#C792EA",
  codeFunction: "#82AAFF",
  codeString: "#C3E88D",
  codeParam: "#F78C6C",
  codeComment: "#546E7A",
  codePunctuation: "#89DDFF",
};

export const SCENE_DURATIONS = {
  intro: 110,
  identity: 120,
  codeShowcase: 160,
  newPrimitives: 150,
  flowScopes: 140,
  outro: 120,
};

export const TRANSITION_DURATION = 15;
