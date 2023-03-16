import { useState, useEffect, useRef, useCallback } from 'react';

import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp, IoPlaySharp, IoPauseSharp, } from 'react-icons/io5';
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow, } from 'react-icons/io';

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, handleNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp color='#ffffff'/>
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp color='#ffffff'/> : <IoPlaySharp color='#ffffff'/>}
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp color='#ffffff'/>
        </button>
      </div>

      <div className="volume">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (<IoMdVolumeOff color='#ffffff'/>) : volume < 40 ? (<IoMdVolumeLow color='#ffffff'/>) : (<IoMdVolumeHigh color='#ffffff'/>)}
        </button>
        <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #ffffff ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
