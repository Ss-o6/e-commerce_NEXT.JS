import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          🛍️ <span>ShopEase</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/admin">Admin</Link></li>
        </ul>
      </div>
    </nav>
  )
}
