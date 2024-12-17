// import React, { useRef, useState, useEffect } from 'react';
// import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import * as THREE from 'three';

// // POIs scattered in different positions
// const POIs = [
//   { id: 1, name: 'Check-in', position: [2, 0.7, 1] },
//   { id: 2, name: 'Security', position: [-3, 0.7, 2] },
//   { id: 3, name: 'Gate A', position: [1.5, 0.7, -3] },
//   { id: 4, name: 'Cafeteria', position: [-1, 0.7, -2] },
//   { id: 5, name: 'Restroom', position: [3, 0.7, 0] }
// ];

// // Model component to load airport model
// const Model = ({ url }) => {
//   const { scene } = useLoader(GLTFLoader, url);
//   return <primitive object={scene} />;
// };

// // Draw scattered POIs on the map
// const DrawPOIs = ({ onPOIClick }) => {
//   return POIs.map(poi => (
//     <mesh
//       key={poi.id}
//       position={poi.position}
//       onClick={() => onPOIClick(poi)}
//     >
//       <sphereGeometry args={[0.05, 32, 32]} />
//       <meshStandardMaterial color={'red'} />
//     </mesh>
//   ));
// };

// // Click handler, moved inside Canvas using useThree
// const HandleMapClick = ({ setTargetPosition }) => {
//   const { camera, scene } = useThree();

//   const handleClick = (event) => {
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(scene.children, true);
//     if (intersects.length > 0) {
//       const point = intersects[0].point;
//       setTargetPosition([point.x, point.y + 0.7, point.z]);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('click', handleClick);
//     return () => {
//       window.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return null;  // This is a behavior hook, no render is needed
// };

// const AnimatedCharacter = ({ url, targetPosition }) => {
//   const fbx = useLoader(FBXLoader, url);
//   const mixer = useRef(null);
//   const characterRef = useRef(null);
//   const isMoving = useRef(false);
//   const speed = 0.02;

//   useEffect(() => {
//     if (fbx) {
//       fbx.scale.set(0.02, 0.02, 0.02);
//       mixer.current = new THREE.AnimationMixer(fbx);

//       if (fbx.animations.length > 0) {
//         const walkAction = mixer.current.clipAction(fbx.animations[0]);
//         walkAction.play();
//       } else {
//         console.warn('No animations found in FBX file.');
//       }
//     }
//   }, [fbx]);

//   useFrame((state, delta) => {
//     if (mixer.current) {
//       mixer.current.update(delta);
//     }

//     if (targetPosition && characterRef.current) {
//       const position = characterRef.current.position;
//       const target = new THREE.Vector3(...targetPosition);
//       const distance = position.distanceTo(target);

//       if (distance > 0.1) {
//         const direction = new THREE.Vector3().subVectors(target, position).normalize();
//         position.add(direction.multiplyScalar(speed));

//         const angle = Math.atan2(direction.x, direction.z);
//         characterRef.current.rotation.y = angle;

//         if (!isMoving.current) {
//           isMoving.current = true;
//           mixer.current.clipAction(fbx.animations[0]).play();
//         }
//       } else {
//         isMoving.current = false;
//         mixer.current.clipAction(fbx.animations[0]).stop();
//       }
//     }
//   });

//   return fbx ? <primitive ref={characterRef} object={fbx} position={[0, 0, 0]} /> : null;
// };

// // Main ThreeDViewer component
// const ThreeDViewer = () => {
//   const glbModelUrl = './models/Airport.glb';
//   const fbxUrl = './models/rp_sophia_animated_003_idling.fbx';
//   const [targetPosition, setTargetPosition] = useState(null);
//   const cameraRef = useRef();

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
//       <Canvas
//         camera={{ position: [0, 1.5, 5], fov: 60 }}
//         style={{ height: '100%', width: '100%' }}
//         onCreated={({ gl }) => {
//           gl.setClearColor('lightblue');
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 10]} intensity={1} />

