import React, { Component } from "react"
import PropTypes from "prop-types"
import { HostWithEvents, withBabylonJS } from "react-babylonjs"
import BABYLON, { Axis, IPhysicsEnabledObject, Vector3 } from "babylonjs"
import { CreatedInstance } from "react-babylonjs/dist/types/CreatedInstance";
import _ from "lodash";
import ObjectHook from "./ObjectHook";

const debug = require('debug')('game:support:attachPhysics')
let count = 0
class AttachPhysics extends Component<Partial<BABYLON.PhysicsImpostorParameters>> {
  scene?: BABYLON.Scene
  handler?: any
  componentWillUnmount() {
    this.scene!.onBeforeRenderObservable.remove(this.handler)
  }

  render() {

    const opts = _.defaults(this.props, {
      mass: 1,
    })
    return (
      <ObjectHook
        {...this.props}
        onParented={(scene, engine, obj) => {
          debug({
            ctx: this,
            scene,
            engine,
            obj
          })

          const inst = new BABYLON.PhysicsImpostor(obj.hostInstance, BABYLON.PhysicsImpostor.BoxImpostor, opts)



          window['phys'] = window['phys'] || []
          window['phys'][count++] = inst

          if (count < 2) return

          obj.hostInstance.physicsInstance = inst

          // inst.applyImpulse(Vector3.Up().scale(2), Vector3.One().scale(0.5))



        }}
      />
    )
  }
}

// Specifies the default values for props:

export default AttachPhysics
