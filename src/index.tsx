import Main from "./main"
import ReactDOM from "react-dom"
import React from "react"
import MobxDevtools from "mobx-react-devtools"
ReactDOM.render(
  <div>
    <Main />
    <MobxDevtools />
  </div>,
  document.getElementById("root"),
)
