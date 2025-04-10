"use client"

import { useEffect, useState } from "react";

const SliderComponent = (props) => {
  const handleChange = (e) => {
    props.setTime(e.target.value)
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className="w-3/7 mx-auto p-4 flex items-center justify-center" id="timeTracker">
      <input
        type="range"
        min="0"
        max={props.duration}
        value={props.time}
        onChange={handleChange}
        className="
          w-full
          appearance-none
          bg-gray-300
          h-2
          rounded-lg
          overflow-hidden
          cursor-pointer
          accent-blue-500
          range-slider
        "
      />
      <p className="ml-2 text-white text-center">{millisToMinutesAndSeconds(props.duration)}</p>
    </div>
  );
};

export default SliderComponent;
