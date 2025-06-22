# Product Catalog - I311 Assessment Project

This is a full-stack Product Catalog web application built using **AdonisJS**, developed as part of the I311 Advanced Web Solutions course. It allows administrators to manage products and categories, and provides guests with a search- and filter-enabled browsing experience.

## 📦 Features

### 👩‍💼 Admin (Authenticated Users)
- Full CRUD operations for Products and Categories
- Product image upload support
- Dashboard with paginated product listing
- Authentication with secure password hashing
- CSRF protection and form validation

### 🌐 Guest Users
- Browse all products
- Filter products by category
- Search for products by name
- View individual product details (read-only)

## 🛠️ Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Backend     | AdonisJS v6 (TypeScript) |
| Frontend    | Edge.js templating engine |
| ORM         | Lucid ORM         |
| Database    | SQLite            |
| Middleware  | Auth, Guest access, CSRF |
| Other Tools | Vite, Eslint, CUID |

## 🗂️ Project Structure

```plaintext
product-catalog/
├── app/
│   ├── controllers/         # Product and Auth controllers
│   ├── models/              # Lucid models: Product, Category, User
│   ├── middleware/          # Auth and Guest middleware
├── config/                  # Database and app configs
├── public/                  # Static assets
├── resources/
│   └── views/               # Edge templates for dashboard and guest views
├── database/
│   ├── migrations/          # DB schema migrations
├── tests/                   # Automated tests (if applicable)
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Getting Started
### Prerequisites
- Node.js v18+
- npm
- SQLite3
- run: `npm install` & `npm install sqlite3`

### Installation
1. `git clone https://github.com/MartynOrchard1/I311-Assessment-Final.git`
2. Install Dependancies: `npm install` & `npm install sqlite3`
3. Run migrations: `node ace migration:run
4. Start dev server: `npm run dev`
5. App instructions come out in the terminal

### Authentication
- Uses @adonisjs/auth with email/password
- Passwords are hashed using scrypt
- CSRF protection is included in all POST routes
- Login Details: test@gmail.com | password

### Image Upload
- Product images are uploaded and stored in the public/uploads directory
- Uploaded paths are saved in the products table

### Key Files
- ProductsController.ts: Handles product CRUD logic
- GuestController.ts: Renders guest-facing product pages
- auth_controller.ts: Manages login and logout
- database/migrations/: Contains all schema definitions
- views/: Edge templates for frontend rendering

### Author
This project was developed by Martyn James Orchard | Software Engineering Major BICT Student | 21356032
