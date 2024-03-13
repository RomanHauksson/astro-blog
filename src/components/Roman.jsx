import { Canvas } from "@react-three/fiber";
import { Splat, OrbitControls } from "@react-three/drei";
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

const Roman = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const xPercentage = ((clientX / innerWidth));
      const yPercentage = ((clientY / innerHeight));

      setMousePosition({ x: xPercentage, y: yPercentage });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-[36rem] w-full rounded-lg m-auto border-2 border-slate-800 overflow-hidden">
      {/* <Icon className="absolute top-0 right-0 m-4 h-8 w-8 text-slate-300" icon="material-symbols:3d-rotation" /> */}
      <Canvas camera={{ position: [-1.7, 0.6, 0] }}>
        <OrbitControls />
        <Splat
          src="https://roman.technology/Roman.splat"
          rotation={[0 * Math.PI, (mousePosition.x * 0.2 - 0.1) * Math.PI, (mousePosition.y * 0.2 - 0.1) * Math.PI]}
        />
      </Canvas>
    </div>
  );
};

export default Roman;