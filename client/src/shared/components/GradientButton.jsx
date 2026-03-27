import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { createAnimatable, spring, utils } from "animejs";

const GRADIENT_EASE = "out(2)";
const MOVE_DURATION = 340;
const LEAVE_DURATION = 520;
const EDGE_TRIGGER_PX = 28;

export default function GradientButton({ text, onClick }) {
  const buttonRef = useRef(null);
  const cursorAnimRef = useRef(null);
  const gradientAnimRef = useRef(null);
  const [gradientStop, setGradientStop] = useState({
    firstStop: 100,
    secondStop: 100,
  });

  useEffect(() => {
    const cursor = createAnimatable(
      { x: 0, y: 0 },
      {
        x: 0,
        y: 0,
        ease: "out(2)",
      },
    );

    const gradientUpdate = createAnimatable(
      { firstStop: 100, secondStop: 100 },
      {
        firstStop: 100,
        secondStop: 100,
        ease: GRADIENT_EASE,
      },
    );

    gradientUpdate.animations.secondStop.onRender = () => {
      setGradientStop({
        firstStop: Number(utils.roundPad(gradientUpdate.firstStop(), 2)),
        secondStop: Number(utils.roundPad(gradientUpdate.secondStop(), 2)),
      });
    };

    // cursor.animations.x.onRender = () => {
    //   console.log("GradientButton cursor (animejs):", {
    //     x: Number(utils.roundPad(cursor.x(), 2)),
    //     y: Number(utils.roundPad(cursor.y(), 2)),
    //   });
    // };

    cursorAnimRef.current = cursor;
    gradientAnimRef.current = gradientUpdate;

    return () => {
      cursor.revert();
      gradientUpdate.revert();
      cursorAnimRef.current = null;
      gradientAnimRef.current = null;
    };
  }, []);

  const handleMouseMove = (event) => {
    if (!cursorAnimRef.current || !buttonRef.current) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const activeMinX = EDGE_TRIGGER_PX;
    const activeMaxX = rect.width - EDGE_TRIGGER_PX;

    // if (localX <= activeMinX || localX >= activeMaxX) {
    //   handleMouseLeave();
    //   return;
    // }

    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    const x = utils.clamp(
      event.clientX - rect.left - halfWidth,
      -halfWidth,
      halfWidth,
    );
    const y = utils.clamp(
      event.clientY - rect.top - halfHeight,
      -halfHeight,
      halfHeight,
    );
    const stop = utils.clamp(((x + halfWidth) / rect.width) * 100, 0, 100);

    cursorAnimRef.current.x(x);
    cursorAnimRef.current.y(y);
    if (gradientAnimRef.current) {
      gradientAnimRef.current.firstStop(0, MOVE_DURATION, GRADIENT_EASE);
      gradientAnimRef.current.secondStop(stop, MOVE_DURATION, GRADIENT_EASE);
    }
  };

  const handleMouseLeave = () => {
    if (cursorAnimRef.current) {
      cursorAnimRef.current.x(0);
      cursorAnimRef.current.y(0);
    }

    if (gradientAnimRef.current) {
      gradientAnimRef.current.firstStop(100, LEAVE_DURATION, GRADIENT_EASE);
      gradientAnimRef.current.secondStop(100, LEAVE_DURATION, GRADIENT_EASE);
    }
  };

  return (
    <button
      ref={buttonRef}
      className="rounded-full bg-[#000000] font-title font-medium text-white transition-all active:scale-95 tracking-wider"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `linear-gradient(to right, #000000 ${gradientStop.firstStop}%, #e7f3ff ${gradientStop.secondStop}%, #00bfff 100%)`,
        backgroundSize: `120% 100%`,
        backgroundPosition: "center center",
      }}
    >
      <span className="inner-shadow-button inline-block rounded-full bg-transparent px-6 py-3 backdrop-blur-md">
        {text}
      </span>
    </button>
  );
}

GradientButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
