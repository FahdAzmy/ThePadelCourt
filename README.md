# ThePadelCourt

ThePadelCourt is a full-stack padel court booking platform. Players can browse courts, reserve available slots, view their reservations, cancel bookings, and continue to Stripe Checkout. Court owners can manage their own courts from an owner dashboard.

## Features

- User registration and login with JWT cookies
- Premium home page with featured court slider
- Courts page powered by database data
- Court detail and booking flow with live availability slots
- User profile with reservations, cancel booking, and checkout actions
- Owner dashboard for creating, editing, and deleting courts
- Image upload for court creation through Cloudinary
- Membership plans with Stripe test checkout
- Booking checkout with Stripe test checkout
- MongoDB-backed courts, users, and bookings

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Tailwind CSS
- Headless UI
- Formik and Yup
- Axios
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Cookie-based sessions
- Multer file uploads
- Cloudinary image storage
- Stripe Checkout through the Stripe HTTP API

## Project Structure

```text
ThePadelCourt/
  Backend/
    Controllers/
    middlewares/
    models/
    routes/
    index.js
    seed.js
  Frontend/
    public/
    src/
      components/
      Owner/
      pages/
      api/
    index.html
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB database connection string
- Cloudinary account for court image uploads
- Stripe test secret key for checkout flows

## Environment Variables

Create `Backend/.env`:

```env
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_CHECKOUT_CURRENCY=usd
```

Create `Frontend/.env`:

```env
VITE_APP_API_URL=http://localhost:4000/api
```

## Installation

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Running Locally

Start the backend:

```bash
cd Backend
npm start
```

Start the frontend:

```bash
cd Frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`

## Seed Courts

The backend includes a seed script that adds sample courts to MongoDB.

```bash
cd Backend
npm run seed
```

Run this after setting `MONGO_URL` in `Backend/.env`.

## Main Routes

### Frontend

- `/` - Home page
- `/courts` - Browse all courts
- `/court/:id` - Court booking page
- `/memberships` - Membership plans
- `/checkout/:planId` - Membership checkout redirect page
- `/profile` - User profile
- `/profile/reservations` - User bookings
- `/ownerpage` - Owner court dashboard
- `/login` - Login
- `/register` - Register

### Backend API

- `POST /api/signup`
- `POST /api/login`
- `GET /api/getuser`
- `GET /api/getcourts`
- `GET /api/court/:id`
- `POST /api/createbooking`
- `POST /api/cancelbooking/:bookingId`
- `POST /api/create-booking-checkout-session`
- `GET /api/membership-plans`
- `POST /api/create-membership-checkout-session`
- `GET /api/getcourtsofowner`
- `POST /api/createcourt`
- `PUT /api/updatecourt`
- `DELETE /api/deletecourt`

## Stripe Test Checkout

This project uses Stripe in test mode. Add a Stripe test secret key to `Backend/.env`:

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

Booking checkout is started from the user reservations page. Membership checkout is started from the memberships page.

## Owner Court Creation

Owner accounts can create courts from `/ownerpage`. Court creation requires:

- Court name
- Location
- Start hour
- End hour
- Price per hour
- Court image

Images are uploaded to Cloudinary, and court availability slots are generated automatically.

## Useful Commands

Backend:

```bash
npm start
npm run seed
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Notes

- The backend must be running before the frontend can load courts, profile data, bookings, or checkout sessions.
- The app uses cookies for authentication, so frontend and backend local URLs must be allowed by CORS.
- Stripe checkout requires Node.js 18 or newer because the backend uses the built-in `fetch` API.
- Cloudinary credentials are required to create courts with uploaded images.

## Contact

Project author: Fahd Azmy

Email: `azmyfahd66@gmail.com`
