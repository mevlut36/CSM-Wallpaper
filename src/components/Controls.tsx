import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

interface Track {
  title: string;
  src: string; // Remplacez 'string' par le type approprié pour le fichier audio
  author: string;
  thumbnail: string; // Remplacez 'string' par le type approprié pour l'image
  color: string;
  video: string;
}

interface ControlsProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: (time: number) => void;
  tracks: Track[]; // Remplacez any par le type approprié pour vos pistes
  trackIndex: number;
  setTrackIndex: (index: number) => void;
  setCurrentTrack: (track: Track) => void; // Remplacez any par le type approprié pour vos pistes
  handleNext: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef<number | null>(null);

  const repeat = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(parseFloat(progressBarRef.current.value) / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const handlePrevious = () => {
    let newIndex;
    if (trackIndex === 0) {
      newIndex = tracks.length - 1;
    } else {
      newIndex = trackIndex - 1;
    }
    setTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp color="#ffffff" />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <IoPauseSharp color="#ffffff" />
          ) : (
            <IoPlaySharp color="#ffffff" />
          )}
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp color="#ffffff" />
        </button>
      </div>

      <div className="volume">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff color="#ffffff" />
          ) : volume < 40 ? (
            <IoMdVolumeLow color="#ffffff" />
          ) : (
            <IoMdVolumeHigh color="#ffffff" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          style={{
            background: `linear-gradient(to right, #ffffff ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};
export default Controls;
