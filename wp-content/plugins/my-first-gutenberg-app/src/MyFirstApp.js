import { SearchControl } from "@wordpress/components"
import { useState } from "@wordpress/element"
import { useSelect } from "@wordpress/data"
import { store as coreDataStore } from "@wordpress/core-data"
import PagesTable from "./PagesTable"

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

export default MyFirstApp