//         <Model url={glbModelUrl} />
//         <DrawPOIs onPOIClick={(poi) => setTargetPosition(poi.position)} />
//         <HandleMapClick setTargetPosition={setTargetPosition} />
//         <AnimatedCharacter url={fbxUrl} targetPosition={targetPosition} />

//         <OrbitControls ref={cameraRef}
//   minPolarAngle={Math.PI / 3} // Lower limit for looking down
//   maxPolarAngle={Math.PI / 2} // Upper limit for looking up
// />

//       </Canvas>
//     </div>
//   );
// };

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

// POIs scattered in different positions
const POIs = [
  { id: 1, name: 'Check-in', position: [2, 0.7, 1] },
  { id: 2, name: 'Security', position: [-3, 0.7, 2] },
  { id: 3, name: 'Gate A', position: [1.5, 0.7, -3] },
  { id: 4, name: 'Cafeteria', position: [-1, 0.7, -2] },
  { id: 5, name: 'Restroom', position: [3, 0.7, 0] }
];

// Model component to load airport model
const Model = ({ url }) => {
  const { scene } = useLoader(GLTFLoader, url);
  return <primitive object={scene} />;
};

// Draw scattered POIs on the map
const DrawPOIs = ({ onPOIClick }) => {
  return POIs.map(poi => (
    <mesh
      key={poi.id}
      position={poi.position}
      onClick={() => onPOIClick(poi)}
    >
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  ));
};

