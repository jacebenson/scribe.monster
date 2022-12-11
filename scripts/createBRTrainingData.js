// To access your database
// Append api/* to import from api and web/* to import from web

var fs = require('fs')
export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  if (!args._[1]) {
    console.log('No input file given')
    return
  }
  // going to break out br's by when + action(s)
  // before + insert/update
  // name
  // action_insert
  // action_update
  // action_query
  // when
  // "collection"
  // filter_condition
  // condition
  // "script"
  // order
  //var prompt = `
  //name:
  //insert:
  //update:
  //query:
  //when:
  //table:
  //filter:
  //condition:
  //order:
  //script:
  //`

  var importFile = args._[1]
  var exportFile = args._[1] + 'l'
  var exportFile2 = (args._[1] = '-fiverr.json')
  var queryRules = 25
  var insertRules = 25
  var updateRules = 25
  var insertANDupdateRules = 25
  let data = fs.readFileSync(`${importFile}`, 'utf8')
  let records = JSON.parse(data).records
  records = records.map(function (record) {
    if (record.action_insert || record.action_update || record.action_query) {
      return {
        prompt: '',
        completion: {
          name: record.name,
          insert: record.action_insert == 'true',
          update: record.action_update == 'true',
          query: record.action_query == 'true',
          when: record.when,
          table: record.collection,
          filter: record.filter_condition,
          condition: record.condition,
          order: record.order,
          script: record.script,
        },
      }
    }
  })
  var mainRecordList = []
  records.forEach(function (record) {
    if (queryRules < 0) return false
    console.log({ queryRules })
    if (
      record.completion.query &&
      !record.completion.insert &&
      !record.completion.update
    ) {
      queryRules--
      mainRecordList.push(record)
    }
  })
  records.forEach(function (record) {
    if (insertRules < 0) return false
    if (
      !record.completion.query &&
      record.completion.insert &&
      !record.completion.update
    ) {
      insertRules--
      mainRecordList.push(record)
    }
  })
  records.forEach(function (record) {
    if (updateRules < 0) return false

    if (
      !record.completion.query &&
      !record.completion.insert &&
      record.completion.update
    ) {
      updateRules--
      mainRecordList.push(record)
    }
  })
  records.forEach(function (record) {
    if (insertANDupdateRules < 0) return false
    if (
      !record.completion.query &&
      record.completion.insert &&
      record.completion.update
    ) {
      insertANDupdateRules--
      mainRecordList.push(record)
    }
  })
  //console.log({ insertORupdateRecords: insertORupdateRecords.length })
  console.log({ mainRecordListCount: mainRecordList.length })
  let output = ''
  mainRecordList.forEach((record) => {
    var sPrompt = JSON.stringify(record.prompt)
    var sRecord = JSON.stringify(JSON.stringify(record.completion))
    output += `{ "prompt": ${sPrompt}, "completion": ${sRecord} }\n`
  })
  fs.writeFileSync(`./${exportFile}`, output)
  fs.writeFileSync(
    `./${exportFile2}`,
    JSON.stringify(mainRecordList, null, ' ')
  )
}
