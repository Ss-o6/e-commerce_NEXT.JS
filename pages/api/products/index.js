import { readProducts, writeProducts } from '../../../lib/db'
import { v4 as uuidv4 } from 'uuid'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const products = readProducts()
    return res.status(200).json(products)
  }

  if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'] || ''
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const body = req.body
    if (!body.name || !body.slug) return res.status(400).json({ error: 'Missing fields' })

    const products = readProducts()
    const newProduct = {
      id: uuidv4(),
      name: body.name,
      slug: body.slug,
      description: body.description || '',
      price: Number(body.price) || 0,
      category: body.category || 'uncategorized',
      inventory: Number(body.inventory) || 0,
      lastUpdated: new Date().toISOString()
    }
    products.push(newProduct)
    const ok = writeProducts(products)
    if (!ok) return res.status(500).json({ error: 'Failed to save' })
    return res.status(201).json(newProduct)
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
