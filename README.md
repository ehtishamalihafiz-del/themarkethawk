# Pakistan COD Reselling/Dropshipping Store

React + Tailwind + Supabase + Netlify project for Markaz-style COD reselling.

## Setup
1. Install Node.js.
2. Open this folder in VS Code.
3. Run: `npm install`
4. Create `.env` from `.env.example` and add keys.
5. In Supabase SQL editor, run `supabase-schema.sql`.
6. In Supabase Authentication, create your admin email/password.
7. Run: `npm run dev`
8. Deploy to Netlify: build command `npm run build`, publish directory `dist`.

## EmailJS Template Variables
Use these variables in EmailJS template:
`to_email`, `customer_name`, `phone`, `whatsapp`, `city`, `address`, `items`, `total_amount`, `note`, `order_id`, `status`.

## Admin
Visit `/admin/login` and login using your Supabase Auth admin account.
