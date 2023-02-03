import prompts from 'src/lib/promptDB'
import {
  respond,
  authenticateUser,
  isMissingBody,
  isOptionRequest,
  success,
  error,
  isNotPostRequest,
  parseBody,
  setBodyDefaults,
  promptMissing,
  promptRequirementIsMissing,
  getTextCompletion,
} from 'src/lib/scribeUtil'

export const handler = async (event /*, context*/) => {
  try {
    if (isOptionRequest(event)) return success('success')
    if (isNotPostRequest(event)) return error('We expect a POST')
    if (isMissingBody(event)) return error('Missing JSON Body')
    let parsedBody = parseBody(event)
    parsedBody = setBodyDefaults(parsedBody)
    let promptConfig = await prompts({ ...parsedBody })
    if (promptMissing(promptConfig)) {
      return error(promptConfig.error || 'No prompt found')
    }
    let missingField = promptRequirementIsMissing(parsedBody, promptConfig)
    if (missingField) {
      return error(`Missing ${missingField}`)
    }
    let user = await authenticateUser({ headers: event.headers })
    if (user.error) {
      return respond({ statusCode: 401, data: { error: user.error } })
    }
    let response = await getTextCompletion({
      promptConfig,
      parsedBody,
      userCuid: user.cuid,
    })
    if (response.error) {
      return error(response.error)
    }
    //return success(response)
    return respond({
      statusCode: 200,
      data: {
        response: response,
        code: response,
      },
    })
  } catch (error) {
    console.log({ function: 'scribeV2', error })
    return respond({ statusCode: 500, data: { error: error.message } })
  }
}
