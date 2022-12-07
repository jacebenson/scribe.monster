const fs = require('fs')
const path = require('path')

// To access your database
export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  if (args._[1]) console.log(args._[1])

  // Replace with the path to your directory of JavaScript files
  const directory = args._[1]

  // Read all files in the directory and its subdirectories
  const files = readFilesRecursive(directory)

  // Create an empty array to store the parsed data
  const data = []

  // Loop through each file
  files.forEach((file) => {
    // Get the file path
    const filePath = path.join(directory, file)

    // Read the file
    const fileData = fs.readFileSync(filePath, 'utf8')

    // Parse the file data into a JSON object
    const parsedData = {
      prompt: file,
      completion: fileData.replace(/\n/g, ' '),
    }

    // Add the parsed data to the array
    data.push(parsedData)
  })

  // Convert the array of objects to a string with line breaks
  const jsonl = data.map((obj) => JSON.stringify(obj)).join('\n')

  // Write the string to a JSONL file
  fs.writeFileSync('./data.jsonl', jsonl)

  /**
   * Reads all files in a directory and its subdirectories
   * @param {string} directory - The directory to read
   * @param {string[]} [fileList] - The list of files to append to
   * @returns {string[]} The list of files
   */
  function readFilesRecursive(directory, fileList = []) {
    // Read all files in the directory
    const files = fs.readdirSync(directory)

    // Loop through each file
    files.forEach((file) => {
      // Get the file path
      const filePath = path.join(directory, file)

      // Check if the file is a directory
      if (fs.statSync(filePath).isDirectory()) {
        // Read the files in the directory recursively
        fileList = readFilesRecursive(filePath, fileList)
      } else {
        // Add the file to the list
        fileList.push(filePath)
      }
    })

    return fileList
  }
}
