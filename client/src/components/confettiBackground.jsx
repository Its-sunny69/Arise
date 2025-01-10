import React, { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const ConfettiBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    // This function runs only once when the component is mounted
    const load = async () => {
      const { tsParticles } = await import("@tsparticles/engine");
      await loadConfettiPreset(tsParticles);
      setInit(true);
    };

    load();
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles-confetti"
          options={{
            preset: "confetti", // This activates the Confetti preset
            background: {
              color: {
                value: "#ffffff", // Optional: Set the background color if needed
              },
            },
            particles: {
              color: {
                value: "#ff0000", // Optional: Set confetti color
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out", // Makes the confetti particles leave the screen
                },
                speed: 3,
              },
              number: {
                value: 200, // Number of confetti particles
                density: {
                  enable: true,
                  area: 800,
                },
              },
              shape: {
                type: "polygon", // Shape of the confetti
              },
              size: {
                value: { min: 5, max: 10 }, // Confetti particle size
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ConfettiBackground;
