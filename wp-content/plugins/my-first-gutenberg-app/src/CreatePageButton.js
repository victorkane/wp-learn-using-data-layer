import { Button, Modal } from "@wordpress/components"
import { useState } from "@wordpress/element"
import CreatePageForm from "./CreatePageForm"

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

export default CreatePageButton
