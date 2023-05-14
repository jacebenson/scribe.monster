// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const dotenv = require('dotenv')
dotenv.config()

let debug = false
let debugLogs = []
let debugLog = (message) => {
  debugLogs.push(message)
  if (debug) {
    console.log(message)
  }
}
let now = (value) => new Date(value)

let generateDateXDaysAgo = (days) => {
  let date = new Date()
  date.setDate(date.getDate() - days)
  let year = date.getFullYear()
  // month and day should be padded with a 0 if it's less than 10
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let dateString = `${year}-${month}-${day}`
  return dateString
}

let getSeedFilesDir = () => {

  let seedFilesDir = null

  for (let i = 0; i < 10; i++) {
    let dateString = generateDateXDaysAgo(i)
    // check if directory exists
    let dir = `./scripts/seedFiles/backup-${dateString}/`
    //console.log('checking for seed files in', dir)
    if (i === 10 && !fs.existsSync(dir)) {
      console.log('no seed files found')
      process.exit(1)
    }
    if (fs.existsSync(dir)) {
      console.log('found seed files in', dir)
      seedFilesDir = `./seedFiles/backup-${dateString}/`
      break
    }
  }
  return seedFilesDir
}

let makeUserAdmin = async ({ username }) => {
  try {
    if (!username) {
      console.log('enviroment variable ADMIN_USERNAME not set')
      return
    }

    let user = await db.user.findUnique({ where: { username } })
    if (!user) {
      console.log(`Cannot find user with username "${username}" when creating local admin`)
      return
    }
    let group = await db.group.findUnique({ where: { name: 'Administrators' } })
    if (!group) {
      console.log('Cannot find Administrator\'s group when creating local admin')
      return
    }
    let groupMember = { userCuid: user.cuid, groupCuid: group.cuid }
    await db.groupMember.deleteMany({}) // delete all records
    await db.groupMember.create({ data: groupMember })
    let groupRole = { groupCuid: group.cuid, role: 'admin' }
    await db.groupRole.deleteMany({}) // delete all records
    await db.groupRole.create({ data: groupRole })
    console.log(`Made "${username}" admin`)
    return
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

let seedHandler = async ({ seedObject }) => {


  //for (const [key, value] of Object.entries(firstSeed)) {
  for (const [key, value] of Object.entries(seedObject)) {
    try {
      debugLog(`${key} - ${value.length} records`)
      await db?.[key]?.deleteMany({}) // delete all records
      debugLog(`${key} - deleted ${value.length} records`)
      let newData = []
      for (let record of value) {
        record.createdAt = now(record.createdAt)
        record.updatedAt = now(record.updatedAt)
        //console.log(`upserting ${key} record: ${record.cuid}`)
        newData.push(record)
      }
      debugLog(`${key} - bulk inserting ${newData.length} records`)
      let fristSeedResult = await db[key].createMany({
        data: newData,
        skipDuplicates: true,
      })
      debugLog(`${key} - inserted ${fristSeedResult.count} records`)
      if (debugLogs) {
        let message = ''
        debugLogs.forEach((log) => {
          message += `${log}\n`
        })
        debugLogs = []
        if (!debug) console.log(message)

      }
    } catch (error) {
      console.log({ function: 'firstSeedCreateMany', error })
      throw new Error(error)
    }
  }



}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)
  console.log({ "args._": args._[1] })
  debug = args._[1] === 'debug'
  if (debug) {
    console.log(':: Debug mode enabled ::')
  }


  let seedFilesDir = getSeedFilesDir()
  if (!seedFilesDir) {
    console.log('no seed files found')
    process.exit(1)
  }
  if (seedFilesDir) {
    console.log('using seed files from', seedFilesDir)
    // lets make a list of the seed objects we want to seed where the key is the table name
    const firstSeed = {
      group: require(`${seedFilesDir}Group.json`),
      user: require(`${seedFilesDir}User.json`),

    }
    const secondSeed = {

      modelInstance: require(`${seedFilesDir}ModelInstance.json`),
      activity: require(`${seedFilesDir}Activity.json`),
      property: require(`${seedFilesDir}Property.json`),
      memory: require(`${seedFilesDir}Memory.json`),
      thread: require(`${seedFilesDir}Thread.json`),
      question: require(`${seedFilesDir}Question.json`),


    }

    //console.log('firstSeed', firstSeed)
    const db = new PrismaClient()
    // delete complicated tables first
    await db.activity.deleteMany({})
    await db.question.deleteMany({})

    // loop through the seed object and console.log the name of the seed object
    // and the number of records in the seed object

    // for users, groups we're going to upsert individual records
    // for everything esle, we're going ot bulk insert after modifing the JSON in memory



    await seedHandler({ seedObject: firstSeed })

    await seedHandler({ seedObject: secondSeed })
    // everything else
    // now look up the admin group, and the user jacebenson
    // then create a groupMember record for jacebenson in the admin group
    await makeUserAdmin({ username: process.env.ADMIN_USERNAME })
  }
}
