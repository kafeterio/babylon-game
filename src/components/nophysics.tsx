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
	GUI2DControlLifecycleListener,
	DeviceOrientationCamera,
	FollowCamera,
	ShadowGenerator,
	ShadowLight,
	DirectionalLight,
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
	Vector2,
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
import { GUI3DManager } from "babylonjs-gui";
const debug = Debug('game:component')
Debug.enable('game:*')

class DebugComponent extends ObjectHook {
	
}
const debugFromWin = (obj: {}) => {
	_.extend(window, obj)
}
const debugObj = (obj: {}) => {
	_.each(obj, (val, key) => {
		debug(key, val)
	})
}

@observer
class WithHooks extends React.Component<{ state: typeof GameState.Type }> {
	sticks: { [key in 'left' | 'right']?: BABYLON.GUI.Image } = {}
	camera?: BABYLON.FollowCamera
	object?: BABYLON.IPhysicsEnabledObject

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
						const gravityVector = new BABYLON.Vector3(0, -9.81, 0)
						const physicsPlugin = new BABYLON.OimoJSPlugin()
						scene.enablePhysics(gravityVector, physicsPlugin)
						scene.actionManager = new BABYLON.ActionManager(scene)

						const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

						const createBtn = (left = false) => {
							const stick = new BABYLON.GUI.Image("but", require('../../media/stick.svg'));
							stick.width = "140px"
							stick.height = "140px"
							// stick.scaleX = 0.1
							// stick.scaleY = 0.3
							// stick.cornerRadius = 1000
							// requestAnimationFrame(() => stick.height = (stick.widthInPixels / window.screen.width * 2 * 100) + "%")
							// stick.height = stick.widthInPixels + "px"
							// stick.color = "white";
							const dir = left ? -1 : 1
							const leftOffset = -40 * dir
							const topOffset = 20
							stick.horizontalAlignment = !left ? BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT : BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
							stick.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
							// stick.left = `${leftOffset * 3}vw`
							// stick.top = `${topOffset * 3}vh`
							if (left) {
								stick.paddingRight = '30px'
							} else {
								stick.paddingLeft = '30px'
							}
							stick.paddingBottom = '30px'

							// stick.inpi
							// stick.background = "green";
							// advancedTexture.addControl(stick);

							advancedTexture.addControl(stick)
							// debugFromWin({ stick })
							return stick
						}
						this.sticks.left = createBtn(false)
						this.sticks.right = createBtn(true)

						scene.onBeforeRenderObservable.add(() => {
							if (this.ShouldMove) {


							}
						})

						// new BABYLON.VirtualJoystick()

