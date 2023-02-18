import { render } from "@wordpress/element"
import MyFirstApp from "./MyFirstApp"

window.addEventListener(
  "load",
  function () {
    render(<MyFirstApp />, document.querySelector("#my-first-gutenberg-app"))
  },
  false
)
