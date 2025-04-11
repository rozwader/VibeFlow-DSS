"use client";
import { useState, useEffect } from "react";

const SliderComponent = (props) => {
  const [localTime, setLocalTime] = useState(props.time);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) setLocalTime(props.time);
  }, [props.time, isDragging]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md flex items-center gap-3">
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatTime(localTime)}
      </span>
      <input
        type="range"
        min="0"
        max={props.duration || 1}
        value={localTime}
        onChange={(e) => setLocalTime(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => {
          setIsDragging(false);
          props.onSeek(localTime);
        }}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => {
          setIsDragging(false);
          props.onSeek(localTime);
        }}
        className="flex-1 h-1 bg-[#535353] rounded-full accent-[#ac46fe]"
      />
      <span className="text-xs text-gray-400 w-10">
        {formatTime(props.duration)}
      </span>
    </div>
  );
};

export default SliderComponent;