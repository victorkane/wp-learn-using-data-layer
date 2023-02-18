import { Button, TextControl } from "@wordpress/components"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import { useDispatch } from "@wordpress/data"

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

export default EditPageForm
