import { Fragment } from 'react'

import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import EditMemoryCell from 'src/components/Memory/EditMemoryCell'
import MemoryChunks from 'src/components/MemoryChunk/MemoryChunks'

const EditMemoryPage = ({ cuid }) => {
  return (
    <Fragment>
      <EditMemoryCell cuid={cuid} />
      <Tabs>
        <TabPanels>
          <TabPanel>
            <MemoryChunks initialQuery={`{"memoryCuid": "${cuid}"}`} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Fragment>
  )
}

export default EditMemoryPage
