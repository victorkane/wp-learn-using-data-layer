import { useState, render } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { decodeEntities } from "@wordpress/html-entities"
import { SearchControl } from "@wordpress/components"

function MyFirstApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const pages = useSelect(
    (select) => {
      const query = {}
      if (searchTerm) {
        query.search = searchTerm
      }
      return select(coreDataStore).getEntityRecords("postType", "page", query)
    },
    [searchTerm]
  )
  return (
    <div>
      <SearchControl onChange={setSearchTerm} value={searchTerm} />
      <PagesTable pages={pages} />
    </div>
  )
}

function PagesTable({ pages }) {
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
