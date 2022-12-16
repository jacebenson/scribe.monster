// To access your database
// Append api/* to import from api and web/* to import from web
//openai api fine_tunes.create -t "scripts/openaiScripts/2022-12-16-sys_script.jsonl" -m ada
import fs from 'fs'

//import { db } from 'api/src/lib/db'
import fetch from 'node-fetch'

import fields from './openaiScripts/fields'
import prompts from './openaiScripts/prompts'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  // use the first argument as the table name
  // then make a request to the ServiceNow API
  // then create a file with the data

  let tableName = args._[1]
  let limit = args._[2] || 100
  let offset = args._[3] || 0
  let endpoint = `https://${process.env.SERVICENOW_INSTANCE}.service-now.com/api/now/table/${tableName}?sysparm_limit=${limit}&sysparm_query=active=true^orderBy=sys_id&sysparm_offset=${offset}`
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' +
      Buffer.from(
        `${process.env.SERVICENOW_USERNAME}:${process.env.SERVICENOW_PASSWORD}`
      ).toString('base64'),
  }

  let tableData = await fetch(endpoint, {
    headers,
  })
  // log out the offset from the Headers Link value
  let tableDataJson = await tableData.json()
  // filter the data to only include the fields we want
  let tableFields = fields(tableName)
  let tableDataFiltered = tableDataJson.result.map((row) => {
    let newRow = {}

    tableFields.forEach((field) => {
      // if the field has 2 or 4 spaces, replace them with a tab
      if (row[field] && row[field].includes('  ')) {
        row[field] = row[field].replace(/ {2}/g, '\t')
      }
      newRow[field] = row[field]
    })
    return newRow
  })
  // verify the newRow is valid JSON
  let validData = tableDataFiltered.map((row) => {
    try {
      let validJSON = JSON.parse(JSON.stringify(row))
      return validJSON
    } catch (e) {
      console.log('invalid json', row)
    }
  })
  // for each record in the result, create a jsonLine with a prompt and completion
  let jsonlPrompts = validData.map((row) => {
    // get the prompt from the prompts function
    let prompt = prompts({ table: tableName, data: row })

    return {
      // calculate the prompt from the prompts function
      prompt: JSON.stringify(prompt),
      completion: ` ${JSON.stringify(row, null, '\t')}\`\`\``,
    }
  })
  // convert the prompts to a jsonl file
  let jsonl = jsonlPrompts.map((prompt) => JSON.stringify(prompt)).join('\n') // join with a newline
  // write the file to the filesystem in the openaiScripts folder with a date
  let date = new Date().toISOString().split('T')[0]
  let file = `./scripts/openaiScripts/${date}-${tableName}-${offset}.jsonl`
  fs.writeFileSync(file, jsonl)
  // console log next step;
  // openai tools fine_tunes.prepare_data -f ./scripts/openaiScripts/2022-12-16-sys_script-0.jsonl
  console.log({
    1: `openai tools fine_tunes.prepare_data -f ${file}`,
    2: `openai api fine_tunes.create -t ${file} -m ada`,
  })
}
