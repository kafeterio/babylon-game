"use strict"

const semver = require("semver")
import fs from "fs"
import _ from "lodash"
import modules from "./modules"
import Debug from "debug"
import ModuleToCdn from "module-to-cdn"

const debug = Debug("cdn")
Debug.enable("cdn")

export default (name, version) => {
  let ret = ModuleToCdn(name, version)
  if (!ret) {
    ret = resolveModule(name, version)
  }
  return ret
}

const resolveModule = (moduleName, version, options?) => {
  options = options || {}
  const env = options.env || "development"

  if (typeof moduleName !== "string") {
    throw new TypeError("Expected 'moduleName' to be a string")
  }

  if (typeof version !== "string") {
    throw new TypeError("Expected 'version' to be a string")
  }

  let mod = modules[moduleName]

  if (!mod) {
    return null
  }

  const md = _.defaults(mod, {
    versions: {},
    url: "",
  })

  const name = moduleName
  let filename = md.filename
  debug({ filename })

  const range = Object.keys(md.versions).find(range =>
    semver.satisfies(version, range),
  )

  let config: { production: string; development: string }

  if (range) {
    config = md.versions[range]
  } else {
    config = {
      production: "/[filename]",
      development: "/[filename]",
      // production: "",
      // development: ""
    }
  }

  let url =
    md.url || (env === "development" ? config.development : config.production)

  if (!url.startsWith("http")) {
    url = `https://unpkg.com/[name]@[version]${url}`
  }

  if (url.includes("[filename]")) {
    if (!filename) {
      filename = getFilenameFromPkg(name)
      if (filename === "index.js") return null
    }
    url = url.replace("[filename]", filename)
  }
  url = url.replace("[version]", version)
  url = url.replace("[name]", name)
  return {
    name,
    var: md.var,
    url,
    version,
  }
}

const getFilenameFromPkg = (name: string) => {
  const url = `${name}/package.json`
  const pkg: string | undefined = require(url).main
  let ret = pkg || "index.js"
  // if (!ret || ret === "index.js" || ret === "index") {
  //   ret = fs.statSync(`./node_modules/${name}/${name}`).isFile
  //     ? `${name}.js`
  //     : undefined
  // }
  if (!ret.endsWith(".js")) ret = `${ret}.js`
  debug("file to get:", ret)
  return ret
}
