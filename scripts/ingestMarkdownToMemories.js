// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'
import { getVector } from 'api/src/lib/openAIHelper'

const fs = require('fs')

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  // load each file in the directory /seedFiles/servicenow-legal-2023-02-03
  // for each file, create a new memory
  // title = file name
  // content = file contents
  // vector = getVector(file contents)
  let dir = 'scripts/seedFiles/servicenow-legal-2023-02-03'
  let files = fs.readdirSync(dir)
  for (let i = 0; i < files.length; i++) {
    console.log({ step: 'reading file', file: files[i] })
    // get the file title
    let title = files[i]
    // get the file content
    let content = fs.readFileSync(dir + '/' + files[i], 'utf8')
    // get the vector
    console.log({ step: 'getting vector', file: files[i] })
    let vector = await getVector(content)
    // create the memory
    console.log({ step: 'creating memory', file: files[i] })
    await db.memory.create({
      data: {
        title: title,
        content: content,
        vector: JSON.stringify(vector.embedding),
      },
    })
  }
}
