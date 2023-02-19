import { SearchControl } from "@wordpress/components"
import { useState } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import PagesTable from "./PagesTable"
import CreatePageButton from "./CreatePageButton"
import Notifications from "./Notifications"

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
      <div>
        <SearchControl onChange={setSearchTerm} value={searchTerm} />
        <CreatePageButton />
      </div>
      <PagesTable hasResolved={hasResolved} pages={pages} />
      <Notifications />
    </div>
  )
}

export default MyFirstApp
