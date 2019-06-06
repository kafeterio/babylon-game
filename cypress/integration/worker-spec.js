it("is worker spec", () => {})
Cypress.mocha.getRunner().on("end", () => {
  console.log("end")
  Cypress.ended = true
})
