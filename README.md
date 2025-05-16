# Digital Product Backend (Medusa Server)

This is the backend server for the Digital Product e-commerce system, powered by Medusa commerce engine.

## Features

- Complete e-commerce functionality
- Payment processing with Stripe
- Digital product support
- Order management
- Storefront and admin API endpoints

## Prerequisites

- Node.js 16 or later
- PostgreSQL database
- Stripe account (for payment processing)

## Installation

1. Clone the repository (if not already done)
2. Navigate to the backend directory:

```bash
cd Medusa_Digital_Product_Backend
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Set up environment variables by creating a `.env` file in the root directory:

```
# Database configuration
DATABASE_URL=postgres://username:password@localhost/medusa_db

# Medusa server configuration
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:8000,http://localhost:3000
ADMIN_CORS=http://localhost:5173,http://localhost:9000
AUTH_CORS=http://localhost:5173,http://localhost:9000,http://localhost:8000

# Security
JWT_SECRET=your_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here

# Stripe integration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here
```

5. Create and seed the database:

```bash
npm run build
npm run seed
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The Medusa backend will be available at [http://localhost:9000](http://localhost:9000).

To start the Medusa admin dashboard:

```bash
npm run start:admin
```

The admin dashboard will be available at [http://localhost:7000](http://localhost:7000).

## API Endpoints

The Medusa server provides two primary API segments:

- **Store API** (`/store/*`): Used by the storefront
- **Admin API** (`/admin/*`): Used by the admin dashboard

### Key Endpoints

#### Store API

- `GET /store/products`: Get all products
- `GET /store/products/:id`: Get a specific product
- `POST /store/carts`: Create a cart
- `POST /store/carts/:id/line-items`: Add items to a cart
- `POST /store/carts/:id/payment-sessions`: Initialize payment for a cart

#### Admin API

- `GET /admin/products`: Get all products
- `POST /admin/products`: Create a product
- `GET /admin/orders`: Get all orders
- `GET /admin/orders/:id`: Get a specific order

## Digital Product Configuration

To mark a product as a digital product:

1. Log in to the admin dashboard
2. Navigate to Products
3. Edit the desired product
4. In the "Metadata" section, add a key `is_digital` with the value `true`
5. Save the product

## Stripe Configuration

This backend uses Stripe for payment processing. The configuration is done in `medusa-config.ts` file. Important settings:

- Set your Stripe API key in the `.env` file
- Configure webhook settings to handle payment events
- Set up a webhook URL in your Stripe dashboard pointing to `http://your-domain/hooks/payment/stripe_stripe`

## Integration with Webhook Server

The backend interacts with a separate webhook server for digital product key management. This is handled through API calls when orders are completed.

## Troubleshooting

### Common Issues

- **Database connection errors**: Check your DATABASE_URL in the .env file
- **CORS errors**: Ensure your CORS settings in .env include all frontend domains
- **Stripe issues**: Verify your Stripe API keys and webhook configuration
