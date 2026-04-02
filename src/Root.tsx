import "./index.css";
import { Composition } from "remotion";
import { WeaveFFI, TOTAL_DURATION } from "./weaveffi/WeaveFFI";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WeaveFFI-v030"
        component={WeaveFFI}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
