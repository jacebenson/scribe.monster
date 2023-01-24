/* eslint-disable no-console */

import fs from 'fs'

import { PrismaClient } from '@prisma/client'
import cuid from 'cuid'

import group from /*         */ './seedFiles/backup-2023-01-23/group.json'
//import groupMember from /*   */ './seedFiles/backup-2023-01-23/groupMember.json'
//import groupRole from /*     */ './seedFiles/backup-2023-01-23/groupRole.json'
import message from /*       */ './seedFiles/backup-2023-01-23/message.json'
import modelInstance from /* */ './seedFiles/backup-2023-01-23/modelInstance.json'
import prompt from /*         */ './seedFiles/backup-2023-01-23/prompt.json' // not needed
import property from /*      */ './seedFiles/backup-2023-01-23/property.json'
import scribeRequest from /*   */ './seedFiles/backup-2023-01-23/scribeRequest.json' // not needed
import user from /*          */ './seedFiles/backup-2023-01-23/user.json'
// import preference from   /**/ './seedFiles/preference.json'// not needed

//import users from './seedFiles/UserBackup.json'
//import { users, bulkUsers } from './seedFiles/userSeed'

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
  prompt,
  scribeRequest,
}
const db = new PrismaClient()
let now = (value) => new Date(value)
async function main() {
  // loop through the seed object and console.log the name of the seed object
  // and the number of records in the seed object

  // for users, groups we're going to upsert individual records
  // for everything esle, we're going ot bulk insert after modifing the JSON in memory

  await db.prompt.deleteMany({})
  await db.scribeRequest.deleteMany({})
  // users + groups
  await db.user.deleteMany({})
  await db.group.deleteMany({})
  for (const [key, value] of Object.entries(firstSeed)) {
    let newData = []
    for (let record of value) {
      record.createdAt = now(record.createdAt)
      record.updatedAt = now(record.updatedAt)
      if (key === 'user') {
        record.resetTokenExpiresAt = null
        if (record.verifiedAt !== null) {
          record.verifiedAt = now(record.verifiedAt)
        } else {
          record.verifiedAt = null
        }
      }
      delete record.id
      record.cuid = cuid()
      //console.log(`upserting ${key} record: ${record.cuid}`)
      newData.push(record)
    }
    await db[key].createMany({
      data: newData,
      skipDuplicates: true,
    })
  }

  await db.message.deleteMany({})
  await db.modelInstance.deleteMany({})
  await db.property.deleteMany({})

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
