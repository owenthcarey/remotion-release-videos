import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: headingFont } = loadOutfit("normal", {
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

export const COLORS = {
  background: "#09090b",
  surface: "#18181b",
  surfaceLight: "#1e1e22",
  border: "#27272a",
  accent: "#F5C518",
  accentDim: "rgba(245, 197, 24, 0.12)",
  accentGlow: "rgba(245, 197, 24, 0.25)",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
};

export const SCENE_DURATIONS = {
  intro: 120,
  tagline: 105,
  generators: 135,
  async: 120,
  patterns: 120,
  features: 120,
  outro: 120,
};

export const TRANSITION_DURATION = 15;
