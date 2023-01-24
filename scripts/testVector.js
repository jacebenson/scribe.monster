// To access your database
// Append api/* to import from api and web/* to import from web

// lets load up the test.json
import vectors from './vectorData/test.json'

let dot = (a, b) => {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
}

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log({ args })
  // lets expect a number for what vector to compare
  // the argument can be zero so we need to check for undefined
  // if the argument is not passed error
  if (args._[1] === undefined) {
    console.log(':: No vector number provided ::')
    return
  }
  // lets parse the number
  console.log(`:: Loading vector ${args._[1]} ::`)
  let loadedVector = parseInt(args._[1], 10)

  let vectorData = vectors[loadedVector]
  console.log({ name: vectorData.name })
  console.log({ vector: vectorData.vector })
  // lets iterate over the vectors excluding the loaded vector
  let results = vectors.map((otherVector, index) => {
    if (index !== loadedVector) {
      return {
        dotVal: dot(vectorData.vector, otherVector.vector), //dot(vectorData, vector),
        name: otherVector.name,
      }
    }
  })
  // lets output the results
  console.log(':: Results ::')
  console.log({ results })
  console.log({ loadedVector: vectorData.name })
}
