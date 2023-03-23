import { BsMusicNoteBeamed } from 'react-icons/bs';
import AudioSpectrum from 'react-audio-spectrum';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
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
              audioId={'audio-element'}
              capColor={'red'}
              capHeight={2}
              meterWidth={2}
              meterCount={512}
              meterColor={[
                {stop: 0, color: '#ffffff'},
                {stop: 0.5, color: '#ffffff'},
                {stop: 1, color: '#ffffff'}
              ]}
              gap={4}
            />
          {currentTrack.thumbnail ? (<img src={currentTrack.thumbnail} alt="audio avatar" />) : (
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
