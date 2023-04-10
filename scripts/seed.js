/* eslint-disable no-console */

import fs from 'fs'

import { PrismaClient } from '@prisma/client'
import cuid from 'cuid'
const dotenv = require('dotenv')
dotenv.config()

// get today's date and work backwards until you find a seed file
let seedFilesDir = null
let generateDateXDaysAgo = (days) => {
  let date = new Date()
  date.setDate(date.getDate() - days)
  let year = date.getFullYear()
  // month and day should be padded with a 0 if it's less than 10
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let dateString = `${year}-${month}-${day}`
  return dateString
}
for (let i = 0; i < 10; i++) {
  let dateString = generateDateXDaysAgo(i)
  // check if directory exists
  let dir = `./scripts/seedFiles/backup-${dateString}/`
  console.log('checking for seed files in', dir)
  if (fs.existsSync(dir)) {
    console.log('found seed files in', dir)
    seedFilesDir = `./seedFiles/backup-${dateString}/`
    break
  }
}

if (!seedFilesDir) {
  console.log('no seed files found')
  process.exit(1)
}
if (seedFilesDir) {
  console.log('using seed files from', seedFilesDir)

  //import activity from /*      */ './seedFiles/backup-2023-02-07/activity.json'
  //import group from /*         */ './seedFiles/backup-2023-02-07/group.json'
  //import memory from /*        */ './seedFiles/backup-2023-02-07/memory.json' // not needed
  //import modelInstance from /* */ './seedFiles/backup-2023-02-07/modelInstance.json'
  //import property from /*      */ './seedFiles/backup-2023-02-07/property.json'
  //import question from /*      */ './seedFiles/backup-2023-02-07/question.json'
  //import thread from /*        */ './seedFiles/backup-2023-02-07/thread.json'
  //import user from /*          */ './seedFiles/backup-2023-02-07/user.json'

  // lets make a list of the seed objects we want to seed where the key is the table name
  const firstSeed = {
    group: require(`${seedFilesDir}Group.json`),
    user: require(`${seedFilesDir}User.json`),
  }
  const secondSeed = {
    modelInstance: require(`${seedFilesDir}ModelInstance.json`),
    property: require(`${seedFilesDir}Property.json`),
    memory: require(`${seedFilesDir}Memory.json`),
    thread: require(`${seedFilesDir}Thread.json`),
    question: require(`${seedFilesDir}Question.json`),
    activity: require(`${seedFilesDir}Activity.json`),
  }
  //console.log('firstSeed', firstSeed)
  const db = new PrismaClient()
  let now = (value) => new Date(value)
  async function main() {
    // loop through the seed object and console.log the name of the seed object
    // and the number of records in the seed object

    // for users, groups we're going to upsert individual records
    // for everything esle, we're going ot bulk insert after modifing the JSON in memory



    // users + groups
    console.log('in main')
    for (const [key, value] of Object.entries(firstSeed)) {
      db[key].deleteMany({}) // delete all records
      let newData = []
      for (let record of value) {
        record.createdAt = now(record.createdAt)
        record.updatedAt = now(record.updatedAt)
        if (key === 'user') {
          // if name is null, generate a name
          if (!record.name) {
            //let name = `${
            //  firstNames[Math.floor(Math.random() * firstNames.length)]
            //} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
            //let username =
            //  name.replace(' ', '').toLowerCase() +
            //  Math.floor(Math.random() * 1000)
            //record.name = name
            //record.username = username
            //record.email = `${username}@example.com`
          }
          //record.resetToken = null
          //record.resetTokenExpiresAt = null
          delete record.resetToken
          delete record.resetTokenExpiresAt
          record.loginToken = record.hashedPassword
          delete record.hashedPassword
          if (record.verifiedAt !== null) {
            record.verifiedAt = now(record.verifiedAt)
          } else {
            record.verifiedAt = null
          }
        }
        if (record.id) {
          delete record.id
          record.cuid = cuid()
        }
        //console.log(`upserting ${key} record: ${record.cuid}`)
        newData.push(record)
      }
      console.log(`bulk inserting ${key} records: ${newData.length}`)
      let fristSeedResult = await db[key].createMany({
        data: newData,
        skipDuplicates: true,
      })
      console.log(fristSeedResult)
    }
    // everything else
    for (const [key, value] of Object.entries(secondSeed)) {
      db[key].deleteMany({}) // delete all records
      let newData = []
      // load up users into memory
      let users = await db.user.findMany({
        select: { cuid: true, username: true },
      })
      for (let record of value) {
        if (!record?.cuid) {
          record.cuid = cuid()
        }
        record.createdAt = now(record.createdAt)
        record.updatedAt = now(record.updatedAt)
        if (key === 'prompt' || key === 'scribeRequest') {
          // we now have users in memory
          // look up the user's cuid
          //console.log({ users })
          users.filter((user) => {
            if (user.username === record['userId.username']) {
              record.userCuid = user.cuid
            }
          })
          delete record['userId.username']
        }
        delete record.id
        // push the record into the new array
        newData.push(record)
      }
      // bulk insert the new array
      console.log(`bulk inserting ${key} records: ${newData.length}`)
      await db[key].createMany({
        data: newData,
        skipDuplicates: true,
      })
    }
    // now look up the admin group, and the user jacebenson
    // then create a groupMember record for jacebenson in the admin group
    const adminGroup = await db.group.findUnique({
      where: { name: 'Administrators' },
    })
    const jace = await db.user.findUnique({
      where: { username: 'jace@benson.run' },
    })

    let groupMember = {
      userCuid: jace.cuid,
      groupCuid: adminGroup.cuid,
    }
    await db.groupMember.deleteMany({}) // delete all records
    await db.groupMember.create({ data: groupMember })
    // create the grouprole for admin
    let groupRole = {
      groupCuid: adminGroup.cuid,
      role: 'admin',
    }
    await db.groupRole.deleteMany({}) // delete all records
    await db.groupRole.create({ data: groupRole })
    return
  }
  main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
}