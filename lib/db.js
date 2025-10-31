import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'products.json')

export function readProducts() {
  try {
    const json = fs.readFileSync(dataFile, 'utf8')
    return JSON.parse(json)
  } catch (err) {
    console.error('Error reading products.json', err)
    return []
  }
}

export function writeProducts(products) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Error writing products.json', err)
    return false
  }
}
