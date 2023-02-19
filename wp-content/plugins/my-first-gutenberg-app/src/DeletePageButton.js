import { Button } from "@wordpress/components"
import { store as coreDataStore } from "@wordpress/core-data"
import { useDispatch } from "@wordpress/data"

const DeletePageButton = ({ pageId }) => {
  const { deleteEntityRecord } = useDispatch(coreDataStore)
  const handleDelete = () => deleteEntityRecord("postType", "page", pageId)
  return (
    <Button variant="primary" onClick={handleDelete}>
      Delete
    </Button>
  )
}

export default DeletePageButton
