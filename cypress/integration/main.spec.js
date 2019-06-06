/// <reference types="cypress" />
const { $ } = Cypress
let hasFail = false
top.windows = top.windows || []
// const hostParsed = /\?hostId=(.*)/.exec(window.top.location.href)
// const hostId = hostParsed && hostParsed[1]

const isChild = !!window.top.location.href.includes("?isChild")
const baseUrl = "localhost:4141"

/** @type {window} */
let win2
/** @type {Cypress.Chainable} */
let cy2

/** @type {Cypress.Cypress} */
let Cypress2

describe("main", () => {
  beforeEach(() => {
    cy.server({
      whitelist: xhr => xhr.url.includes("sockjs"),
    })
    cy.visit(baseUrl)
  })
  it.only("empty spec", () => {
    //
  })
  describe("peers", () => {})
  it("works", () => {
    cy.contains("initial")
    cy.window()
      .its("peer")
      .should("ok")
      .then(peer => {
        if (top.windows.length) {
          $("button.restart", top.windows[0].document).click()
          win2 = top.windows[0]
        } else {
          win2 = window.open(
            `${window.top.location.href.split("integration")[0] +
              "integration/worker-spec.js"}?isChild`,
          )
          window.top.focus()
          top.windows.push(win2)
        }
        cy.wrap({
          fn: () => {
            console.log(win2)
            if (win2.Cypress.ended) {
              return true
            }
          },
        })
          .invoke("fn")
          .should("ok")
        // cy.wait(500)
        // debugger
        cy.then(() => {
          cy2 = win2.cy
          Cypress2 = win2.Cypress
          const _log = Cypress2.log
          Cypress2.log = function() {
            const ret = _log.apply(this, arguments)
            arguments[0].name = "(2) " + arguments[0].name

            Cypress.log.apply(this, arguments)
            return ret
          }

          Cypress2.config("defaultCommandTimeout", 500)

          win2.console.log = console.log
          win2.console.warn = console.warn
          win2.console.error = console.error
          cy2.visit(`${baseUrl}/#/id/${peer.id}`)
          cy2.get("input:first").should("be.disabled")
          cy2.get("input:first").type("two{enter}")
        })
      })
    cy.get("input:first").type("one{enter}")
    cy.contains("one")
    cy.contains("two")
  })
  // if (isChild) {
  //   cy.visit(`localhost:4141/#/id/${hostId}`)
  // } else {
  //   cy.visit("localhost:4141")
  //   cy.window()
  //     .its("peer")
  //     .should("exist")
  //     .then(hostId => {
  //       const newWin = window.open(
  //         `${window.top.location.href}?hostId=${hostId}`,
  //       )
  //       windows.push(newWin)
  //     })
  // }
  // cy.get("input:first").type("foo!{enter}")
})

after(() => {
  // window.top.isDone = true
  // win2 && win2.close()
  // !hasFail && win2 && win2.close()
  // setTimeout(() => win2 && win2.close(), 2000)
})

// function openNewBackgroundTab(url){
//   var a = document.createElement("a");
//   a.href = url
//   var evt = document.createEvent("MouseEvents");
//   //the tenth parameter of initMouseEvent sets ctrl key
//   evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
//                               true, false, false, false, 0, null);
//   a.dispatchEvent(evt);
// }

Cypress.on("fail", err => {
  hasFail = true
  throw err
})
