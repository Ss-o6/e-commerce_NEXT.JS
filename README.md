 ##🛍️ Next.js E-commerce Project

A modern e-commerce web application built with Next.js that showcases different rendering strategies (SSG, SSR, ISR, and CSR) along with product listing, wishlist management, and an admin dashboard.

---

## How to Run the Project

 Clone the repository or copy the project files**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   Install dependencies

npm install


Set up environment variables

Create a .env file in the root folder.

Copy the variables from .env.example and set their values (e.g., ADMIN_API_KEY, NEXT_PUBLIC_ADMIN_KEY, etc.)

Run the development server

npm run dev


Open your browser and navigate to:
http://localhost:3000

(Optional) For production build

npm run build
npm start


## Rendering Strategies Used and Reasons

Home Page (/) – Uses Static Site Generation (SSG) through getStaticProps.
The product list on the home page doesn’t change frequently, so it is generated at build time for fast loading and better performance.

Product Details Page (/products/[slug]) – Uses SSG with Incremental Static Regeneration (ISR).
Each product page is pre-rendered once and automatically updated after a set time interval, keeping the data fresh without rebuilding the whole site.

Dashboard Page (/dashboard) – Uses Server-Side Rendering (SSR) through getServerSideProps.
The dashboard shows live product and inventory information, so it needs to fetch new data from the server every time the page loads.

Admin Panel (/admin) – Uses Client-Side Rendering (CSR).
Admin login, authentication, and product management are handled entirely on the client side using React state and API requests.

Wishlist Page (/wishlist) – Uses Client-Side Rendering (CSR).
The wishlist is stored in the browser’s localStorage and updated directly on the client side, so it doesn’t require any server-side rendering.
