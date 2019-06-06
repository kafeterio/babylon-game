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
  Ground,
  Plane,
  FreeCamera,
  HostWithEvents,
  FiberTransformNodePropsHandler,
} from "react-babylonjs"
import BABYLON, {
  Vector3,
  Mesh,
  Axis,
  Color3,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  Camera,
} from "babylonjs"
import React, { useState } from "react"
import SingleAxisRotateMeshBehavior from "../support/SingleAxisRotateMeshBehavior"
import { SceneEventArgs } from "react-babylonjs/dist/types/Scene"
import { observable } from "mobx"
import _ from "lodash"
import { observer } from "mobx-react"
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

// const box = new BABYLON.Mesh.CreateBox("box", 2, scene)
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

class State {
  @observable coords = {
    top: 5,
    bottom: -5,
    left: -10,
    right: 10,
  }
}

@observer
class WithHooks extends React.Component<{ state: State }> {
  onSceneMount = ({ scene }) => {
    // scene.onNewCameraAddedObservable.addOnce((c: Camera) => {
    //   console.log(c)
    //   console.log(this.refs.plane)
    // })
    setTimeout(this.attachToCamera, 500)
  }

  attachToCamera = () => {
    const c = this.refs.acamera
    const p = this.refs.plane
    const ib = this.refs.innerbox
    // p.hostInstance.parent = c.hostInstance
    console.log(p, c, ib)
  }
  render() {
    const state = this.props.state
    return (
      <div>
        {/* <input
        type="range"
        onChange={e => (pipeline.depthOfField.focusDistance = +e.target.value)}
        min={0}
        max={8000}
        style={{ position: "absolute" }}
      /> */}
        {/* {_.keys(state.coords).map((coordname, i) => (
          <div
            style={{
              position: "absolute",
              top: 30 + i * 30 + "px",
              color: "white",
            }}
          >
            <input
              type="range"
              onChange={e => (state.coords[coordname] = +e.target.value)}
              value={state.coords[coordname]}
              min={-10}
              max={+10}
              step={1}
            />
            <label>
              {coordname}: {state.coords[coordname]}
            </label>
          </div>
        ))} */}
        <Engine
          canvasId="sample-canvas"
          babylonJSContext={{
            canvas: null,
            engine: null,
          }}
          antialias={true}
        >
          <Scene sceneOptions={{}} onSceneMount={this.onSceneMount}>
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
            {/* <ArcRotateCamera
              ref="acamera"
              name="foo"
              target={Vector3.Zero()}
              position={new Vector3(0, 0, -10)}
              radius={10}
              alpha={-Math.PI / 2}
              beta={Math.PI / 2}
              minZ={0.001}
              wheelPrecision={50}
            >
          </ArcRotateCamera> */}
            <Plane
              ref="plane"
              width={20}
              depth={20}
              position={new Vector3(0, 0, 10)}
              createForParentMesh={true}
            />

            <Box name="box" size={15} position={new Vector3(0, 0, 0)}>
              <StandardMaterial
                diffuseColor={Color3.Blue()}
                specularPower={1}
              />
              <SingleAxisRotateMeshBehavior rpm={50} axis={Axis.Y} />
              <Box
                ref="innerbox"
                size={0.5}
                position={Vector3.FromArray([0, 0.5, 0]).scale(4.5)}
              >
                <ArcRotateCamera
                  metadata={{ isMesh: true }}
                  mode={0}
                  // fov={30}
                  orthoBottom={state.coords.bottom}
                  orthoLeft={state.coords.left}
                  orthoRight={state.coords.right}
                  orthoTop={state.coords.top}
                  ref="acamera"
                  name="foo"
                  target={Vector3.Zero()}
                  position={new Vector3(0, 0, 0)}
                  radius={100}
                  alpha={-Math.PI / 2}
                  beta={Math.PI / 2}
                  minZ={0.001}
                  wheelPrecision={50}
                >
                  <HostWithEvents
                    onParented={(...args) => {
                      setTimeout(
                        () =>
                          (args[2].hostInstance.parent =
                            args[2].parent.hostInstance),
                        500,
                      )
                      console.log("pandc:", args)
                    }}
                  />
                </ArcRotateCamera>
                {/* <SingleAxisRotateMeshBehavior rpm={-2} axis={Axis.Y} /> */}
              </Box>
            </Box>
          </Scene>
        </Engine>
      </div>
    )
  }
}

const state = new State()

export default () => <WithHooks state={state} />
