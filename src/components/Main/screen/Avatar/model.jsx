import React from "react";
function Model() {
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[2, 32]} />
    </mesh>
  )
}

export default Model;
