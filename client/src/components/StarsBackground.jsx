import React, { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

const StarsBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { tsParticles } = await import("@tsparticles/engine");
      await loadStarsPreset(tsParticles);
      setInit(true);
    };

    load();
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            preset: "stars",
            background: {
              color: {
                value: "white", // Background transparent
              },
            },
            particles: {
              color: {
                value: "#000000", // Particles black
              },
            },
            
          }}
        />
      )}
    </>
  );
};

export default StarsBackground;
