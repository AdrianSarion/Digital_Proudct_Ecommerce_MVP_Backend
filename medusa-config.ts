import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_SECRET_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
              capture: true,
              stripePubKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
              automatic_payment_methods: true,
              payment_method_types: ["card"],
              payment_method_options: {
                card: {
                  enabled_payments: ["card"],
                  preferred_networks: ["visa", "mastercard"],
                },
              },
              payment_intent_data: {
                capture_method: "manual",
              },
              billing_address_collection: "auto",
              shipping_address_collection: "auto",
              shipping_options: [
                {
                  id: "standard_shipping",
                  amount: 1000,
                  currency: "usd",
                  delivery_estimate: {
                    minimum: 7,
                    maximum: 14,
                    unit: "day",
                  },
                },
                
              ],
            },
          },
        ],
      },
    },
  ],
  plugins: [
    {
      resolve: "@rsc-labs/medusa-documents-v2",
      options: {}
    }
]
});
