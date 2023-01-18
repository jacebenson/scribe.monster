/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client'

import { groups } from './seedFiles/groupSeed'
import { messages } from './seedFiles/messageSeed'
import modelInstances from './seedFiles/ModelInstance.json'
import { properties } from './seedFiles/propertySeed'
//import users from './seedFiles/User.json'
import users from './seedFiles/UserBackup.json'
//import { users, bulkUsers } from './seedFiles/userSeed'

const dotenv = require('dotenv')
dotenv.config()
//const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()
async function main() {
  // if there is an admin group, don't seed it
  const existingAdminGroup = await db.group.findUnique({
    where: { name: 'Admin' },
  })
  if (existingAdminGroup) {
    console.log(`Admin group already exists in the database, skipping seeding`)
  }
  if (!existingAdminGroup) {
    await db.groupRole.deleteMany({})
    for (let group of groups) {
      await db.group.upsert({
        where: { id: group.id },
        update: group,
        create: group,
      })
    }
  }
  //users.map((user) => user?.email)
  //await db.user.deleteMany(/*{ where: { email: { in: userEmails } } }*/)
  //await db.user.createMany({ data: bulkUsers })
  //for (let user of bulkUsers) {
  //  await db.user.create({
  //    data: user,
  //  })
  //}

  // if there are users in the database, don't seed them
  let existingUsers = await db.user.count()
  existingUsers = 0
  if (existingUsers > 0) {
    console.log(
      `${existingUsers} Users already exist in the database, skipping seeding`
    )
  }
  if (existingUsers === 0) {
    console.log({ users })
    for (let user of users) {
      let userData = {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        resetTokenExpiresAt: (() => {
          if (user.resetTokenExpiresAt) {
            return new Date(user.resetTokenExpiresAt)
          }
          return null
        })(),
      }
      await db.user.upsert({
        where: { id: user.id },
        update: userData,
        create: userData,
      })
    }
  }
  await db.message.deleteMany({})
  for (let message of messages) {
    await db.message.create({
      data: message,
    })
  }
  await db.property.deleteMany({})
  for (let property of properties) {
    await db.property.create({
      data: property,
    })
  }
  await db.modelInstance.deleteMany({})
  for (let model of modelInstances) {
    let modelInstanceData = {
      ...model,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    }
    await db.modelInstance.upsert({
      where: { id: model.id },
      update: modelInstanceData,
      create: modelInstanceData,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
