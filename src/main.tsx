import WithHooks from "./components/withhooks"

import React from "react"
// import  from "react-dom"
import Peer from "peerjs"
import Debug from "debug"
const debug = Debug("main")
import "mobx"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import _ from "lodash"

Debug.enable("main")

class AppState {
  @observable id = localStorage.getItem("peerId") || ""
  @observable moves: string[] = ["initial..."]
  @observable peer: Peer = this.createPeer()
  @observable hostConnection?: Peer.DataConnection
  @observable peerConnections: Peer.DataConnection[] = []
  parsedHash = /id\/(.*)/.exec(window.location.hash)
  // debug("parsedHash", parsedHash)
  hostId = this.parsedHash && this.parsedHash[1]
  @observable isHost: boolean = !!this.hostId

  constructor() {
    // setInterval(() => this.id++)
  }

  createPeer() {
    debug("existing id:", this.id)
    if (this.id) {
      debug("used existing id")

      const peer = new Peer(this.id)
      // peer.reconnect()
      return peer
    }
    debug("created new id peer")
    return new Peer()
  }

  openPeer = () => {
    debug("open:peer")

    debug("hostId", this.hostId)
    const id = this.peer.id
    debug("setting peer id:", id)
    localStorage.setItem("peerId", id)

    this.id = id
    _.extend(window, { peer: this })

    if (this.hostId) {
      debug("host id:", this.hostId)
      this.connectToHost(this.hostId)
    } else {
      this.peer.on("connection", conn => {
        this.peerConnections.push(conn)
        conn.on("open", () => {
          conn.send([JSON.stringify(this.moves), true])
        })
        conn.on("data", (data: string) => this.sendMessage(data))
      })
    }
  }

  getUrl() {
    return
  }

  connectToHost(id: string) {
    debug("connectToHost")
    this.isHost = false
    this.hostConnection = this.peer.connect(id, {
      reliable: true,
    })
    debug(this.hostConnection)
    debug(this.peer)
    this.hostConnection.on("error", console.log)
    this.hostConnection.on("data", console.log)
    this.hostConnection.on("open", () => {
      debug("host connected!")
      this.hostConnection!.on("data", ([text, initial]) => {
        debug([text, initial])
        if (initial) {
          this.moves = JSON.parse(text)
          return
        }

        debug("received data", text)
        this.moves = this.moves.concat([text])
      })
    })
  }

  sendMessage(text: string) {
    if (!this.hostConnection) {
      this.moves = this.moves.concat([text])
      window.localStorage.setItem("moves", JSON.stringify(this.moves))
      this.peerConnections.forEach(conn => conn.send([text]))
      debug("connections:", this.peer.connections)
    } else {
      debug("sent to host:", this.hostConnection)
      this.hostConnection.send(text)
    }
  }
}

@observer
class Main extends React.Component<{ appState: AppState }> {
  componentDidMount() {
    // if (this.peer.id) {
    //   return this.openPeer()
    // }
    this.props.appState.peer.on("open", this.props.appState.openPeer)
    if (!this.props.appState.hostConnection) {
      this.setState({
        moves: JSON.parse(window.localStorage.getItem("moves") || "[]"),
      })
    }
  }

  render() {
    return (
      <div>
        <input
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
          disabled={
            !!this.props.appState.hostId &&
            !(
              this.props.appState.hostConnection &&
              this.props.appState.hostConnection.open
            )
          }
          onKeyDown={e => {
            if (e.key === "Enter") {
              if (e.target.value.trim()) {
                const text = e.target.value
                e.target.value = ""
                this.props.appState.sendMessage(text)
              }
            }
          }}
        />
        <div
          style={{ position: "absolute", float: "right", color: "whitesmoke" }}
        >
          {this.props.appState.isHost || true
            ? `http://98.242.65.45:4141/#/id/${this.props.appState.id}`
            : ""}

          <pre>{this.props.appState.moves.join("\n")}</pre>
        </div>
        <WithHooks />
      </div>
    )
  }
}

const appState = new AppState()

export default () => <Main appState={appState} />
