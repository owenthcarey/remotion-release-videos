import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATIONS, TRANSITION_DURATION } from "./theme";
import { IntroScene } from "./scenes/IntroScene";
import { HookScene } from "./scenes/HookScene";
import { InputScene } from "./scenes/InputScene";
import { PipelineScene } from "./scenes/PipelineScene";
import { LanguagesGridScene } from "./scenes/LanguagesGridScene";
import { CodeShowcaseScene } from "./scenes/CodeShowcaseScene";
import { HashRevealScene } from "./scenes/HashRevealScene";
import { OutroScene } from "./scenes/OutroScene";

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
  />
);

export const WeaveFFIImage: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.intro}
      >
        <IntroScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.hook}
      >
        <HookScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.input}
      >
        <InputScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.pipeline}
      >
        <PipelineScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.languages}
      >
        <LanguagesGridScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.code}
      >
        <CodeShowcaseScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.hash}
      >
        <HashRevealScene />
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
