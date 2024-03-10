import { Canvas } from "@react-three/fiber";
import { Splat, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Icon } from '@iconify/react';
// import splat from "../assets/Roman.splat"

const Roman = () => {
  return (
    <div className="relative h-[36rem] w-full rounded-lg m-auto border-2 border-slate-800">
      <Icon className="absolute top-0 right-0 m-4 h-8 w-8 text-slate-300" icon="material-symbols:3d-rotation" />
      <Canvas camera={{ position: [-1.7, 0.6, 0] }}>
        <OrbitControls />
        <Splat
          src="https://roman.technology/Roman.splat"
          rotation={[0 * Math.PI, 0 * Math.PI, 0 * Math.PI]}
        />
      </Canvas>
    </div>
  );
};

export default Roman;