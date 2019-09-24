import React from "react"
import Tab from "../components/Tab"
import renderer from "react-test-renderer"
// import App from "../App"



test("Tab snapshot test", () => {
  const component = renderer.create(
    <Tab/>
  )
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
