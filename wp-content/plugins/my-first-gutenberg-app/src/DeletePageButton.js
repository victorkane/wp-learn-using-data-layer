import { Button, Spinner } from "@wordpress/components"
import { store as coreDataStore } from "@wordpress/core-data"
import { useDispatch } from "@wordpress/data"
import { useSelect } from "@wordpress/data"

const DeletePageButton = ({ pageId }) => {
  const { deleteEntityRecord } = useDispatch(coreDataStore)
  const handleDelete = () => deleteEntityRecord("postType", "page", pageId)
  const { isDeleting } = useSelect(
    (select) => ({
      isDeleting: select(coreDataStore).isDeletingEntityRecord(
        "postType",
        "page",
        pageId
      ),
    }),
    [pageId]
  )
  return (
    <Button variant="primary" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? (
        <>
          <Spinner />
          Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  )
}

export default DeletePageButton
