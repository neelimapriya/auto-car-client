# Car Shop Application

## Overview

The Car Shop application is an e-commerce platform that allows users to browse, search, and purchase cars online. The platform includes secure authentication, role-based access, and a responsive UI for an enhanced user experience.

## Features

### 1. User Registration & Authentication

- **Secure Registration & Login**
  - Users can register with name, email, and password.
  - Passwords are securely hashed before storage.
  - Default role: `user`.
- **JWT Authentication**
  - A JWT token is generated when login.
  - The token is stored in local storage to maintain sessions.
- **Logout**
  - Token is cleared from local storage when logout.

### 2. Private Routes

- **Checkout Page**
  - Users can place orders.
  - Order quantity must not exceed stock availability.
  - Order Form: Product details, user details, total price calculation, and payment method.
  - Payment Integration: Uses Stipe as the payment gateway.
  - "Confirm Order" button to confirm the purchase.
- **Dashboard (Role-Based Access)**
  - **Admin Dashboard:**
    - Manage users (deactivate accounts).
    - Manage products (CRUD operations).
    - Manage orders (CRUD operations).
  - **User Dashboard:**
    - View orders.
    - Manage profile settings.

### 3. UI/UX Design

- **Responsive Design**
  - Fully functional across all screen sizes.
  - Proper alignment, typography, and intuitive layouts.
- **Error Handling**

  - User-friendly error messages for:
    - Invalid login credentials.
    - Registration errors (duplicate email, etc.).
    - Failed operations (e.g., out-of-stock products).

- **Toasts**
  - use sooner for toast

## Recommendation Functionalities (Optional)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Steps to Run the Project

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/car-shop.git
   cd car-shop
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following values:

     ```env

     ```

4. Start the frontend:
   ```sh
   npm run dev
   ```

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, shdcn.ui
- **Backend:** Node.js, Express.js,mongoose
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Gateway:** Stripe
