// To access your database

import { db } from '$api/src/lib/db'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args._[1])
  //await db.scribeRequest.deleteMany({})
  await db.activity.deleteMany({})
  await db.user.deleteMany()
  await db.group.deleteMany({})
  await db.groupMember.deleteMany({})
  await db.groupRole.deleteMany({})
  await db.property.deleteMany({})
  await db.message.deleteMany({})
  await db.preference.deleteMany({})
  await db.modelInstance.deleteMany({})
}
