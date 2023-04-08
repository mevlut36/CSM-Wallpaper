import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/customize-progress-bar.css";
import AudioPlayer from "./components/AudioPlayer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AudioPlayer />
  </React.StrictMode>
);
