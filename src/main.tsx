// import WithHooks from "./components/withhooks"
// import SimpleGame from "./components/simplegame"
// import SimpleGame from "./components/simplegame"

import React from "react"
// import  from "react-dom"
import Peer from "peerjs"
import clsx from "clsx"
import Debug from "./support/util"
import "mobx"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import _ from "lodash"
import { initPlayer } from "./models/player"
import Nophysics from "./components/nophysics"
import TextField from "@material-ui/core/TextField"
import { Scrollbars } from "react-custom-scrollbars"

const { debug, debugObj } = new Debug("game:main")
Debug.enable("game:*")

class AppState {
  @observable id = localStorage.getItem("peerId") || ""
  @observable moves: string[] = Array(50)
    .fill("")
    .map((x, i) => `initial:${i}`)
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
  @observable inputVal = ""
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

    setInterval(
      _.before(6, () => {
        initPlayer(Math.random().toString(), "foo", {
          x: Math.random() * 4,
          y: Math.random() * 4,
        })
      }),
      100,
    )
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          {/* <button onClick={() => {
            document.documentElement.requestFullscreen()
          }} >

            fullscreen
        </button> */}

          <div style={{ backgroundColor: "white" }}>
            <TextField
              variant="outlined"
              style={{
                backgroundColor: "white",
                margin: "10px",
              }}
              margin="dense"
              // floatingLabel={true}
              label={"chat"}
              placeholder="type to chat"
              // className={''}
              // style={{ color: 'whitesmoke' }}

              value={this.inputVal}
              disabled={
                !!this.props.appState.hostId &&
                !(
                  this.props.appState.hostConnection &&
                  this.props.appState.hostConnection.open
                )
              }
              onChange={e => {
                this.inputVal = e.target.value
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (e.target.value.trim()) {
                    const text = e.target.value
                    this.inputVal = ""
                    this.props.appState.sendMessage(text)
                  }
                }
              }}
            />
          </div>
        </div>

        <div style={{ position: "fixed", float: "right", height: "100%" }}>
          <div
            style={{
              // position: 'absolute',
              display: "flex",
              // flexDirection: "column-reverse",
              color: "whitesmoke",
              paddingLeft: "10px",
              height: "100%",
              width: "200px",
              listStyle: "none",
            }}
          >
            <Scrollbars
              style={{ color: "white" }}
              renderThumbVertical={props => (
                <div
                  {...props}
                  style={{ backgroundColor: "white", borderRadius: "3px" }}
                  className="thumbVertical"
                />
              )}
              ref={obj => (this.scroll = obj)}
              onUpdate={update => {
                this.scroll.scrollToBottom()
                debugObj({ update })
                return update
              }}
            >
              >
              {this.props.appState.moves.map(text => (
                <li>{text}</li>
              ))}
            </Scrollbars>
            {/* 
            {this.props.appState.isHost || true
              ? `http://98.242.65.45:4141/#/id/${this.props.appState.id}`
              : ""} */}
          </div>
        </div>
        {/* <WithHooks /> */}
        {/* <Nophysics /> */}
      </div>
    )
  }
}

const appState = new AppState()

export default () => <Main appState={appState} />
