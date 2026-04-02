import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_DURATIONS, TRANSITION_DURATION } from "./theme";
import { IntroScene } from "./scenes/IntroScene";
import { IdentityScene } from "./scenes/IdentityScene";
import { CodeShowcaseScene } from "./scenes/CodeShowcaseScene";
import { NewPrimitivesScene } from "./scenes/NewPrimitivesScene";
import { FlowScopesScene } from "./scenes/FlowScopesScene";
import { OutroScene } from "./scenes/OutroScene";

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
  />
);

export const Wybthon: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.intro}
      >
        <IntroScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.identity}
      >
        <IdentityScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.codeShowcase}
      >
        <CodeShowcaseScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.newPrimitives}
      >
        <NewPrimitivesScene />
      </TransitionSeries.Sequence>

      {transition}

      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.flowScopes}
      >
        <FlowScopesScene />
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
