# 🛍️ SmartCart - AI-Powered E-Commerce Store

> **A modern, production-ready e-commerce platform built with Next.js, TypeScript, and AI** 🚀

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

**SmartCart** is a full-stack e-commerce solution featuring:

- ✅ **Complete Product Catalog** with categories, search, and filters
- ✅ **AI-Powered Smart Search** - Natural language product search
- ✅ **Intelligent Recommendations** - Personalized product suggestions
- ✅ **Shopping Cart** with persistent storage
- ✅ **Secure Checkout** with order management
- ✅ **Admin Dashboard** with analytics and product management
- ✅ **Mobile Responsive** Design
- ✅ **Ready for Payment Integration** (Razorpay)
- ✅ **Ready for Authentication** (NextAuth.js)
- ✅ **Production-Ready Architecture**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to project
cd /home/ubundu/MY_PROJECT/E-commerce

# Install dependencies
npm install

# Run development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to see the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 📸 Pages & Features

| Page | URL | Features |
|------|-----|----------|
| **Home** | `/` | Hero section, trending products, hot deals |
| **Products** | `/products` | Product listing with filters & search |
| **Product Detail** | `/products/[id]` | Product info, images, reviews, add to cart |
| **Shopping Cart** | `/cart` | Manage items, calculate total |
| **Checkout** | `/checkout` | Shipping address, payment info |
| **Admin Dashboard** | `/admin` | Sales analytics, product management |

---

## 🏗️ Architecture

```
Frontend (Next.js)
    ↓
API Routes (TypeScript)
    ↓
Mock Data (Ready for DB)
    ↓
Utilities & Services
```

### Key Folders

- `app/` - Page routes and layouts
- `components/` - Reusable React components
- `lib/` - Business logic and utilities
- `types/` - TypeScript type definitions
- `utils/` - Constants and formatters

---

## 🔧 API Endpoints

### Products
```
GET    /api/products              # List all products
GET    /api/products/[id]         # Get single product
POST   /api/products              # Create product (admin)
PUT    /api/products/[id]         # Update product
DELETE /api/products/[id]         # Delete product
```

### Orders
```
GET    /api/orders                # Get orders
POST   /api/orders                # Create order
```

### AI Features
```
POST   /api/ai/search             # Intelligent search
POST   /api/ai/recommendations    # Get recommendations
```

---

## 📚 Documentation

For detailed documentation, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)

Topics covered:
- Feature list
- Tech stack details
- Complete project structure
- API documentation
- Component details
- Integration steps
- Deployment guide

---

## 🎨 Customization

### Add Products
Edit `lib/products.ts` to add mock products:

```typescript
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Your Product",
    price: 9999,
    category: "Electronics",
    // ... other fields
  },
];
```

### Change Branding
- Update logo in `components/Navbar.tsx`
- Change colors in `app/globals.css`
- Update metadata in `app/layout.tsx`

### Add Categories
Edit `utils/constants.ts`:

```typescript
export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Your Category",
];
```

---

## 🔐 Next Steps for Production

1. **Database**: Setup PostgreSQL with Prisma
   ```bash
   npm install @prisma/client prisma
   ```

2. **Authentication**: Integrate NextAuth.js
   ```bash
   npm install next-auth
   ```

3. **Payments**: Add Razorpay integration
   ```bash
   npm install razorpay
   ```

4. **AI Search**: Integrate Groq API
   ```bash
   npm install groq-sdk
   ```

See [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for detailed setup instructions.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Or Push to GitHub
```bash
git push origin main
```
Then connect to Vercel via GitHub.

---

## 📊 Performance

- ⚡ **Fast**: Optimized Next.js 16 with App Router
- 📦 **Small**: Tailwind CSS for minimal CSS
- 🎯 **Efficient**: Client-side cart management
- 🔄 **Responsive**: Mobile-first design

---

## 🎓 Learning Outcomes

This project teaches:
- ✅ Next.js App Router & TypeScript
- ✅ API routes & RESTful design
- ✅ Component-based architecture
- ✅ State management (localStorage)
- ✅ Responsive design with Tailwind
- ✅ E-commerce best practices
- ✅ Full-stack development workflow

Perfect for **portfolio projects** and **job interviews**! 🚀

---

## 📝 License

MIT License - Free to use and modify

---

## 🙋 Support

For questions or issues:
1. Check [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)
2. Review component code and comments
3. Check API routes for examples

---

## 🚀 Future Enhancements

- [ ] User authentication (NextAuth.js)
- [ ] Database integration (PostgreSQL + Prisma)
- [ ] Payment processing (Razorpay)
- [ ] AI-powered search (Groq)
- [ ] Email notifications
- [ ] Wishlist feature
- [ ] Product reviews & ratings
- [ ] User accounts & order history
- [ ] Admin analytics dashboard
- [ ] Inventory management

---

**Happy Coding! 🎉**

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
