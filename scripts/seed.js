/* eslint-disable no-console */

//import fs from 'fs'

import { PrismaClient } from '@prisma/client'
import cuid from 'cuid'

import group from /*         */ './seedFiles/backup-2023-02-03/group.json'
import memory from /*        */ './seedFiles/backup-2023-02-03/memory.json' // not needed
import message from /*       */ './seedFiles/backup-2023-02-03/message.json'
import modelInstance from /* */ './seedFiles/backup-2023-02-03/modelInstance.json'
import property from /*      */ './seedFiles/backup-2023-02-03/property.json'
import user from /*          */ './seedFiles/backup-2023-02-03/user.json'

const dotenv = require('dotenv')
dotenv.config()
// lets make a list of the seed objects we want to seed where the key is the table name
const firstSeed = {
  group,
  //groupRole,
  user,
  //groupMember,
}
const secondSeed = {
  message,
  modelInstance,
  property,
  memory,
}
const db = new PrismaClient()
let now = (value) => new Date(value)
async function main() {
  // loop through the seed object and console.log the name of the seed object
  // and the number of records in the seed object

  // for users, groups we're going to upsert individual records
  // for everything esle, we're going ot bulk insert after modifing the JSON in memory

  await db.message.deleteMany({})
  await db.modelInstance.deleteMany({})
  await db.property.deleteMany({})
  await db.user.deleteMany({})
  await db.group.deleteMany({})
  let firstNames = [
    'Al,',
    'Bob',
    'Charlie',
    'Dave',
    'Evan',
    'Frank',
    'George',
    'Harry',
    'Ivan',
    'John',
    'Kevin',
    'Larry',
    'Mike',
    'Nate',
    'Oscar',
    'Paul',
    'Quinn',
    'Ralph',
    'Steve',
    'Tom',
    'Ulysses',
    'Victor',
    'Walter',
    'Xavier',
    'Yancy',
    'Zachary',
  ]
  let lastNames = [
    'Adams',
    'Baker',
    'Carter',
    'Davis',
    'Evans',
    'Franklin',
    'Gibson',
    'Harris',
    'Ingram',
    'Johnson',
    'King',
    'Lambert',
    'Miller',
    'Nelson',
    'Owens',
    'Patterson',
    'Quinn',
    'Roberts',
    'Smith',
    'Taylor',
    'Underwood',
    'Vance',
    'Washington',
    'Xavier',
    'Young',
    'Zimmerman',
  ]

  // users + groups
  for (const [key, value] of Object.entries(firstSeed)) {
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
    where: { username: 'jacebenson' },
  })
  let groupMember = {
    userCuid: jace.cuid,
    groupCuid: adminGroup.cuid,
  }
  await db.groupMember.create({ data: groupMember })
  // create the grouprole for admin
  let groupRole = {
    groupCuid: adminGroup.cuid,
    role: 'admin',
  }
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
