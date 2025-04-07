import { useState } from "react";

const SliderComponent = (props) => {

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return ( // do zmiany jak api sie rozwinie
    <div className="w-3/7 mx-auto p-4 flex items-center justify-center">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
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
      <p className="ml-2 text-white text-center">{props.time}</p>
    </div>
  );
};

export default SliderComponent;
