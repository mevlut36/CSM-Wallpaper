import { BsMusicNoteBeamed } from "react-icons/bs";
import AudioSpectrum from "react-audio-spectrum";
import { useRef, useState, RefObject } from "react";
import view from "./AudioPlayer";

interface DisplayTrackProps {
  currentTrack: any;
  audioRef: RefObject<HTMLAudioElement>;
  setDuration: (duration: number) => void;
  progressBarRef: RefObject<HTMLInputElement>;
  handleNext: () => void;
}

interface CheckedItems {
  [key: string]: boolean;
}

const DisplayTrack: React.FC<DisplayTrackProps> = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    if (audioRef.current && progressBarRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds.toString();
    }
  };

  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        id="audio-element"
      />
      <div className="audio-info">
        <div className="audio-image">
          <AudioSpectrum
            className="audio-canvas"
            id="audio-canvas"
            height={100}
            width={600}
            audioId={"audio-element"}
            capColor={"red"}
            capHeight={2}
            meterWidth={2}
            meterCount={512}
            meterColor={[
              { stop: 0, color: "#ffffff" },
              { stop: 0.5, color: "#ffffff" },
              { stop: 1, color: "#ffffff" },
            ]}
            gap={4}
          />
          {currentTrack.thumbnail ? (
           view() ? (<img src={currentTrack.thumbnail} alt="audio avatar" />) : (<iframe width="600" height="500" src={currentTrack.video+'?autoplay=1'}/>)
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="text">
        <p className="title">{currentTrack.title}</p>
        <p className="title">{currentTrack.author}</p>
      </div>
    </div>
  );
};
export default DisplayTrack;
