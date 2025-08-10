# Car Shop Application

[Live Demo 🚗](https://auto-car-client.vercel.app/)
[Frontend GitHub Repo](https://github.com/neelimapriya/auto-car-client)
 [Backend GitHub Repo](https://github.com/neelimapriya/car-shop-backend)

---

## Overview

Car Shop is a modern e-commerce platform for browsing, searching, and purchasing cars online. It features secure authentication, role-based dashboards, Stripe payment integration, and a responsive, user-friendly UI.

---

## Features

### 🚘 Car Management
- Browse, search, and view car details
- Admins can add, update, or delete cars

### 🛒 Order Management
- Place orders for cars (with stock validation)
- View and manage orders (admin & user dashboards)
- Stripe payment integration for secure checkout

### 👤 User Authentication & Roles
- Secure registration & login (JWT-based)
- Role-based dashboards: User & Admin
- Profile management

### 🖥️ Responsive UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Clean, modern interface using React, Tailwind CSS, and shadcn/ui
- User-friendly error handling and toast notifications

---

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express.js, TypeScript, Mongoose
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment:** Stripe

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Setup

```sh
git clone https://github.com/neelimapriya/auto-car-client.git
cd auto-car-client
npm install
# Create a .env file as needed
npm run dev
```

### Backend Setup

See the [car-shop-backend README](https://github.com/neelimapriya/car-shop-backend) for backend setup instructions.

---

## Environment Variables

Create a `.env` file in both frontend and backend root directories.  
Frontend example:
```
VITE_API_URL=your_backend_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```
Backend example (see backend repo for details):
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Project Structure

```
auto-car-client/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   ├── pages/
  │   ├── redux/
  │   ├── routes/
  │   └── types/
  ├── package.json
  └── ...
```

---

## Useful Links

- **Live Site:** [auto-car-client.vercel.app](https://auto-car-client.vercel.app/)
- **Frontend Repo:** [auto-car-client](https://github.com/neelimapriya/auto-car-client)
- **Backend Repo:** [car-shop-backend](https://github.com/neelimapriya/car-shop-backend)

---

## License

This project is open source and available under the [MIT License](LICENSE).
