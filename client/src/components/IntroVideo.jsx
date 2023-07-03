import React from "react";
import introVideo from "../assets/video_intro.mp4";

const IntroVideo = () => {
  return (
    <div
      className="intro_video"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        backgroundColor: "var(--color-green)",
        borderRadius: "10px",
      }}
    >
      <video
        controls
        style={{
          width: "100%",
          height: "100%",
        }}
        autoPlay={true}
        muted={true}
        loop={true}
      >
        <source src={introVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default IntroVideo;
