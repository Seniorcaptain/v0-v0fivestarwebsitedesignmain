# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Five Star Driving School** website built with Next.js 14 and deployed automatically from v0.app. The application is a modern, responsive website for a Kenyan driving school with multiple branches across Nairobi and Kiambu counties.

**Key Context**: This repository is automatically synced from v0.app deployments. Changes made directly to this repo may be overwritten by v0.app pushes.

## Development Commands

### Essential Commands
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
\`\`\`

### Development Workflow
- Use `npm run dev` to start the development server on http://localhost:3000
- The build process ignores ESLint and TypeScript errors (configured in next.config.mjs)
- Images are unoptimized for better deployment compatibility

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI Library**: Radix UI components with shadcn/ui
- **Styling**: Tailwind CSS with extensive custom animations
- **Icons**: Lucide React
- **PDF Generation**: jsPDF for booking confirmations
- **Maps**: React Leaflet for branch location mapping
- **Forms**: React Hook Form with Zod validation

### Project Structure
\`\`\`
app/
├── globals.css          # Global styles and CSS variables
├── layout.tsx          # Root layout with metadata and fonts
└── page.tsx            # Main homepage component

components/
├── ui/                 # shadcn/ui components (Button, Card, Dialog, etc.)
├── enhanced-booking-system.tsx    # Multi-step booking flow
├── interactive-course-cards.tsx   # Course selection and filtering
├── video-hero.tsx                 # Hero section with video
├── interactive-map.tsx            # Branch location mapping
└── [other-components].tsx

lib/
└── utils.ts            # Utility functions (cn for className merging)
\`\`\`

### Key Component Patterns

1. **Multi-step Forms**: The booking system uses step-by-step flows with state management
2. **Interactive Components**: Course cards, maps, and booking forms have rich interactivity
3. **PDF Generation**: Booking confirmations are generated as PDFs using jsPDF
4. **Mobile-First Design**: Responsive design with custom breakpoints (xs: 475px)
5. **Branch Data Management**: Hard-coded branch information with coordinates for mapping

### UI Component System

The app uses shadcn/ui components with these import patterns:
\`\`\`typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
\`\`\`

### Styling Architecture

- **Base**: Tailwind CSS with custom configuration
- **Colors**: CSS custom properties for theme colors (primary, secondary, etc.)
- **Animations**: Extensive custom keyframes and animations defined in tailwind.config.ts
- **Fonts**: Inter font family as primary typeface
- **Custom Animations**: fade-in, slide-in variants, gentle bounces and pulses

### Business Logic

**Core Features**:
1. **Course Management**: Multiple driving course types (A2/A3 Motorcycle, B1 Automatic, B2 Manual, etc.)
2. **Booking System**: Multi-step booking with PDF confirmations
3. **Branch Locations**: 13+ branches across Nairobi and Kiambu with interactive mapping
4. **Pricing**: All-inclusive fee structure with clear pricing display
5. **Contact Integration**: WhatsApp integration for customer communication

**Data Structures**:
- Courses include pricing, features, duration, and NTSA categories
- Branches include coordinates, phone numbers, services, and constituency data
- Booking data includes personal info, course selection, and scheduling

### Development Guidelines

1. **Component Organization**: Keep business components in `/components` and UI primitives in `/components/ui`
2. **State Management**: Use React useState for local state, no global state management currently
3. **Type Safety**: TypeScript is enabled but build errors are ignored for deployment flexibility
4. **Responsive Design**: Always implement mobile-first responsive patterns
5. **PDF Generation**: Use jsPDF for document generation with consistent branding
6. **Contact Integration**: WhatsApp links should use the format: `https://wa.me/254[phone]?text=[message]`

### Branch Data Management

When working with branch information:
- All branches have phone numbers, coordinates, and service offerings
- Use the existing branch data structure for consistency
- Counties are typed as "Nairobi" | "Kiambu" for type safety
- WhatsApp numbers include country code format (254...)

### Deployment Notes

- Built for Vercel deployment
- Images are unoptimized (configured in next.config.mjs)
- ESLint and TypeScript errors don't block builds
- Automatically synced with v0.app deployments

### Working with Forms

The booking system uses controlled components with validation:
- Personal information collection (name, phone, ID number)
- Course and branch selection
- Date and time slot booking
- PDF confirmation generation

### Common Tasks

**Adding a new course**:
1. Update the courses array in both `enhanced-booking-system.tsx` and `interactive-course-cards.tsx`
2. Include pricing, features, duration, and NTSA category information
3. Ensure mobile responsiveness of course cards

**Adding a new branch**:
1. Update branch arrays with coordinates, contact info, and services
2. Ensure WhatsApp integration follows existing patterns
3. Test map functionality with new coordinates

**Modifying the booking flow**:
1. Update the BookingData interface if adding fields
2. Maintain the multi-step flow pattern
3. Update PDF generation to include new fields
4. Test form validation and submission
