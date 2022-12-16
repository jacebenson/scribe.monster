// To access your database
// Append api/* to import from api and web/* to import from web
import fs from 'fs'
export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  // give a directory, date and table name
  // then read all files matching
  // date-table-number.jsonl
  // and combine them into a single file
  // date-table.jsonl
  // then upload the file to OpenAI
  // then delete the files
  // then return the fine tune id

  let directory = args._[1]
  let date = args._[2]
  let tableName = args._[3]
  // exit if any of the arguments are missing
  if (!directory || !date || !tableName) {
    console.log('Missing arguments DIRECTORY DATE TABLENAME')
    return
  }
  // get all files in the directory
  let files = fs.readdirSync(directory)
  // filter the files to only include the ones we want
  let filesFiltered = files.filter((file) => {
    return file.includes(`${date}-${tableName}`)
  })
  // read the files and combine them into a single string
  let fileContents = filesFiltered
    .map((file) => {
      return fs.readFileSync(`${directory}/${file}`, 'utf8') + '\n'
    })
    .join('')
  // write the file contents to a new file
  fs.writeFileSync(
    `${directory}/${date}-COMBINED-${tableName}.jsonl`,
    fileContents
  )
  // delete the old files
  filesFiltered.forEach((file) => {
    fs.unlinkSync(`${directory}/${file}`)
  })
}
