import { Button, Spinner } from "@wordpress/components"
import { store as coreDataStore } from "@wordpress/core-data"
import { store as noticesStore } from "@wordpress/notices"
import { useDispatch } from "@wordpress/data"
import { useSelect } from "@wordpress/data"

const DeletePageButton = ({ pageId }) => {
  // fire error as test!
  pageId = pageId * 1000

  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore)

  const { deleteEntityRecord } = useDispatch(coreDataStore)

  // useSelect returns a list of selectors if you pass the store handle
  // instead of a callback:
  const { getLastEntityDeleteError } = useSelect(coreDataStore)

  const handleDelete = async () => {
    const success = await deleteEntityRecord("postType", "page", pageId)
    if (success) {
      // Tell the user the delete succeeded
      createSuccessNotice("The page was deleted!", {
        type: "snackbar",
      })
    } else {
      const lastError = getLastEntityDeleteError("postType", "page", pageId)
      // Tell the user how exactly the delete has failed
      const message =
        (lastError?.message || "There was an error.") +
        " Please refresh the page and try again."
      // Tell the user how exactly the operation has failed:
      createErrorNotice(message, {
        type: "snackbar",
      })
    }
  }

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
