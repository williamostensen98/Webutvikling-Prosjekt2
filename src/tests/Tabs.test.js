import React from "react"
import Tabs from "../components/Tabs"
import renderer from "react-test-renderer"
// import App from "../App"



test("Tabs snapshot test", () => {
  const component = renderer.create(
    <Tabs/>
  )
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
