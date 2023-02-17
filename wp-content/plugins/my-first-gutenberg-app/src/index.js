import { render } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { decodeEntities } from "@wordpress/html-entities"

function MyFirstApp() {
  const pages = useSelect(
    (select) => select(coreDataStore).getEntityRecords("postType", "page"),
    []
  )
  return <PagesList pages={pages} />
}

function PagesList({ pages }) {
  return (
    <ul>
      {pages?.map((page) => (
        <li key={page.id}>{decodeEntities(page.title.rendered)}</li>
      ))}
    </ul>
  )
}

window.addEventListener(
  "load",
  function () {
    render(<MyFirstApp />, document.querySelector("#my-first-gutenberg-app"))
  },
  false
)
