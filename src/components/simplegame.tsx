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
	FiberBox,
} from "react-babylonjs"
import BABYLON, {
	Vector3,
	Mesh,
	Axis,
	Color3,
	DefaultRenderingPipeline,
	DepthOfFieldEffectBlurLevel,
	Camera,
	IPhysicsEnabledObject,
} from "babylonjs"
import React from "react"
import SingleAxisRotateMeshBehavior from "../support/SingleAxisRotateMeshBehavior"
import _ from "lodash"
import { observer } from "mobx-react"
import { GameState, getGameState } from "../models/player";

import Debug from 'debug'
import { CreatedInstance } from "react-babylonjs/dist/types/CreatedInstance";
import AttachPhysics from "../support/AttachPhysics";
import ObjectHook from "../support/ObjectHook";
const debug = Debug('game:component')
Debug.enable('game:*')

@observer
class WithHooks extends React.Component<{ state: typeof GameState.Type }> {

	physObjs: CreatedInstance<IPhysicsEnabledObject>[] = []
	scene?: BABYLON.Scene

	render() {
		const state = this.props.state
		console.log(state)
		return (
			<div>
				<Engine
					canvasId="sample-canvas"
					babylonJSContext={{
						canvas: null,
						engine: null,
					}}
					antialias={true}
				>
					<Scene sceneOptions={{}} onSceneMount={(e) => {
						const { scene } = e
						this.scene = scene
						// const gravityVector = new BABYLON.Vector3(0, -9.81, 0)
						// const physicsPlugin = new BABYLON.OimoJSPlugin()
						scene.actionManager = new BABYLON.ActionManager(scene)

						scene.enablePhysics(new Vector3(0, -9.81, 0), new BABYLON.OimoJSPlugin())

						// setTimeout(() => new BABYLON.PhysicsImpostor(this.foo[0], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 1 }), 500)

					}}


					>
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
						<FreeCamera
							name="foocam"
							// target={Vector3.Zero()}
							setTarget={[Vector3.Down()]}
							position={new Vector3(0, 5, -10)}
							ref={(c) => {
								window.cam = c
							}}

						>
						</FreeCamera>
						<Ground
							name="ground1"
							width={10}
							height={10}
							subdivisions={2}
						// depth={100}
						// rotation={Vector3.Right().scale(Math.PI / 2)}

						// position={new Vector3(0, -10, 0)}
						// createForParentMesh={true}
						>

							<AttachPhysics mass={0} friction={0.9} />
						</Ground>
						{/* <Box name="box" size={15} position={new Vector3(0, 0, 0)}>
							<StandardMaterial
								diffuseColor={Color3.Blue()}
								specularPower={1}
							/>
							<SingleAxisRotateMeshBehavior rpm={5} axis={Axis.Y} />
						</Box> */}
						{<Box
							position={Vector3.Up().scale(4)}


						>
							<StandardMaterial diffuseColor={Color3.Teal()} />
							<AttachPhysics mass={5} restitution={1} friction={0.5} />
							<ObjectHook

								onParented={(scene, engine, obj: CreatedInstance<IPhysicsEnabledObject & { physicsInstance: BABYLON.PhysicsImpostor }>) => {
									const inst = obj.hostInstance.physicsInstance
									scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
										if (evt.sourceEvent.key == "w") {
											inst.applyImpulse(Vector3.Forward(), Vector3.One().scale(0));
										}
										if (evt.sourceEvent.key == "s") {
											inst.applyImpulse(Vector3.Backward(), Vector3.One().scale(0));
										}
										if (evt.sourceEvent.key == "a") {
											inst.applyImpulse(Vector3.Left(), Vector3.One().scale(0));
										}
										if (evt.sourceEvent.key == "d") {
											inst.applyImpulse(Vector3.Right(), Vector3.One().scale(0));
										}
									}))
								}}
							/>
						</Box>}
						{state.players.map((player, i) => {
							return <Box
								key={i}
								name={player.id} position={new Vector3(player.positionX, player.positionY + 3, 0)}

							>

								<AttachPhysics />
							</Box>
						})}
					</Scene>
				</Engine>
			</div >
		)
	}
}

const state = getGameState()

export default () => <WithHooks state={state} />
