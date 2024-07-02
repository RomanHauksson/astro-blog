import { Canvas } from "@react-three/fiber";
import { Splat, OrbitControls } from "@react-three/drei";
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

// rotation values
// X
// mouse is at bottom: 0.55
// middle: 0.35
// top: 0.15
// 0.15 + mouseposition.y * 0.4

// Y
// left: -0.2
// middle: 0
// right: 0.2
// -0.2 + mouseposition * 0.4

const Roman = () => {
  // The position of the user's mouse on the screen, as a fraction of screen width or height
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     const { pageX, pageY } = event;

  //     const xFraction = (pageX / document.documentElement.scrollWidth);
  //     const yFraction = (pageY / document.documentElement.scrollHeight);
  
  //     setMousePosition({ x: xFraction, y: yFraction });
  //   };
  
  //   window.addEventListener('mousemove', handleMouseMove);
  
  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

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

  // const handlePositionSliderChange = (axis, value) => {
  //   setCameraPosition(prev => ({ ...prev, [axis]: parseFloat(value) }));
  // };

  // const handleRotationSliderChange = (axis, value) => {
  //   setRotation(prev => ({ ...prev, [axis]: parseFloat(value) }));
  // };

  return (
    // <div className="relative h-[36rem] w-full rounded-lg m-auto border-2 border-slate-800">
    <div className="relative h-[36rem] w-full m-auto">
      {/* <Icon className="absolute top-0 right-0 m-4 h-8 w-8 text-slate-300" icon="material-symbols:3d-rotation" /> */}
      {/* <div className="p-4 flex flex-col">
        <label>X: <input type="range" step="0.01" min="-1" max="1" value={cameraPosition.x} onChange={(e) => handlePositionSliderChange('x', e.target.value)} />{cameraPosition.x} </label>
        <label>Y:  <input type="range" min="-2" max="1" step="0.01" value={cameraPosition.y} onChange={(e) => handlePositionSliderChange('y', e.target.value)} />{cameraPosition.y}</label>
        <label>Z:  <input type="range" min="-2" max="1" step="0.01" value={cameraPosition.z} onChange={(e) => handlePositionSliderChange('z', e.target. value)} />{cameraPosition.z}</label>
      </div> */}
      {/* <div className="p-4 flex flex-col">
        <label>rotX: <input type="range" step="0.05" min="-1" max="1" value={rotation.x} onChange={(e) => handleRotationSliderChange('x', e.target.value)} />{rotation.x} </label>
        <label>rotY:  <input type="range" min="-1" max="1" step="0.05" value={rotation.y} onChange={(e) => handleRotationSliderChange('y', e.target.value)} />{rotation.y}</label>
        <label>rotZ:  <input type="range" min="-1" max="1" step="0.05" value={rotation.z} onChange={(e) => handleRotationSliderChange('z', e.target. value)} />{rotation.z}</label>
      </div> */}
      <Canvas camera={{ position: [0, 0, 0], rotation: [0, 0, 0]}}>
        <OrbitControls />
        <Splat
          src="https://roman.technology/Roman.splat"
          position={[0.3, -0.43, -1.74]}
          rotation={[0.15 + mousePosition.y * 0.4, -0.2 + mousePosition.x * 0.4, 0]}
        />
      </Canvas>
    </div>
  );
};

export default Roman;