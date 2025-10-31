import { readProducts, writeProducts } from '../../../lib/db'

export default function handler(req, res) {
  const { id } = req.query
  const products = readProducts()
  const byId = products.find(p => p.id === id)
  const bySlug = products.find(p => p.slug === id)
  const product = byId || bySlug

  if (req.method === 'GET') {
    if (!product) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(product)
  }

  if (req.method === 'PUT') {
    const apiKey = req.headers['x-api-key'] || ''
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!product) return res.status(404).json({ error: 'Not found' })
    const body = req.body
    product.price = typeof body.price !== 'undefined' ? Number(body.price) : product.price
    product.inventory = typeof body.inventory !== 'undefined' ? Number(body.inventory) : product.inventory
    product.name = body.name || product.name
    product.description = body.description || product.description
    product.lastUpdated = new Date().toISOString()

    const updated = products.map(p => p.id === product.id ? product : p)
    const ok = writeProducts(updated)
    if (!ok) return res.status(500).json({ error: 'Failed to save' })
    return res.status(200).json(product)
  }

  res.setHeader('Allow', ['GET','PUT'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
