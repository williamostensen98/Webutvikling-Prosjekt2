import React from "react"
import Footer from "../components/Footer"
import renderer from "react-test-renderer"
// import App from "../App"



test("Footer snapshot test", () => {
  const component = renderer.create(
    <Footer/>
  )
  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
