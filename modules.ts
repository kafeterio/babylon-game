interface modules {
  [key: string]: {
    var: string
    versions?: {
      [key: string]: {
        development: string
        production: string
      }
    }
    filename?: string
    url?: string
  }
}

const modules: modules = {
  babylonjs: {
    var: "BABYLON",
  },
  "babylonjs-gui": {
    var: "undefined",
  },
  "react-babylonjs": {
    var: "reactBabylonjs",
  },
  peerjs: {
    var: "Peer",
  },
  // "sockjs-client": {
  //   var: "sok"
  // },
  // debug: {
  //   var: "deb"
  // },
  // "prop-types": {
  //   var: "proptyp"
  // }
  "html-entities": {
    var: "undefined",
  },
}

export default modules
