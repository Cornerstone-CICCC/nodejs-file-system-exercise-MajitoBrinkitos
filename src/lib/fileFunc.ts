import fs from 'fs'
import path from 'path'

const directory = "docs"
const docsDirectory = path.join(__dirname, "../../", directory)

export const listFiles = async () => {
  try {
    const files = await fs.promises.readdir(docsDirectory)
    return files
  } catch (err) {
    throw new Error("Unable to read directory...")
  }
}

export const readAFile = async (filename: string) => {
  try {
    const filePath = path.join(docsDirectory, filename)
    const data = await fs.promises.readFile(filePath)
    return data
  } catch (err) {
    throw new Error("Something went wrong...")
  }
}

export const createFile = async (filename: string, content: string) => {
  try {
    const filePath = path.join(docsDirectory, filename)
    await fs.promises.writeFile(filePath, content)
    return true
  } catch (err) {
    throw new Error("Something went wrong...")
  }
}

export const deleteAFile = async (filename: string) => {
  try {
    const filePath = path.join(docsDirectory, filename)
    await fs.promises.unlink(filePath)
    return true
  } catch (err) {
    throw new Error(`Unable to delete file: ${filename}`)
  }
}