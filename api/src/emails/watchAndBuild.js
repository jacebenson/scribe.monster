import { watch } from 'fs'

export const watchAndLog = (() => {
  console.log('cwd', process.cwd())
  watch('./api/src/emails/', (eventType, filename) => {
    if (filename.includes('.mjml.js')) {
      // could be either 'rename' or 'change'. new file event and delete
      // also generally emit 'rename'
      console.log({ function: './src/emails/watchAndBuild.js'.filename })
    }
  })
})()

export default watchAndLog
