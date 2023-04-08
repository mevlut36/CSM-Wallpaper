import { useRef, useState } from "react";
import { tracks } from "../assets/tracks";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

interface CheckedItems {
  [key: string]: boolean;
}

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const { color } = currentTrack;
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [video] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  var handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  var view = checkedItems['option-view'] || false

  return (
    <>
      <style>
      {`
        body {
          font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: ${color};
          margin: 0 10px;
        }`
      }
      </style>
      <div className={checkedItems['option-icons'] ? "" : "audio-players"}>
        <div className="inner">
          <div className="option-menu">
            <h1 onClick={toggleDropdown} className="menu-title">Menu Options</h1>
            {dropdownVisible && (
              <div>
                <label className="checkbox-btn">
                  <label htmlFor="checkbox">Disable / Enable icons</label>
                  <input type="checkbox" name="option-icons" checked={checkedItems['option-icons'] || false} onChange={handleChange} />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-btn">
                  <label htmlFor="checkbox">Disable / Enable time</label>
                  <input type="checkbox" name="option-time" checked={checkedItems['option-time'] || false} onChange={handleChange} />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-btn">
                  <label htmlFor="checkbox">Hide / Show controls</label>
                  <input type="checkbox" name="option-bar" checked={checkedItems['option-bar'] || false} onChange={handleChange} />
                  <span className="checkmark"></span>
                </label>
              </div>
            )}
          </div>
          <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          {!checkedItems['option-bar'] && (
  <>
    <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
    <Controls
      {...{
        audioRef,
        progressBarRef,
        duration,
        setTimeProgress,
        tracks,
        trackIndex,
        setTrackIndex,
        setCurrentTrack,
        handleNext,
      }}
    />
  </>
)}

          {checkedItems['option-time'] ? "" : <Timer />}
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
