import Link from "next/link"
import { readProducts } from "../lib/db"
import { useState, useEffect } from "react"

export async function getStaticProps() {
  const products = readProducts()

  // Mark some random products as recommended
  const recommendedIds = products
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map((p) => p.id)

  const updatedProducts = products.map((p) => ({
    ...p,
    isRecommended: recommendedIds.includes(p.id),
  }))

  return { props: { products: updatedProducts } }
}

export default function Home({ products }) {
  const [q, setQ] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [wishlist, setWishlist] = useState([])

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlist(saved)
  }, [])

  // Save wishlist to localStorage when changed
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const handleAddWishlist = (product) => {
    if (wishlist.some((p) => p.id === product.id)) return
    const updated = [...wishlist, product]
    setWishlist(updated)
    alert(`${product.name} added to wishlist!`)
  }

  // ✅ Filter logic
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && p.price < 2000) ||
      (priceRange === "mid" && p.price >= 2000 && p.price <= 10000) ||
      (priceRange === "high" && p.price > 10000)

    return matchesSearch && matchesPrice
  })

  return (
    <>
      <h1>Explore Products</h1>

      {/* Search and Filter Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            padding: "10px",
            flex: "1",
            minWidth: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#fff8e1",
          }}
        >
          <option value="all">All Prices</option>
          <option value="low">Below ₹2000</option>
          <option value="mid">₹2000 – ₹10,000</option>
          <option value="high">Above ₹10,000</option>
        </select>

        <Link href="/wishlist">🧡 Wishlist</Link>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{
                border: p.isRecommended ? "3px solid #fbc02d" : "2px solid #ffeb3b",
                background: p.isRecommended ? "#fffde7" : "#fff",
              }}
            >
              {p.isRecommended && (
                <div
                  style={{
                    background: "#fdd835",
                    color: "#111",
                    fontWeight: "600",
                    padding: "4px 8px",
                    display: "inline-block",
                    borderRadius: "6px",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  ⭐ Recommended
                </div>
              )}
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p className="price">₹{p.price}</p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link href={`/products/${p.slug}`}>View Details</Link>
                <button
                  onClick={() => handleAddWishlist(p)}
                  disabled={wishlist.some((item) => item.id === p.id)}
                  style={{
                    backgroundColor: wishlist.some((item) => item.id === p.id)
                      ? "#ccc"
                      : "#fdd835",
                    color: "#111",
                    padding: "6px 10px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: wishlist.some((item) => item.id === p.id)
                      ? "default"
                      : "pointer",
                    fontWeight: "600",
                  }}
                >
                  {wishlist.some((item) => item.id === p.id)
                    ? "Added ❤️"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this filter.</p>
        )}
      </div>
    </>
  )
}
