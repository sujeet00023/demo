'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Engine, Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };
return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: { enable: false },
            background: {
              color: {
                value: '#ffffff',
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'attract',
                },
                onClick: {
                  enable: true,
                  mode: 'push',
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                attract: {
                  distance: 200,
                  duration: 0.4,
                  speed: 1,
                },
                push: {
                  quantity: 4,
                },
              },
            },
            particles: {
              color: {
                value: '#000000',
              },
              links: {
                color: '#000000',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                 /*  value_area: 800, */ // ✅ Correct key
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ParticleBackground;
