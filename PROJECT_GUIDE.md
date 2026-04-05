# 🚀 AI-Powered Smart E-Commerce Store

A modern, production-ready e-commerce platform built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Features AI-powered recommendations, smart search, and a complete shopping experience.

---

## 🎯 Features

### Core Features ✅
- **🛍️ Product Catalog** - Browse products by category with detailed pages
- **🔍 Smart Search** - Intelligent product search with filters
- **🛒 Shopping Cart** - Add/remove items, manage quantities, persistent storage
- **💳 Checkout** - Complete checkout flow with address validation
- **📦 Order Management** - Order history and status tracking
- **⭐ Reviews & Ratings** - Product reviews with star ratings

### AI-Powered Features 🤖
- **🔮 AI Recommendations** - Smart product suggestions based on browsing history
- **🧠 Intelligent Search** - Natural language product search (Groq API ready)
- **📊 Personalization** - Customized experience per user

### Admin Features 📊
- **📈 Dashboard** - Sales analytics and metrics
- **📦 Product Management** - Add, edit, delete products
- **👥 Customer Management** - View customer details
- **📋 Order Management** - Track and manage orders

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **State Management** | LocalStorage + Context API (ready) |
| **Database** | PostgreSQL with Prisma (ready) |
| **Auth** | NextAuth.js (ready) |
| **Payments** | Razorpay (ready) |
| **AI** | Groq API (ready) |

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── products/
│   │   ├── page.tsx             # Products listing
│   │   └── [id]/page.tsx        # Product detail
│   ├── cart/page.tsx            # Shopping cart
│   ├── checkout/page.tsx        # Checkout page
│   ├── admin/page.tsx           # Admin dashboard
│   └── api/
│       ├── products/
│       │   ├── route.ts         # GET/POST products
│       │   └── [id]/route.ts    # GET/PUT/DELETE product
│       ├── orders/route.ts      # Order management
│       └── ai/
│           ├── search/route.ts  # AI search
│           └── recommendations/ # AI recommendations
├── components/
│   ├── Navbar.tsx               # Navigation
│   ├── ProductCard.tsx          # Product card
│   ├── CartItem.tsx             # Cart item
│   └── SearchBar.tsx            # Smart search
├── lib/
│   ├── products.ts              # Product utilities
│   └── cart.ts                  # Cart utilities
├── types/
│   └── index.ts                 # TypeScript types
└── utils/
    ├── constants.ts             # App constants
    └── formatters.ts            # Format utilities
```

---

## 🚀 Getting Started

### 1. Installation

```bash
# Navigate to project
cd /home/ubundu/MY_PROJECT/E-commerce

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## 📝 API Documentation

### Products API

#### GET /api/products
Fetch all products with optional filters

```bash
# Get all products
curl http://localhost:3000/api/products

# Filter by category
curl "http://localhost:3000/api/products?category=Electronics"

# Search products
curl "http://localhost:3000/api/products?search=laptop"

# Filter by price
curl "http://localhost:3000/api/products?minPrice=1000&maxPrice=50000"
```

#### GET /api/products/[id]
Fetch single product

```bash
curl http://localhost:3000/api/products/1
```

#### POST /api/products
Create new product (Admin)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "price": 10000,
    "category": "Electronics",
    "description": "Product description",
    "images": ["/product.jpg"],
    "stock": 10
  }'
```

### AI Search API

#### POST /api/ai/search
Smart search with natural language understanding

```bash
curl -X POST http://localhost:3000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "cheap shoes under 1000",
    "filters": {
      "minPrice": 0,
      "maxPrice": 1000
    }
  }'
```

### Orders API

#### POST /api/orders
Create order

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "email": "user@example.com",
    "shippingAddress": {...}
  }'
```

#### GET /api/orders
Get user orders

```bash
curl http://localhost:3000/api/orders
```

---

## 🎨 Key Components

### ProductCard
Displays product with image, price, rating, and actions

```tsx
<ProductCard 
  product={product} 
  onAddToCart={handleAddToCart}
/>
```

### Navbar
Navigation with responsive mobile menu

### SearchBar
Smart search with dropdown suggestions

### CartItem
Manages individual cart item quantity and removal

---

## 🔐 Features Ready for Integration

### 1. Authentication (NextAuth.js)
```typescript
// Ready to integrate
import { useSession } from "next-auth/react";
```

### 2. Database (Prisma + PostgreSQL)
```typescript
// Schema ready to be generated
prisma generate
```

### 3. Payment (Razorpay)
```typescript
// Ready for Razorpay checkout integration
const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
```

### 4. AI (Groq)
```typescript
// Ready for AI-powered search
const groqKey = process.env.GROQ_API_KEY;
```

---

## 🗂️ Mock Data

Sample products are included in `/lib/products.ts`:
- MacBook Pro 16
- Nike Air Max
- The Clean Code Book
- Sony Headphones
- Levi's Jeans
- iPad Air 11

Add more products to customize the catalog.

---

## 🎯 Next Steps

### Phase 1: Database Integration
1. Install Prisma
2. Setup PostgreSQL
3. Create database schema
4. Replace mock data with real data

### Phase 2: Authentication
1. Setup NextAuth.js
2. Implement user registration/login
3. Protect API routes
4. User profile management

### Phase 3: Payments
1. Integrate Razorpay API
2. Handle payment callbacks
3. Update order status

### Phase 4: AI Features
1. Integrate Groq API
2. Implement natural language search
3. Add resume-based recommendations
4. Setup voice search

---

## 📊 Environment Variables (Optional)

Create `.env.local`:

```env
# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret

# Groq
GROQ_API_KEY=your_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

# NextAuth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚢 Deployment

### Deploy to Vercel

```bash
vercel
```

### Environment variables on Vercel
1. Go to project settings
2. Add environment variables
3. Deploy

---

## 📈 Performance Tips

- Images are optimized with Next.js `Image` component
- Tailwind CSS is production-optimized
- API routes are serverless functions
- Cart state is persisted locally

---

## 🤝 Contributing

Feel free to fork and improve the project!

---

## 📄 License

MIT License - Feel free to use in your projects

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Razorpay Integration](https://razorpay.com/docs)
- [Groq API Docs](https://console.groq.com/docs)

---

## 💡 Pro Tips

1. **Add Product Images**: Replace placeholder images in `/public/products/`
2. **Customize Branding**: Change colors in `globals.css` and component classes
3. **Add More Products**: Edit `/lib/products.ts`
4. **Setup Database**: Follow Phase 1 steps
5. **Deploy Early**: Test on Vercel/Netlify early

---

**Built with ❤️ for learning and portfolio impact** 🚀
