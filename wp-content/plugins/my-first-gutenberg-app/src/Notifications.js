import { SnackbarList } from "@wordpress/components"
import { store as noticesStore } from "@wordpress/notices"
import { useDispatch } from "@wordpress/data"
import { useSelect } from "@wordpress/data"

function Notifications() {
  const notices = useSelect((select) => select(noticesStore).getNotices(), [])
  const { removeNotice } = useDispatch(noticesStore)
  const snackbarNotices = notices.filter(({ type }) => type === "snackbar")

  return (
    <SnackbarList
      notices={snackbarNotices}
      className="components-editor-notices__snackbar"
      onRemove={removeNotice}
    />
  )
}

export default Notifications
