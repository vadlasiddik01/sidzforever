# �� FOREVER - Complete E-commerce Platform

![Demo GIF](https://github.com/vadlasiddik01/sidzforever/blob/main/frontend/mainforever.gif)

# ADMIN Panel - SIDZFOREVER
![Demo GIF](https://github.com/vadlasiddik01/sidzforever/blob/main/admin/foreverAdmin.gif)

A full-stack e-commerce solution built with modern technologies, featuring user authentication, product management, multiple payment gateways, and comprehensive admin controls.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Features](#-features)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Payment Integration](#-payment-integration)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🏗️ Project Overview

FOREVER is a comprehensive e-commerce platform consisting of three main applications:

- **Backend API** - Node.js/Express server with MongoDB
- **Frontend User App** - React-based customer interface
- **Admin Panel** - React-based admin management interface

### Key Features

- 🔐 **Secure Authentication** - JWT-based user and admin authentication
- 🛍️ **Product Management** - Complete product catalog with image management
- 🛒 **Shopping Cart** - Real-time cart management with persistent storage
- 📋 **Multiple Payment Methods** - Stripe, Razorpay, and Cash on Delivery
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 📋 **Admin Controls** - Comprehensive order and product management
- ☁️ **Cloud Storage** - Cloudinary integration for image management

## 🏛️ Architecture

```
FOREVER/
├── backend/          # Node.js API server
├── frontend/         # React user application
├── admin/            # React admin panel
└── README.md         # Project documentation
```

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend App  │    │   Admin Panel   │    │   Backend API   │
│   (React)       │    │   (React)       │    │   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │    MongoDB      │
                    │   Database      │
                    └─────────────────┘
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Payment Gateways**: Stripe + Razorpay
- **Security**: bcrypt (password hashing), CORS
- **Validation**: Validator.js

### Frontend User App
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Build Tool**: Vite

### Admin Panel
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Build Tool**: Vite

## ✨ Features

### User Features
- 🔐 User registration and authentication
- 🛍️ Browse products by category and search
- 🛒 Add/remove items from shopping cart
- 📍 Multiple delivery addresses
- 💳 Multiple payment methods (Stripe, Razorpay, COD)
- 📋 Order history and tracking
- 📱 Responsive mobile-first design

### Admin Features
- 🔐 Secure admin authentication
- 🛍️ Product management (add, edit, delete)
- 🖼️ Image upload and management via Cloudinary
- 📋 Order management and status updates
- 💰 Payment status monitoring
- 📊 Order analytics and overview

### Technical Features
- 🔒 JWT-based authentication with expiration
- 🚀 Real-time cart updates
- 📡 RESTful API architecture
- 🗄️ MongoDB database with Mongoose
- ☁️ Cloudinary image storage
- 🔄 Payment webhook handling
- 📱 Progressive Web App capabilities

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```

## 🔧 Environment Variables

Create `.env` files in each directory with the following variables:

### Backend (.env)
```bash
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key

# Server
PORT=4000
```

### Frontend (.env)
```bash
VITE_BACKEND_URL=http://localhost:4000
```

### Admin (.env)
```bash
VITE_BACKEND_URL=http://localhost:4000
```

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/user/register     - User registration
POST /api/user/login        - User login
POST /api/user/admin        - Admin login
```

### Product Endpoints
```
GET  /api/product/list      - Get all products
POST /api/product/add       - Add new product (admin)
```

### Order Endpoints
```
POST /api/order/place       - Place COD order
POST /api/order/stripe      - Create Stripe session
POST /api/order/razorpay    - Create Razorpay order
POST /api/order/userorders  - Get user orders
GET  /api/order/list        - Get all orders (admin)
POST /api/order/status      - Update order status (admin)
```

### Cart Endpoints
```
POST /api/cart/add          - Add item to cart
POST /api/cart/update       - Update cart quantity
POST /api/cart/get          - Get user cart
```

## 💳 Payment Integration

### Stripe Integration
- **Secure Checkout**: Redirect-based payment flow
- **Multiple Currencies**: USD support
- **Webhook Handling**: Payment confirmation
- **Error Handling**: Comprehensive error management

### Razorpay Integration
- **In-App Payment**: Modal-based payment experience
- **Order Management**: Razorpay order tracking
- **Payment Verification**: Secure response validation

### Cash on Delivery (COD)
- **Direct Orders**: No payment processing required
- **Order Tracking**: Full order lifecycle management

## 📄 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  cartData: Object (shopping cart)
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: Array (required, Cloudinary URLs),
  category: String (required),
  subCategory: String (required),
  sizes: Array (required),
  bestseller: Boolean,
  date: Number (timestamp)
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User, required),
  items: Array (product items),
  amount: Number (required),
  address: Object (shipping address),
  orderStatus: String (default: 'Order Placed'),
  paymentMethod: String (required),
  payment: Boolean (default: false),
  date: Number (timestamp)
}
```

## 🚀 Development

### Available Scripts

#### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

#### Frontend/Admin
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Development Workflow
1. **Backend**: Start MongoDB and run `npm run dev`
2. **Frontend**: Run `npm run dev` in frontend directory
3. **Admin**: Run `npm run dev` in admin directory
4. **Database**: Ensure MongoDB connection is established
5. **Environment**: Set up all required environment variables

## 🌐 Deployment

### Backend Deployment (Vercel)
```bash
cd backend
vercel --prod
```

### Frontend Deployment (Vercel)
```bash
cd frontend
vercel --prod
```

### Admin Panel Deployment (Vercel)
```bash
cd admin
vercel --prod
```

### Environment Setup
- Set production environment variables in Vercel
- Update frontend/admin backend URLs to production
- Ensure MongoDB Atlas connection
- Configure Cloudinary, Stripe, and Razorpay for production

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Comprehensive input sanitization
- **Token Expiration**: Automatic token expiration handling
- **Admin Protection**: Secure admin route access

## 📱 User Experience Features

- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live cart and order management
- **Toast Notifications**: User feedback system
- **Form Validation**: Client and server-side validation
- **Loading States**: User interaction feedback
- **Error Handling**: Comprehensive error messages

## 🚀 Performance Optimizations

- **Vite Build Tool**: Fast development and optimized builds
- **Image Optimization**: Cloudinary CDN integration
- **Code Splitting**: React lazy loading
- **Efficient State Management**: Context API optimization
- **Database Indexing**: MongoDB query optimization

## 🔮 Future Enhancements

- **Real-time Chat**: Customer support integration
- **Analytics Dashboard**: Sales and user analytics
- **Inventory Management**: Stock tracking and alerts
- **Email Notifications**: Order updates and marketing
- **Multi-language**: Internationalization support
- **Mobile App**: React Native or PWA
- **Advanced Search**: Elasticsearch integration
- **Recommendation Engine**: AI-powered product suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Project Status

- ✅ **Backend API**: Complete and production-ready
- ✅ **Frontend User App**: Complete and production-ready
- ✅ **Admin Panel**: Complete and production-ready
- ✅ **Payment Integration**: Stripe, Razorpay, COD
- ✅ **Authentication**: JWT-based security
- ✅ **Database**: MongoDB with Mongoose
- ✅ **File Storage**: Cloudinary integration
- ✅ **Deployment**: Vercel ready

---

**FOREVER** - Building the future of e-commerce, one feature at a time! 🚀✨
```
