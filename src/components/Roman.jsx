import { Canvas } from "@react-three/fiber";
import { Splat, OrbitControls } from "@react-three/drei";
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

const Roman = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
  const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0, z: 0 });

  const basePosition = [0.3, -0.43, -1.74];
  const baseRotation = [0.35, 0, 0];

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

  const handlePositionSliderChange = (axis, value) => {
    setCameraPosition(prev => ({ ...prev, [axis]: parseFloat(value) }));
  };

  const handleRotationSliderChange = (axis, value) => {
    setCameraRotation(prev => ({ ...prev, [axis]: parseFloat(value) }));
  };

  return (
    <div className="relative h-[36rem] w-full rounded-lg m-auto border-2 border-slate-800">
      {/* <Icon className="absolute top-0 right-0 m-4 h-8 w-8 text-slate-300" icon="material-symbols:3d-rotation" /> */}
      {/* <div className="p-4 flex flex-col">
        <label>X: <input type="range" step="0.01" min="-1" max="1" value={cameraPosition.x} onChange={(e) => handlePositionSliderChange('x', e.target.value)} />{cameraPosition.x} </label>
        <label>Y:  <input type="range" min="-2" max="1" step="0.01" value={cameraPosition.y} onChange={(e) => handlePositionSliderChange('y', e.target.value)} />{cameraPosition.y}</label>
        <label>Z:  <input type="range" min="-2" max="1" step="0.01" value={cameraPosition.z} onChange={(e) => handlePositionSliderChange('z', e.target. value)} />{cameraPosition.z}</label>
      </div>
      <div className="p-4 flex flex-col">
        <label>rotX: <input type="range" step="0.05" min="-1" max="1" value={cameraRotation.x} onChange={(e) => handleRotationSliderChange('x', e.target.value)} />{cameraRotation.x} </label>
        <label>rotY:  <input type="range" min="-1" max="1" step="0.05" value={cameraRotation.y} onChange={(e) => handleRotationSliderChange('y', e.target.value)} />{cameraRotation.y}</label>
        <label>rotZ:  <input type="range" min="-1" max="1" step="0.05" value={cameraRotation.z} onChange={(e) => handleRotationSliderChange('z', e.target. value)} />{cameraRotation.z}</label>
      </div> */}
      <Canvas camera={{ position: [0, 0, 0], rotation: [0, 0, 0]}}>
      {/* <Canvas> */}
        <OrbitControls />
        <Splat
          src="http://localhost:4321/output2-cropped.splat"
          // rotation={[0 * Math.PI, (mousePosition.x * 0.2 - 0.1) * Math.PI, (mousePosition.y * 0.2 - 0.1) * Math.PI]}
          // rotation = {[Math.PI * cameraPosition.x, Math.PI * cameraPosition.y, Math.PI * cameraPosition.z]}
          position={[0.3, -0.43, -1.74]}
          rotation={[0.35, 0, 0]}
        />
      </Canvas>
    </div>
  );
};

export default Roman;