import { useState, useEffect } from "react"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Admin() {
  const { data: products, mutate } = useSWR("/api/products", fetcher)
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  })

  // ✅ Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  // Load auth status from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    // ✅ Change these credentials as you wish
    const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USERNAME
  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (
      credentials.username === ADMIN_USER &&
      credentials.password === ADMIN_PASS
    ) {
      localStorage.setItem("adminLoggedIn", "true")
      setIsLoggedIn(true)
      alert("✅ Welcome Admin!")
    } else {
      alert("❌ Invalid username or password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsLoggedIn(false)
  }

  async function addProduct(e) {
    e.preventDefault()
    const body = {
      ...form,
      price: Number(form.price),
      inventory: Number(form.inventory),
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "change_me",
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      alert("✅ Product added successfully!")
      setForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        category: "",
        inventory: "",
      })
      mutate()
    } else {
      alert("❌ Failed to add product. Check your fields.")
    }
  }

  // 🧱 LOGIN SCREEN if not logged in
  if (!isLoggedIn) {
    return (
      <main style={{ padding: 20 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "20px",
            maxWidth: "400px",
            margin: "100px auto",
            border: "2px solid #ffeb3b",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#111",
            }}
          >
            🔐 Admin Login
          </h2>
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <input
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
              className="admin-input"
            />
            <input
              placeholder="Password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              className="admin-input"
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#fdd835",
                color: "#111",
                fontWeight: "600",
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </main>
    )
  }

  // 🧭 If logged in — Show admin panel
  return (
    <main style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Panel</h1>
        <button
  onClick={handleLogout}
  style={{
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
  }}
  onMouseOver={(e) => (e.target.style.background = "#d32f2f")}
  onMouseOut={(e) => (e.target.style.background = "#f44336")}
>
  🚪 Logout
</button>

      </div>

      {/* Add Product Section */}
      <section
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "20px",
          maxWidth: "600px",
          margin: "30px auto",
          border: "2px solid #ffeb3b",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#111",
          }}
        >
          ➕ Add New Product
        </h2>

        <form
          onSubmit={addProduct}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="admin-input"
          />

          <input
            placeholder="Slug (e.g., wireless-mouse)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
            className="admin-input"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows="3"
            className="admin-input"
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              type="number"
              className="admin-input"
              style={{ flex: 1 }}
            />
            <input
              placeholder="Inventory"
              value={form.inventory}
              onChange={(e) => setForm({ ...form, inventory: e.target.value })}
              required
              type="number"
              className="admin-input"
              style={{ flex: 1 }}
            />
          </div>

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="admin-input"
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#fdd835",
              color: "#111",
              fontWeight: "600",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.2s ease",
            }}
          >
            Add Product
          </button>
        </form>
      </section>

      {/* Product List */}
      <section
        style={{
          marginTop: "40px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "20px",
          border: "2px solid #ffeb3b",
        }}
      >
        <h2 style={{ color: "#111", marginBottom: "15px" }}>
          📦 Existing Products
        </h2>
        {!products ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ background: "#fff8e1" }}>
                <th style={{ padding: "8px" }}>Name</th>
                <th style={{ padding: "8px" }}>Price</th>
                <th style={{ padding: "8px" }}>Stock</th>
                <th style={{ padding: "8px" }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{p.name}</td>
                  <td style={{ padding: "8px" }}>₹{p.price}</td>
                  <td style={{ padding: "8px" }}>{p.inventory}</td>
                  <td style={{ padding: "8px" }}>{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}
