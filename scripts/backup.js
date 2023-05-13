// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'
// this will download each table of data and save them to a file in ./seedFiles with a name of yyyy-mm-dd.json
// you can then use this file to seed your database

export default async ({ args }) => {
  // Your script here...
  const fs = require('fs')
  const path = require('path')
  let generateDateString = () => {
    let date = new Date()
    let year = date.getFullYear()
    // month and day should be padded with a 0 if it's less than 10
    let month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let dateString = `${year}-${month}-${day}`
    return dateString
  }

  console.log(':: Executing script with args ::')
  console.log(args)
  // first thing we need to do is get a list of all the tables in the database
  const tables = await db.$queryRaw`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';`
  console.log('tables', tables)
  // now we need to get the data from each table
  const data = await Promise.all(
    tables.map(async (table) => {
      try {
        console.log('table', table)
        const tableName = table.table_name
        // first letter of table name is always lowercase
        const firstLetter = tableName[0]
        const restOfName = tableName.slice(1)
        const tableNameCamelCase = firstLetter.toLowerCase() + restOfName
        try {
          // write this table to ./seedFiles/backup-<date>/tableName.json
          // data is sometimes undefined
          // we nned to wait for the data to be loaded before we write the file
          const data = await db[tableNameCamelCase]?.findMany({})

          fs.writeFileSync(
            path.join(
              process.cwd(),
              `./scripts/seedFiles/backup-${generateDateString()}/${tableName}.json`
            ),
            JSON.stringify(data, null, 2)
          )
        } catch (error) {
          console.log('error', error)
        }
        //return { tableName, data }
      } catch (error) {
        console.log('error', error)
      }
    })
  )
  console.log('data', data)
  // create a file for the data

  // get the current date
  const date = new Date()
  const year = date.getFullYear()
  // month and day should be padded with a 0 if it's less than 10
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const dateString = `${year}-${month}-${day}`
  // create a directory for the seed files
  const seedFilesDir = path.join(
    process.cwd(),
    `./scripts/seedFiles/backup-${dateString}/`
  )
  console.log('writing to', seedFilesDir)
  if (!fs.existsSync(seedFilesDir)) {
    fs.mkdirSync(seedFilesDir)
  }
  // create a file for the data
  //const seedFile = path.join(seedFilesDir, `${dateString}.json`)
  // loop over the data and write each table to a file
  data.forEach((table) => {
    const seedFile = path.join(seedFilesDir, `${table.tableName}.json`)
    fs.writeFileSync(seedFile, JSON.stringify(table.data, null, 2))
  })
  //fs.writeFileSync(seedFile, JSON.stringify(data, null, 2))
  console.log(':: Done ::')
}
