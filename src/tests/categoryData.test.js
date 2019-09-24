import React from "react"
import categoryData from "../categoryData"
import renderer from "react-test-renderer"



test("categoryData snapshot test", () => {
  const component = renderer.create(
    <categoryData />
  )
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
