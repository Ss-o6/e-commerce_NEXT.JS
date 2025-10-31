import { readProducts } from '../../lib/db'

export async function getStaticPaths() {
  const products = readProducts()
  const paths = products.map(p => ({ params: { slug: p.slug } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const products = readProducts()
  const product = products.find(p => p.slug === params.slug)
  if (!product) {
    return { notFound: true }
  }
  return {
    props: { product },
    revalidate: 60
  }
}

export default function ProductPage({ product }) {
  return (
    <main style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <p>Inventory: {product.inventory}</p>
      <p>Last updated: {new Date(product.lastUpdated).toLocaleString()}</p>
    </main>
  )
}
