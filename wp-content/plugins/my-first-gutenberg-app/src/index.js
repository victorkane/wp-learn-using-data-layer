import {
  SearchControl,
  Spinner,
  Button,
  Modal,
  TextControl,
} from "@wordpress/components"
import { useState, render } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { useDispatch } from "@wordpress/data"
import { decodeEntities } from "@wordpress/html-entities"

function PageEditButton({ pageId }) {
  const [isOpen, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  return (
    <>
      <Button onClick={openModal} variant="primary">
        Edit
      </Button>
      {isOpen && (
        <Modal onRequestClose={closeModal} title="Edit page">
          <EditPageForm
            pageId={pageId}
            onCancel={closeModal}
            onSaveFinished={closeModal}
          />
        </Modal>
      )}
    </>
  )
}

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

export function EditPageForm({ pageId, onCancel, onSaveFinished }) {
  const page = useSelect(
    (select) =>
      select(coreDataStore).getEditedEntityRecord("postType", "page", pageId),
    [pageId]
  )
  // console.log("pageIdit", page)
  const { editEntityRecord } = useDispatch(coreDataStore)
  const handleChange = (title) =>
    editEntityRecord("postType", "page", pageId, { title })
  const { saveEditedEntityRecord } = useDispatch(coreDataStore)
  const handleSave = async () => {
    await saveEditedEntityRecord("postType", "page", pageId)
    onSaveFinished()
  }
  return (
    <div className="my-gutenberg-form">
      <TextControl
        label="Page title:"
        value={page.title}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <Button onClick={handleSave} variant="primary">
          Save
        </Button>
        <Button onClick={onCancel} variant="tertiary">
          Cancel
        </Button>
      </div>
    </div>
  )
}

window.addEventListener(
  "load",
  function () {
    render(<MyFirstApp />, document.querySelector("#my-first-gutenberg-app"))
  },
  false
)
