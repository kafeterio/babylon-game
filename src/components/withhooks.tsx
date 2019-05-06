import {
  Engine,
  Scene,
  Skybox,
  HemisphericLight,
  ArcRotateCamera,
  Box,
  StandardMaterial,
  Light,
  FiberSceneProps,
  Model,
} from "react-babylonjs"
import BABYLON, {
  Vector3,
  Mesh,
  Axis,
  Color3,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
} from "babylonjs"
import React, { useState } from "react"
import SingleAxisRotateMeshBehavior from "../support/SingleAxisRotateMeshBehavior"
import { SceneEventArgs } from "react-babylonjs/dist/types/Scene"

// import toad from "../../media/toad_new.glb"

let pipeline: DefaultRenderingPipeline

let globalIndex = 0 // due to closure and how observables are assigned.
const SkyboxScenes = [
  {
    name: "sunny dqqdsfdsfay",
    texture: `${process.env.PUBLIC_URL}/textures/TropicalSunnyDay`,
  },
  {
    name: "specular HDR",
    texture: `${process.env.PUBLIC_URL}/textures/SpecularHDR.dds`,
  },
]

// const box = new BABYLON.Mesh.CreateBox("box",2,scene);
// box.rotation.x = -0.2;
// box.rotation.y = -0.42
// box.material = new BABYLON.StandardMaterial("material",scene);
// box.material.emmisiveColor = new BABYLON.Color3(0, 0.58, 0.86);

const onSceneMount: (e: SceneEventArgs) => void = e => {
  // const { scene } = e
  // scene.onNewCameraAddedObservable.addOnce(c => {
  //   pipeline = new DefaultRenderingPipeline("default", true, scene, [c])
  //   pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Medium
  //   pipeline.depthOfFieldEnabled = true
  //   pipeline.depthOfField.focalLength = 180
  //   pipeline.depthOfField.fStop = 0.5
  //   pipeline.depthOfField.focusDistance = 1800
  //   const moveFocusDistance = true
  // })
}

function WithHooks() {
  const [stateIndex, stateFn] = useState(0)
  const [colorLerp, setColorLerp] = useState(0)
  return (
    <div>
      {/* <input
        type="range"
        onChange={e => (pipeline.depthOfField.focusDistance = +e.target.value)}
        min={0}
        max={8000}
        style={{ position: "absolute" }}
      /> */}
      <Engine
        canvasId="sample-canvas"
        babylonJSContext={{
          canvas: null,
          engine: null,
        }}
        antialias={true}
      >
        <Scene sceneOptions={{}} onSceneMount={onSceneMount}>
          <HemisphericLight
            name="hemi-light"
            intensity={0.3}
            direction={Vector3.Down()}
          />
          <HemisphericLight
            name="foo-ligt"
            diffuse={Color3.White()}
            direction={Vector3.Up()}
            intensity={0.7}
          />
          {/* <Skybox rootUrl={SkyboxScenes[0].texture} /> */}
          <ArcRotateCamera
            target={Vector3.Zero()}
            radius={10}
            alpha={-Math.PI / 2}
            beta={Math.PI / 2}
            minZ={0.001}
            wheelPrecision={50}
          >
            <Box size={0.5} />
          </ArcRotateCamera>
          <Box name="box" size={4} position={new Vector3(0, 0, 0)}>
            <StandardMaterial diffuseColor={Color3.Blue()} specularPower={1} />
            <SingleAxisRotateMeshBehavior rpm={0} axis={Axis.Y} />
            {/* <Box
              size={0.5}
              position={Vector3.FromArray([0, 0.5, 0]).scale(4.5)}
            >
              <SingleAxisRotateMeshBehavior rpm={-2} axis={Axis.Y} />
            </Box> */}
          </Box>
        </Scene>
      </Engine>
    </div>
  )
}

export default WithHooks
