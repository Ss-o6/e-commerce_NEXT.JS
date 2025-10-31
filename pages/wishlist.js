import Link from "next/link"
import { useEffect, useState } from "react"

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlist(saved)
  }, [])

  const handleRemove = (id) => {
    const updated = wishlist.filter((p) => p.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Your Wishlist ❤️</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {wishlist.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "2px solid #fbc02d",
                padding: "16px",
              }}
            >
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p style={{ color: "#f9a825", fontWeight: "600" }}>₹{p.price}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link href={`/products/${p.slug}`}>View Details</Link>
                <button
                  onClick={() => handleRemove(p.id)}
                  style={{
                    backgroundColor: "#ffeb3b",
                    color: "#111",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
