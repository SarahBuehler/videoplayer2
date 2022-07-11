import React, { useRef } from "react";
import "./main.css";

function Main() {
  const media = useRef();
  const forwardButton = useRef();
  const rewindButton = useRef();
  const volume = useRef();

  function playPauseMedia() {
    // console.log(media.current);
    //console.log(media.current.paused);
    // The read-only HTMLMediaElement.paused property tells whether the media element is paused.
    if (media.current.paused) {
      // console.log("video pausiert und läuft jetzt");
      media.current.play();
    } else {
      // console.log("video lief und wurde gestoppt");
      media.current.pause();
    }
  }

  function stopMedia() {
    //console.log(media.current.currentTime);
    // Video beginnt bei currentTime = 0 sek
    // .duration gibt Gesamtlänge in sek aus
    // console.log(media.current.duration);
    rewindButton.current.classList.remove("active");
    forwardButton.current.classList.remove("active");
    clearInterval(intervalRewind);
    clearInterval(intervalForward);
    media.current.pause();
    media.current.currentTime = 0;
  }
  let intervalForward;
  let intervalRewind;

  function rewindMedia() {
    // console.log(forwardButton.current.classList);
    clearInterval(intervalForward);
    forwardButton.current.classList.remove("active");
    if (rewindButton.current.classList.contains("active")) {
      rewindButton.current.classList.remove("active");
      clearInterval(intervalRewind);
      media.current.play();
    } else {
      rewindButton.current.classList.add("active");
      media.current.pause();
      intervalRewind = setInterval(windBackward, 200);
    }
  }

  function forwardMedia() {
    clearInterval(intervalRewind);
    rewindButton.current.classList.remove("active");
    if (forwardButton.current.classList.contains("active")) {
      forwardButton.current.classList.remove("active");
      clearInterval(intervalForward);
      media.current.play();
    } else {
      forwardButton.current.classList.add("active");
      media.current.pause();
      intervalForward = setInterval(windForward, 200);
    }
  }

  function windBackward() {
    if (media.current.currentTime <= 3) {
      rewindButton.current.classList.remove("active");
      clearInterval(intervalRewind);
      stopMedia();
    } else {
      media.current.currentTime -= 3;
    }
  }

  function windForward() {
    if (media.current.currentTime >= media.current.duration - 3) {
      forwardButton.current.classList.remove("active");
      clearInterval(intervalForward);
      stopMedia();
    } else {
      media.current.currentTime += 3;
    }
  }

  function setVolume() {
    // console.log(media.current.volume);
    media.current.volume = volume.current.value / 100;
  }

  return (
    <main>
      <div className="wrapper">
        <div className="container">
          <div className="player">
            <video controls ref={media}>
              <source src="./media/quallen.mp4" type="video/mp4" />
              <p>Your browser doesn't support HTML5 video. </p>
            </video>
          </div>
          <div className="controlButtons">
            <button
              className="play"
              aria-label="play pause toggle"
              onClick={playPauseMedia}
            >
              Play / Pause
            </button>
            <button className="stop" aria-label="stop" onClick={stopMedia}>
              Stop
            </button>
            <button
              className="rewind"
              aria-label="rewind"
              onClick={rewindMedia}
              ref={rewindButton}
            >
              Rewind
            </button>
            <button
              className="forward"
              aria-label="forward"
              ref={forwardButton}
              onClick={forwardMedia}
            >
              Forward
            </button>
            <input
              type="range"
              min="0"
              max="100"
              className="slider"
              defaultValue="50"
              ref={volume}
              onChange={setVolume}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