						// setTimeout(() => new BABYLON.PhysicsImpostor(this.foo[0], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 1 }), 500)

					}
					}


					>
						<HemisphericLight
							name="hemi-light"
							intensity={0.3}
							direction={Vector3.Down().add(Vector3.Left().scale(0.3))}
						/>
						<DirectionalLight
							name="foo-ligt"
							diffuse={Color3.White()}
							direction={Vector3.Down().add(Vector3.Left().scale(0.4))}
							position={new Vector3(40, 10, 0)}
							intensity={0.7}
							shadowEnabled={true}

						>
							<ShadowGenerator
								mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32}
								shadowCasters={['player1', 'foo']}
							/>
							{/* <ObjectHook
								onParented={(scene, engine, obj: CreatedInstance<BABYLON.IDirectionalLight>) => {
									const shadowGenerator = new BABYLON.ShadowGenerator(1024, obj.hostInstance);

									scene.onNewMeshAddedObservable.add((mesh) => {
										shadowGenerator.getShadowMap()!.renderList!.push(mesh)
									})
								}}
							/> */}
						</DirectionalLight>
						<FollowCamera
							noRotationConstraint={true}
							cameraDirection={Vector3.Forward()}
							name="foocam"
							upperRadiusLimit={0}
							lowerRadiusLimit={0}

							// target={Vector3.Zero()}
							// setTarget={[Vector3.Down()]}
							position={new Vector3(0, 10, 10)}
						// angularSensibility={30000}

						>
							<ObjectHook
								onParented={(a1, a2, a3: CreatedInstance<BABYLON.FollowCamera>) => {
									debugFromWin({ a3 })
									this.camera = a3.hostInstance
									// a3.hostInstance.inputs.clear()
									// a3.hostInstance.inputs.addDeviceOrientation()
								}}
							/>

						</FollowCamera>
						<Ground
							name="ground1"
							width={100}
							height={100}
							subdivisions={2}
							receiveShadows={true}
						// depth={100}
						// rotation={Vector3.Right().scale(Math.PI / 2)}

						// position={new Vector3(0, -10, 0)}
						// createForParentMesh={true}
						>

							<StandardMaterial
								diffuseColor={Color3.Blue()}
								specularPower={1}
							/>
							<AttachPhysics mass={0} friction={1} />
						</Ground>
						{/* <Box name="box" size={15} position={new Vector3(0, 0, 0)}>
							<SingleAxisRotateMeshBehavior rpm={5} axis={Axis.Y} />
						</Box> */}
						<ShadowGenerator blurKernel={10} bias={1} useKernelBlur={true} usePercentageCloserFiltering={true}>
							{<Box
								name="player1"
								position={Vector3.Up().scale(4)}
								metadata={{ shadowGenerator: true }}
							>
								<StandardMaterial diffuseColor={Color3.Teal()} />
								<AttachPhysics />
								<ObjectHook

									onParented={(scene, engine, obj) => {
										const inst = obj.hostInstance
										let pointers: { stick: 'right' | 'left', event: PointerEvent }[] = []
										scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
											if (evt.sourceEvent.key == "w") {
												inst.translate(BABYLON.Axis.Z, 0.1, BABYLON.Space.LOCAL);
											}
											if (evt.sourceEvent.key == "s") {
												inst.translate(BABYLON.Axis.Z, -0.1, BABYLON.Space.LOCAL);
											}
											if (evt.sourceEvent.key == "a") {
												inst.translate(BABYLON.Axis.X, -0.1, BABYLON.Space.LOCAL);
											}
											if (evt.sourceEvent.key == "d") {
												inst.translate(BABYLON.Axis.X, 0.1, BABYLON.Space.LOCAL);
											}
										}))
										scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnEveryFrameTrigger, (evt) => {
											// debug('everyFrame', evt)
											// debugObj(evt)
											const leftStickEvt = _.find(pointers, { stick: 'left' })
											const rightStickEvt = _.find(pointers, { stick: 'right' })


											function moveStick(event: PointerEvent, stick: BABYLON.GUI.Image) {
												const dx = event.clientX - stick.centerX
												const dy = event.clientY - stick.centerY
												const vec = new Vector2(dx, dy)
												const atan2 = Math.atan2(vec.y, vec.x) + Math.PI / 2
												stick.rotation = atan2
											}
											if (leftStickEvt) {
												debug('left')
												moveStick(leftStickEvt.event, this.sticks.left!)
											}

											if (rightStickEvt) {
												debug('right')
												moveStick(rightStickEvt.event, this.sticks.right!)
											}

											if (leftStickEvt) {
												const rot = this.sticks.left!.rotation
												const applyVector = Vector3.TransformNormal(new Vector3(Math.sin(rot), 0, Math.cos(rot)), this.camera!.getWorldMatrix()).normalize().scale(0.3)
												debugObj({ applyVector })
												obj.hostInstance.physicsInstance.applyImpulse(applyVector, obj.hostInstance.getAbsolutePosition())
											}
										}))


										scene.onPointerObservable.add((evt) => {
											debug('pointerUp')
											delete pointers[(evt.event as PointerEvent).pointerId]
											debugObj(evt)
										}
											, BABYLON.PointerEventTypes.POINTERUP)
										scene.onPointerObservable.add((evt) => {
											debug('pointerDown')
											const hWidth = window.document.body.clientWidth / 2
											const clientX = evt.event.clientX - hWidth
											const stick = clientX < 0 ? 'left' : 'right'
											pointers[(evt.event as PointerEvent).pointerId] = { stick, event: evt.event as PointerEvent }
											debugObj(evt)
										}
											, BABYLON.PointerEventTypes.POINTERDOWN)
										scene.onPointerObservable.add((evt) => {
											debug('pointerMove')
											pointers[(evt.event as PointerEvent).pointerId].event = evt.event as PointerEvent
											debugObj(evt)
										}
											, BABYLON.PointerEventTypes.POINTERMOVE)
										// scene.onPointerObservable.add((evt) => {
										// 	// debug({ evt })

										// 	const hWidth = window.document.body.clientWidth / 2
										// 	const hHeight = window.document.body.clientHeight / 2
										// 	const clientX = evt.event.clientX - hWidth
										// 	const clientY = evt.event.clientY - hHeight
										// 	// const clientX = evt.event.clientX - hWidth
										// 	// const clientY = evt.event.clientY - hHeight
										// 	// debugObj({ clientX, clientY })
										// 	// debug({ hWidth, clientX })

										// 	function moveStick(stick: BABYLON.GUI.Image) {
										// 		// const dx = clientX - stick.leftInPixels
										// 		// const dy = stick.topInPixels - clientY
										// 		debugObj({ stick })
										// 		const dx = evt.event.clientX - stick.centerX
										// 		const dy = evt.event.clientY - stick.centerY
										// 		// debugObj({ dx, dy })
										// 		const vec = new Vector2(dx, dy)
										// 		const atan2 = Math.atan2(vec.y, vec.x) + Math.PI / 2
										// 		stick.rotation = atan2
										// 	}
										// 	if (clientX < 0) {
										// 		debug('left')
										// 		moveStick(this.sticks.left!)
										// 	} else {
										// 		moveStick(this.sticks.right!)
										// 	}

										// 	if (clientX < 0 && evt.event.buttons) {
										// 		this.shouldMove = true
										// 		const rot = this.sticks.left!.rotation + Math.PI / 2
										// 		// obj.hostInstance.physicsInstance.applyImpulse(new Vector3(Math.cos(rot), 0, Math.sin(rot)).scale(0.03), Vector3.Zero())
										// 		obj.hostInstance.physicsInstance.applyImpulse(new Vector3(Math.cos(rot), 0, Math.sin(rot)).scale(0.3), obj.hostInstance.getAbsolutePosition())
										// 	}
										// }, BABYLON.PointerEventTypes.POINTERMOVE)


										this.object = obj.hostInstance
										this.camera!.lockedTarget = obj.hostInstance


									}}
								/>
							</Box>}
							{state.players.map((player, i) => {
								return <Box
									key={i}
									name={"foo"} position={new Vector3(player.positionX, player.positionY + 3, 0)}>
									<AttachPhysics />
								</Box>
							})}
						</ShadowGenerator>

					</Scene>
				</Engine>
			</div >
		)
	}
}

const state = getGameState()

export default () => <WithHooks state={state} />
