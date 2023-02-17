import { render } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { decodeEntities } from "@wordpress/html-entities"

function MyFirstApp() {
  const pages = useSelect(
    (select) =>
      select(coreDataStore).getEntityRecords("postType", "page", {
        per_page: 20,
      }),
    []
  )
  return (
    <>
      <PagesTable pages={pages} />
      <PagesList pages={pages} />
    </>
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
