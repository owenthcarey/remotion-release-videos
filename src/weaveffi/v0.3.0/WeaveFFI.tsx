import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATIONS, TRANSITION_DURATION } from "./theme";
import { IntroScene } from "./scenes/IntroScene";
import { TaglineScene } from "./scenes/TaglineScene";
import { GeneratorsScene } from "./scenes/GeneratorsScene";
import { AsyncScene } from "./scenes/AsyncScene";
import { PatternsScene } from "./scenes/PatternsScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { OutroScene } from "./scenes/OutroScene";

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
  />
);

export const WeaveFFI: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.intro}
      >
        <IntroScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.tagline}
      >
        <TaglineScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.generators}
      >
        <GeneratorsScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.async}
      >
        <AsyncScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.patterns}
      >
        <PatternsScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.features}
      >
        <FeaturesScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.outro}
      >
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

const sceneDurations = Object.values(SCENE_DURATIONS);
const totalSceneFrames = sceneDurations.reduce((a, b) => a + b, 0);
const totalTransitionOverlap = (sceneDurations.length - 1) * TRANSITION_DURATION;
export const TOTAL_DURATION = totalSceneFrames - totalTransitionOverlap;