// Click handler, moved inside Canvas using useThree
const HandleMapClick = ({ setTargetPosition }) => {
  const { camera, scene } = useThree();

  const handleClick = (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const point = intersects[0].point;
      setTargetPosition([point.x, point.y + 0.7, point.z]);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;  // This is a behavior hook, no render is needed
};

// AnimatedCharacter component to animate Sophia
const AnimatedCharacter = ({ url, targetPosition, objectsToDetect }) => {
    const fbx = useLoader(FBXLoader, url);
    const mixer = useRef(new THREE.AnimationMixer());
    const characterRef = useRef();
    const isMoving = useRef(false);
    const speed = 0.05;  // Slightly increase speed for better pacing
    const raycaster = useRef(new THREE.Raycaster());
    const direction = new THREE.Vector3();
    const collisionThreshold = 0.5;
  
    // Ground detection function
    const detectGround = () => {
      if (!characterRef.current || objectsToDetect.length === 0) return null;
  
      const origin = characterRef.current.position.clone();
      raycaster.current.set(origin, new THREE.Vector3(0, -1, 0));  // Downward ray
  
      const intersects = raycaster.current.intersectObjects(objectsToDetect, true);
      if (intersects.length > 0) {
        return intersects[0];  // Return first intersection with the ground
      }
      return null;
    };
  
    // Collision detection function
    const detectObjects = () => {
      if (!characterRef.current || objectsToDetect.length === 0) return false;
  
      const forwardRayOrigin = characterRef.current.position.clone();
      const forwardRayDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(characterRef.current.quaternion).normalize();  // Forward direction
  
      raycaster.current.set(forwardRayOrigin, forwardRayDirection);
      const intersects = raycaster.current.intersectObjects(objectsToDetect, true);
  
      return intersects.length > 0 && intersects[0].distance < collisionThreshold;  // Return true if obstacle detected
    };
  
    // Setup model and animations
    useEffect(() => {
      if (fbx) {
        fbx.scale.set(0.02, 0.02, 0.02);
        mixer.current = new THREE.AnimationMixer(fbx);
  
        if (fbx.animations.length > 0) {
          mixer.current.clipAction(fbx.animations[0]).play();
        }
      }
    }, [fbx]);
  
    // Update frame logic for movement
    useFrame((state, delta) => {
      if (mixer.current) {
        mixer.current.update(delta);
      }
  
      if (targetPosition && characterRef.current) {
        const position = characterRef.current.position;
        const target = new THREE.Vector3(...targetPosition);
        
        // Only update horizontal movement (x, z) towards the target
        const horizontalTarget = new THREE.Vector3(target.x, position.y, target.z);  // Keep current y-coordinate for movement
        const distance = position.distanceTo(horizontalTarget);
  
        if (distance > 0.2 && !detectObjects()) {  // Stop moving if too close or object detected
          direction.subVectors(horizontalTarget, position).normalize();
          position.add(direction.multiplyScalar(speed));  // Move toward target smoothly
  
          const angle = Math.atan2(direction.x, direction.z);  // Calculate the direction to face
          characterRef.current.rotation.y = angle;
  
          if (!isMoving.current) {
            isMoving.current = true;
            mixer.current.clipAction(fbx.animations[0]).play();  // Start walking animation
          }
        } else if (distance <= 0.2) {  // Refined stopping condition
          if (isMoving.current) {
            isMoving.current = false;
            mixer.current.clipAction(fbx.animations[0]).stop();  // Stop walking animation
          }
        }
  
        // Ground detection logic
        const groundIntersection = detectGround();
        if (groundIntersection) {
          characterRef.current.position.y = THREE.MathUtils.lerp(
            characterRef.current.position.y,
            groundIntersection.point.y + 0.7,  // Keep Sophia slightly above ground
            0.1  // Smooth transition to avoid jittering
          );
        } else {
          // Prevent sinking below a certain height
          characterRef.current.position.y = Math.max(characterRef.current.position.y, 0.7);
        }
  
        // Reset Sophia if she moves too far out of bounds
        if (position.y < -5 || position.y > 5) {
          characterRef.current.position.set(0, 0.7, 0);  // Reset position
        }
      }
    });
  
    return <primitive ref={characterRef} object={fbx} position={[0, 0, 0]} />;
  };
  
  

// Main component
const ThreeDViewer = () => {
console.log("Three 3d map");
  const glbModelUrl = "../models/Airport.glb";
  const fbxUrl = "../models/rp_sophia_animated_003_idling.fbx";
  const [targetPosition, setTargetPosition] = useState(null);
  const cameraRef = useRef();
  const [groundObjects, setGroundObjects] = useState([]);

  useEffect(() => {
    const loadGroundObjects = async () => {
      const gltfLoader = new GLTFLoader();
      const glb = await gltfLoader.loadAsync(glbModelUrl);
  
      // Filter out objects based on the name patterns
      const groundObjects = glb.scene.children.filter((object) => {
        if (
          object.name.includes('Cube') || 
          object.name.includes('spot') ||
          object.name.includes('Barrier_holder') ||
          object.name.includes('Cylinder') ||
          object.name.includes('Transporting-Cars') // Detecting the 'Transporting-Cars' object
        ) 
        return false;
      });
  
      setGroundObjects(groundObjects);
      console.log('Detected ground/obstacle objects:', groundObjects.map(obj => obj.name)); // Confirm detection
      

    };
  
    loadGroundObjects();
  }, []);
    

  // Unified click handling for both POIs and free movement
  const handlePOIClick = (poi) => {
    setTargetPosition(poi.position);
  };

  return (
    <Canvas
    camera={{ position: [0, 1.5, 5], fov: 75, near: 0.1, far: 1000 }}  // Adjust near and far clipping planes
    style={{ height: '80vh', width: '100%' }}    
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      <Model url={glbModelUrl} />
      <DrawPOIs onPOIClick={handlePOIClick} />
      <HandleMapClick setTargetPosition={setTargetPosition} />

      {/* Pass ground objects to the animated character */}
      <AnimatedCharacter url={fbxUrl} targetPosition={targetPosition} objectsToDetect={groundObjects} />

      <OrbitControls ref={cameraRef} />
    </Canvas>
  );
};

export default ThreeDViewer;
