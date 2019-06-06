import React, { Component } from "react"
import PropTypes from "prop-types"
import { HostWithEvents, withBabylonJS } from "react-babylonjs"
import BABYLON, { Axis, IPhysicsEnabledObject, Vector3 } from "babylonjs"
import { CreatedInstance } from "react-babylonjs/dist/types/CreatedInstance";
import _ from "lodash";

const debug = require('debug')('game:support:objectHook')
let count = 0
class ObjectHook extends Component<{ onParented?: (scene: BABYLON.Scene, engine: BABYLON.Engine, obj: CreatedInstance<IPhysicsEnabledObject & { physicsInstance: BABYLON.PhysicsImpostor }>) => void }> {
	render() {
		return (
			<HostWithEvents
				{...this.props}

			/>
		)
	}
}

// Specifies the default values for props:

export default ObjectHook
