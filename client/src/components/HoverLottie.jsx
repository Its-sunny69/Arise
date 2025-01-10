//not in used untill now 
import React, { useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const HoverLottie = ({ src, width, height }) => {
  const lottieInstanceRef = useRef(null);

  const dotLottieRefCallback = (instance) => {
    lottieInstanceRef.current = instance;
  };

  const handleMouseEnter = () => {
    if (lottieInstanceRef.current) {
      lottieInstanceRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (lottieInstanceRef.current) {
      lottieInstanceRef.current.loop = false;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DotLottieReact
        src={src}
        dotLottieRefCallback={dotLottieRefCallback}
        loop={false}
        autoplay
        style={{width: width, height: height}}
      />
    </div>
  );
};

export default HoverLottie;
