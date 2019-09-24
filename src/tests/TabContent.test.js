import React from "react"
import TabContent from "../components/TabContent"
import renderer from "react-test-renderer"
// import App from "../App"



test("TabContent snapshot test", () => {
  const component = renderer.create(
    <TabContent/>
  )
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
