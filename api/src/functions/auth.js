import { DbAuthHandler } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { createUser, updateUser } from 'src/services/users/users'
export const handler = async (event, context) => {
  const forgotPasswordOptions = {
    handler: async (user) => {
      try {
        let updatedUser = await updateUser({
          id: user.id,
          input: {
            resetToken: user.resetToken,
          },
        })
        console.log({ function: 'auth.js', updatedUser })
        if (user.email === '') throw 'No email on file'
        //if (user.verified === null) throw 'Email not verified'
      } catch (error) {
        console.log({ function: 'auth.js', error })
        throw error
      }
      return user
    },
    expires: 60 * 60 * 24 * 7,
    errors: {
      usernameNotFound: 'Username not found',
      usernameRequired: 'Username is required',
    },
  }
  const loginOptions = {
    handler: (user) => {
      return user
    },

    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: 'Incorrect username or password.',
      incorrectPassword: 'Incorrect username or password.',
    },

    // How long a user will remain logged in, in seconds
    // expires: 60 * 60 * 24 * 365 * 10, // 10 years
    expires: 60 * 60 * 8, // 8 hour
  }
  const resetPasswordOptions = {
    handler: (/*user*/) => {
      return true
    },
    allowReusedPassword: true,
    errors: {
      resetTokenExpired: 'resetToken is expired',
      resetTokenInvalid: 'resetToken is invalid',
      resetTokenRequired: 'resetToken is required',
      reusedPassword: 'Must choose a new password',
    },
  }
  const signupOptions = {
    handler: async ({ username, hashedPassword, salt, userAttributes }) => {
      //let user = await db.user.create({
      //  data: {
      //    email: username,
      //    hashedPassword: hashedPassword,
      //    salt: salt,
      //    name: userAttributes.name,
      //  },
      //})
      return await createUser({
        input: {
          username: username,
          hashedPassword: hashedPassword,
          salt: salt,
          name: userAttributes.name,
          email: userAttributes.email,
          // skipPassword: true,
        },
      })
      //return modifiedUser.record
    },

    errors: {
      fieldMissing: '${field} is required',
      usernameTaken: '`${username}` already in use',
    },
  }

  const authHandler = new DbAuthHandler(event, context, {
    db: db,
    authModelAccessor: 'user',
    authFields: {
      id: 'id',
      username: 'username',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,
  })

  return await authHandler.invoke()
}
