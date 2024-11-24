# Commerce Next

A modern, full-featured e-commerce application built with Next.js 14, demonstrating enterprise-level architecture and best practices in React development. This project serves as both a practical example and a learning resource for building scalable e-commerce solutions.

## 🎯 Overview

This application implements core e-commerce functionalities with a focus on:

- Modern web development practices
- Type-safe development with TypeScript
- Responsive and accessible UI design
- Efficient state management patterns
- Comprehensive testing strategies

## 🚀 Tech Stack

### Core

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom components

### State Management & Data Fetching

- **Client State:** Zustand
- **Server State:** TanStack Query (React Query)
- **API Client:** Axios with custom interceptors

### Forms & Validation

- **Form Management:** React Hook Form
- **Schema Validation:** Zod
- **Authentication:** JWT with cookie-based storage

### UI/UX

- **Components:** Custom Tailwind components
- **Icons:** React Icons
- **Date Handling:** date-fns
- **Fonts:** Geist (Variable fonts)

### Testing & Quality

- **E2E Testing:** Playwright
- **Linting:** ESLint with Next.js config
- **Type Checking:** TypeScript strict mode

## ✨ Key Features

### Authentication & Security

- Secure JWT-based authentication flow
- Protected route middleware
- Persistent sessions with cookie storage
- Form validation with real-time feedback

### Product Management

- Responsive product grid layout
- Advanced product filtering (coming soon)
- Image gallery with lazy loading
- Detailed product views

### User Interaction

- Real-time comment system
- Star-based rating system
- Toast notifications for user feedback
- Loading states with skeleton screens

### Performance & UX

- Optimized image loading
- Responsive design for all devices
- Error boundary protection
- Accessibility compliance

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/commerce-next.git
cd commerce-next
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
# or
yarn install --legacy-peer-deps
# or
pnpm install --legacy-peer-deps
```

3. Environment setup:

```bash
# Copy the example env file
cp .env.example .env.local

# Add your environment variables
# Required variables:
# - API_URL=your_api_url
# - JWT_SECRET=your_jwt_secret
```

4. Start development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (auth)/         # Authentication routes
│   ├── (protected)/    # Protected routes
│   └── api/            # API routes
├── components/
│   ├── layout/         # Layout components
│   ├── products/       # Product-related components
│   └── ui/             # Reusable UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utilities and configurations
│   ├── api/           # API-related utilities
│   ├── utils/         # Helper functions
│   └── mocks/         # Mock data for development
├── schemas/            # Zod validation schemas
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug
```

### Test Coverage

- Authentication flows
- Product listing and details
- Comment system
- Error scenarios

## 🔒 Security

### Authentication Flow

1. User submits credentials
2. Server validates and returns JWT
3. Token stored in HTTP-only cookie
4. Middleware validates protected routes

### Default Test Credentials

- Username: `user`
- Password: `user123`

## 🚀 Deployment

### Vercel Deployment

1. Push to GitHub
2. Import in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Detailed deployment guides for other platforms coming soon.

## 📈 Performance Optimization

- Image optimization with Next.js Image
- Dynamic imports for code splitting
- Static page generation where applicable
- Efficient state management patterns

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE.md](LICENSE.md) for details

## 📫 Support

For support, email [your-email@example.com](mailto:your-email@example.com)

---

Built with ❤️ using Next.js and TypeScript
