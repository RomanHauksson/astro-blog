import { Canvas, useFrame } from "@react-three/fiber";
import { Splat } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";

const MobileSplat = () => {
  const splatRef = useRef();
  const [rotation, setRotation] = useState(0);

  useFrame(() => {
    setRotation((prev) => (prev + 0.02) % (2 * Math.PI));
    // if (splatRef.current) {
    //   splatRef.current.rotation.y = rotation;
    // }
  });

  return (
    <Splat
      ref={splatRef}
      src="https://roman.technology/Roman.splat"
      position={[0.3, -0.43, -1.74]}
      rotation={[
        0.15 + ((Math.sin(rotation) + 1) / 2) * 0.4,
        -0.2 + ((Math.cos(rotation) + 1) / 2) * 0.4,
        0,
      ]}
    />
  );
};

const Roman = () => {
  // The position of the user's mouse on the screen, as a fraction of screen width or height
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const xPercentage = clientX / innerWidth;
      const yPercentage = clientY / innerHeight;

      setMousePosition({ x: xPercentage, y: yPercentage });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <BrowserView className="relative h-[36rem] w-full m-auto">
        <Canvas camera={{ position: [0, 0, 0], rotation: [0, 0, 0] }}>
          <Splat
            src="https://roman.technology/Roman.splat"
            position={[0.3, -0.43, -1.74]}
            rotation={[
              0.15 + mousePosition.y * 0.4,
              -0.2 + mousePosition.x * 0.4,
              0,
            ]}
          />
        </Canvas>
      </BrowserView>
      <MobileView className="relative h-[36rem] w-full m-auto">
        <Canvas camera={{ position: [0, 0, 0], rotation: [0, 0, 0] }}>
          <MobileSplat />
        </Canvas>
      </MobileView>
    </>
  );
};

export default Roman;
