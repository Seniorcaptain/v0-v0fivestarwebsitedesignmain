export interface GalleryImageConfig {
  id: string
  src: string
  title: string
  description: string
  category: "training" | "vehicles" | "facilities" | "events" | "team"
  location?: string
  featured?: boolean
  likes?: number
  views?: number
  date?: string
  tags?: string[]
}

// GALLERY CONFIGURATION - READY FOR NEW IMAGES
// All images have been deleted. Follow the IMAGE_UPLOAD_MANAGEMENT_GUIDE.md for adding new images.
// 
// To add images:
// 1. Upload your new images to /public/images/
// 2. Add entries below with proper metadata
// 3. Organize by category: training, vehicles, facilities, events, team
// 4. Run performance tests after adding images

export const GALLERY_IMAGES: GalleryImageConfig[] = [
  {
    id: "vehicles-fleet-branding-duo",
    src: "/images/fleet-duo-branding.jpeg",
    title: "Five Star Fleet Branding Showcase",
    description:
      "Two branded Five Star Driving School vehicles - blue and white - parked face-to-face showcasing complete vehicle livery and professional branding design with L-plates and caution signage",
    category: "vehicles",
    location: "Parking Facility",
    featured: true,
    likes: 245,
    views: 1892,
    date: "2024-03-15",
    tags: ["fleet", "branding", "vehicles", "professional", "livery", "showcase"],
  },
  {
    id: "vehicles-mixed-fleet-lineup",
    src: "/images/fleet-mixed-lineup.jpeg",
    title: "Diverse Training Fleet Lineup",
    description:
      "Impressive lineup showing the full diversity of Five Star training vehicles including vans, trucks, and sedans with custom orange hexagonal branding and professional signage",
    category: "vehicles",
    location: "Parking Area",
    featured: true,
    likes: 312,
    views: 2234,
    date: "2024-03-15",
    tags: ["fleet", "vehicles", "diverse", "lineup", "training", "branded"],
  },
  {
    id: "vehicles-interior-dashboard",
    src: "/images/vehicle-interior.jpeg",
    title: "Modern Vehicle Interior",
    description: "Close-up of training vehicle dashboard showing modern controls, entertainment system, and comfortable seating with air freshener detail",
    category: "vehicles",
    location: "Training Vehicle",
    featured: false,
    likes: 156,
    views: 1123,
    date: "2024-03-15",
    tags: ["interior", "dashboard", "modern", "comfort", "controls"],
  },
  {
    id: "vehicles-three-car-formation",
    src: "/images/three-vehicles-lineup.jpeg",
    title: "Three Vehicle Formation",
    description:
      "Professional lineup of three Five Star training vehicles - blue and white sedans - with caution student driver signs and L-plates clearly visible",
    category: "vehicles",
    location: "Training Ground",
    featured: true,
    likes: 267,
    views: 1945,
    date: "2024-03-15",
    tags: ["fleet", "formation", "three-vehicles", "professional", "training"],
  },
  {
    id: "vehicles-branding-detail",
    src: "/images/branding-close-up.jpeg",
    title: "Branding Detail Close-Up",
    description:
      "Detailed close-up of Five Star Driving School branding logo and design elements on vehicle door with fleet vehicles visible in background",
    category: "vehicles",
    location: "Parking Facility",
    featured: true,
    likes: 289,
    views: 2067,
    date: "2024-03-15",
    tags: ["branding", "logo", "detail", "close-up", "design"],
  },
  {
    id: "vehicles-full-fleet-row",
    src: "/images/fleet-long-lineup.jpeg",
    title: "Complete Fleet Row Showcase",
    description:
      "Impressive long-line formation of multiple Five Star training vehicles parked in perfect row showing fleet scale and organization at main facility",
    category: "vehicles",
    location: "Main Facility",
    featured: true,
    likes: 334,
    views: 2456,
    date: "2024-03-15",
    tags: ["fleet", "lineup", "complete", "impressive", "organized"],
  },
  {
    id: "vehicles-vans-duo",
    src: "/images/vans-branding-duo.jpg",
    title: "Branded Vans Double-Up",
    description:
      "Two white and blue Toyota Hiace vans with distinctive orange hexagonal branding parked front-to-back in natural outdoor setting showcasing commercial vehicle training",
    category: "vehicles",
    location: "Training Ground",
    featured: true,
    likes: 198,
    views: 1567,
    date: "2024-03-15",
    tags: ["vans", "hiace", "commercial", "branding", "duo"],
  },
  {
    id: "vehicles-motion-action",
    src: "/images/motion-action-shot.jpeg",
    title: "Vehicle in Motion",
    description:
      "Dynamic black and white motion photography of Five Star branded training vehicle in action demonstrating real-world driving situations",
    category: "vehicles",
    location: "Road",
    featured: true,
    likes: 223,
    views: 1734,
    date: "2024-03-15",
    tags: ["motion", "action", "dynamic", "photography", "driving"],
  },
  {
    id: "vehicles-blue-detail",
    src: "/images/blue-vehicle-detail.jpeg",
    title: "Blue Vehicle Detail & Signage",
    description:
      "Detailed view of blue Five Star training vehicle with prominent branding, caution student driver sign on roof, and L-plates showcasing complete livery design",
    category: "vehicles",
    location: "Parking Area",
    featured: true,
    likes: 245,
    views: 1856,
    date: "2024-03-15",
    tags: ["blue-vehicle", "detail", "signage", "professional", "livery"],
  },
  {
    id: "vehicles-stadium-venue",
    src: "/images/stadium-venue-trio.jpg",
    title: "Stadium Venue Fleet Display",
    description:
      "Three Five Star training vehicles displayed at modern stadium venue with contemporary architecture backdrop showing fleet variety and branding impact",
    category: "vehicles",
    location: "Stadium Venue",
    featured: true,
    likes: 267,
    views: 2012,
    date: "2024-03-15",
    tags: ["fleet", "venue", "stadium", "display", "trio"],
  },
  {
    id: "vehicles-impressive-fleet",
    src: "/images/full-fleet-showcase.jpeg",
    title: "Full Fleet Impressive Showcase",
    description:
      "Stunning lineup of 10+ Five Star training vehicles in perfect row demonstrating the scale, diversity, and professional organization of the complete training fleet",
    category: "vehicles",
    location: "Main Facility",
    featured: true,
    likes: 356,
    views: 2678,
    date: "2024-03-15",
    tags: ["fleet", "showcase", "impressive", "complete", "scale", "lineup"],
  },
]
