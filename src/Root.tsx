import "./index.css";
import { Composition, Folder } from "remotion";
import { WeaveFFI, TOTAL_DURATION as WeaveFFI_v030_DURATION } from "./weaveffi/v0.3.0/WeaveFFI";
import { Wybthon, TOTAL_DURATION as Wybthon_v0200_DURATION } from "./wybthon/v0.20.0/Wybthon";
import { PythonNative } from "./pythonnative/v0.6.0/PythonNative";
import { Hydrateless } from "./hydrateless/v0.3.0/Hydrateless";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="WeaveFFI">
        <Composition
          id="WeaveFFI-v0-3-0"
          component={WeaveFFI}
          durationInFrames={WeaveFFI_v030_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Wybthon">
        <Composition
          id="Wybthon-v0-20-0"
          component={Wybthon}
          durationInFrames={Wybthon_v0200_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="PythonNative">
        <Composition
          id="PythonNative-v0-6-0"
          component={PythonNative}
          durationInFrames={60}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Hydrateless">
        <Composition
          id="Hydrateless-v0-3-0"
          component={Hydrateless}
          durationInFrames={60}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
