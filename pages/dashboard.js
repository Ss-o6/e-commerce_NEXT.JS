import { readProducts } from '../lib/db'

export async function getServerSideProps(context) {
  const products = readProducts()
  const total = products.length
  const lowStock = products.filter(p => p.inventory <= 10).length
  return {
    props: { products, total, lowStock }
  }
}


export default function Dashboard({ products, total, lowStock }) {
  return (
    <>
      <h1>Inventory Dashboard</h1>
      <div style={{ background: '#fff8e1', padding: '12px', borderRadius: '10px', marginBottom: '20px' }}>
        <p><strong>Total Products:</strong> {total}</p>
        <p><strong>Low Stock (≤10):</strong> {lowStock}</p>
      </div>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#fff176' }}>
          <tr><th>Name</th><th>Inventory</th><th>Price</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ background: '#fff' }}>
              <td>{p.name}</td><td>{p.inventory}</td><td>₹{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}


