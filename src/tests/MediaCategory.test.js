import React from "react"
import MediaCategory from "../components/MediaCategory"
import renderer from "react-test-renderer"
// import App from "../App"



test("MediaCategory snapshot test", () => {
  const component = renderer.create(
    <MediaCategory />
  )
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
