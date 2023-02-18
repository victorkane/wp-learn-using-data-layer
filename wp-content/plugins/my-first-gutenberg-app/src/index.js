import { SearchControl, Spinner, Button } from "@wordpress/components"
import { useState, render } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { decodeEntities } from "@wordpress/html-entities"

const PageEditButton = () => <Button variant="primary">Edit</Button>

function MyFirstApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const { pages, hasResolved } = useSelect(
    (select) => {
      const query = {}
      if (searchTerm) {
        query.search = searchTerm
      }
      const selectorArgs = ["postType", "page", query]
      return {
        pages: select(coreDataStore).getEntityRecords(...selectorArgs),
        hasResolved: select(coreDataStore).hasFinishedResolution(
          "getEntityRecords",
          selectorArgs
        ),
      }
    },
    [searchTerm]
  )
  return (
    <div>
      <SearchControl onChange={setSearchTerm} value={searchTerm} />
      <PagesTable hasResolved={hasResolved} pages={pages} />
    </div>
  )
}

function PagesTable({ hasResolved, pages }) {
  if (!hasResolved) {
    return <Spinner />
  }
  if (!pages?.length) {
    return <div>No results</div>
  }
  return (
    <table className="wp-list-table widefat fixed striped table-view-list">
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {pages?.map((page) => (
          <tr key={page.id}>
            <td>{decodeEntities(page.title.rendered)}</td>
            <td>
              {" "}
              <PageEditButton pageId={page.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
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
