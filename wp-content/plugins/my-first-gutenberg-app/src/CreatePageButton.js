import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { Button, Modal } from "@wordpress/components"
import { useState } from "@wordpress/element"
import { useDispatch } from "@wordpress/data"
import PageForm from "./PageForm"

function CreatePageButton() {
  const [isOpen, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  return (
    <>
      <Button onClick={openModal} variant="primary">
        Create a new Page
      </Button>
      {isOpen && (
        <Modal onRequestClose={closeModal} title="Create a new page">
          <CreatePageForm onCancel={closeModal} onSaveFinished={closeModal} />
        </Modal>
      )}
    </>
  )
}

function CreatePageForm({ onCancel, onSaveFinished }) {
  const [title, setTitle] = useState()
  const { lastError, isSaving } = useSelect(
    (select) => ({
      lastError: select(coreDataStore).getLastEntitySaveError(
        "postType",
        "page"
      ),
      isSaving: select(coreDataStore).isSavingEntityRecord("postType", "page"),
    }),
    []
  )

  const { saveEntityRecord } = useDispatch(coreDataStore)
  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("postType", "page", {
      title,
      status: "publish",
    })
    if (savedRecord) {
      onSaveFinished()
    }
  }
  return (
    <PageForm
      title={title}
      onChangeTitle={setTitle}
      hasEdits={!!title}
      lastError={lastError}
      isSaving={isSaving}
      onCancel={onCancel}
      onSave={handleSave}
    />
  )
}

export default CreatePageButton
