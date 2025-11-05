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

// PIXIESET GALLERY: https://ian51.pixieset.com/fivestardrivingschoolshoot/
// Instructions for adding images:
// 1. Download images from PIXIESet gallery
// 2. Place them in /public/images/gallery/{category}/
// 3. Add entry below with the image path
// 4. Update metadata as needed

export const GALLERY_IMAGES: GalleryImageConfig[] = [
  // TRAINING - ENGINE DEMONSTRATIONS & PRACTICAL SESSIONS
  {
    id: "training-engine-demo-1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0262.JPG-RwdPW8M4T2Whs6aqXMJ6HohjKeVuTu.jpeg",
    title: "Engine Mechanics Training",
    description: "Students and instructors gathered for practical engine compartment explanation and demonstration",
    category: "training",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 212,
    views: 1634,
    date: "2024-01-25",
    tags: ["training", "engine", "practical", "mechanics", "hands-on"],
  },
  {
    id: "training-engine-demo-2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0264.JPG-xXoqsSkv27es7i7BIFwiBchY4rR9KY.jpeg",
    title: "Hands-On Engine Training",
    description: "Instructors teaching vehicle maintenance and engine operation to attentive students",
    category: "training",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 189,
    views: 1456,
    date: "2024-01-25",
    tags: ["training", "hands-on", "engine", "practical", "education"],
  },
  {
    id: "training-session-interactive",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0263.JPG-ssCmTc1IIXfVK97M60xR5uI2GyLmc2.jpeg",
    title: "Interactive Training Session",
    description: "Group training session with students learning from experienced Five Star instructors",
    category: "training",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 198,
    views: 1512,
    date: "2024-01-25",
    tags: ["training", "group", "interactive", "hands-on", "learning"],
  },
  {
    id: "training-comprehensive-facility",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0261.JPG-EgmzqOlJX1SbbrG7IyJDS1RS1xZiNX.jpeg",
    title: "Complete Training Facility",
    description: "Aerial overview of the entire training ground with fleet and demonstration in progress",
    category: "training",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 223,
    views: 1723,
    date: "2024-01-25",
    tags: ["training", "facility", "aerial", "comprehensive", "fleet"],
  },
  {
    id: "training-engine-inspection-1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2015-sX7RJryNoeOj1BctzSfesX0OfePqx1.jpg",
    title: "Engine Compartment Inspection Training",
    description:
      "Instructors and trainees learning to inspect and understand vehicle engine systems during hands-on training session",
    category: "training",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 167,
    views: 1289,
    date: "2024-01-25",
    tags: ["training", "engine", "inspection", "practical", "maintenance"],
  },
  {
    id: "training-engine-inspection-2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2017-s5D4sIjL7tcruOy6CiqCHaOzy0wLTx.jpg",
    title: "Detailed Engine Checklist Training",
    description:
      "Trainer conducting comprehensive vehicle inspection checklist training with actual vehicle engine bay",
    category: "training",
    location: "Roysambu Main Facility",
    featured: false,
    likes: 134,
    views: 1045,
    date: "2024-01-25",
    tags: ["training", "inspection", "checklist", "maintenance", "practical"],
  },
  {
    id: "training-crash-demo",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1998-7mZ8TAI9voBfSAj2QXiiNaMTvFrgUb.jpg",
    title: "Crash Demonstration & Safety Training",
    description:
      "Students gathered around a crash demonstration vehicle learning about vehicle safety and impact zones",
    category: "training",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 156,
    views: 1234,
    date: "2024-01-25",
    tags: ["training", "safety", "crash-demo", "education", "awareness"],
  },
  {
    id: "training-driving-course",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2161-ahDNCaMCGSszFs6lwJfxuywLlFoujq.jpg",
    title: "Simulated Driving Course Training",
    description:
      "Interactive driving course mat with toy vehicles demonstrating road layouts and traffic patterns for theory students",
    category: "training",
    location: "Roysambu Main Facility",
    featured: false,
    likes: 98,
    views: 812,
    date: "2024-01-25",
    tags: ["training", "driving-course", "interactive", "theory", "simulation"],
  },

  // VEHICLES - FLEET SHOWCASE
  {
    id: "vehicles-fleet-aerial-1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0268.JPG-LI3pXMpgWg36Jr5HPP9Ti5WJ6TikX1.jpeg",
    title: "Complete Training Fleet Overview",
    description: "Aerial view of our entire Five Star Driving School fleet with 50+ well-maintained training vehicles",
    category: "vehicles",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 245,
    views: 1856,
    date: "2024-01-25",
    tags: ["fleet", "vehicles", "aerial", "training", "modern"],
  },
  {
    id: "vehicles-fleet-aerial-2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0267.JPG-E298hLbH6XQEcyOl9wC7OYlTk8H9Gc.jpeg",
    title: "Fleet Organization & Layout",
    description: "Perfect demonstration of our organized vehicle storage and maintenance facility",
    category: "vehicles",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 198,
    views: 1543,
    date: "2024-01-25",
    tags: ["fleet", "organization", "facility", "vehicles", "training"],
  },
  {
    id: "vehicles-trio-top-down-1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0258.JPG-M4oVaFEIwtCBhEPxWiE80tcsTAwxyj.jpeg",
    title: "Three Training Vehicles - Color Variety",
    description: "Showcase of our diverse vehicle fleet with manual transmission, automatic, and red training vehicles",
    category: "vehicles",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 167,
    views: 1289,
    date: "2024-01-25",
    tags: ["vehicles", "fleet", "training", "manual", "automatic"],
  },
  {
    id: "vehicles-trio-top-down-2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0257.JPG-1WP7gM1FwxvGOweJoUaEo6Gyk476Mv.jpeg",
    title: "Three Branded Training Vehicles",
    description: "Professional five star branded vehicles showing the range of our training fleet",
    category: "vehicles",
    location: "Roysambu Main Facility",
    featured: false,
    likes: 134,
    views: 1045,
    date: "2024-01-25",
    tags: ["vehicles", "branded", "training", "fleet"],
  },
  {
    id: "vehicles-trio-top-down-3",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DJI_0256.JPG-nQKSGSkBtW3rO3MRh4XAnQOIZIT0US.jpeg",
    title: "Vehicle Fleet Collection",
    description: "Beautiful aerial perspective of our diverse training vehicle collection",
    category: "vehicles",
    location: "Roysambu Main Facility",
    featured: false,
    likes: 123,
    views: 956,
    date: "2024-01-25",
    tags: ["vehicles", "fleet", "training", "collection"],
  },
  {
    id: "vehicles-demo-session",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1996-Fr78gQl0hAnJYbvnpERJm0xt1nuso4.jpg",
    title: "Vehicle Demonstration Session",
    description:
      "Instructor demonstrating vehicle features and mechanics to a group of attentive students in outdoor setting",
    category: "vehicles",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 145,
    views: 1098,
    date: "2024-01-25",
    tags: ["vehicles", "demonstration", "training", "fleet", "education"],
  },

  // FACILITIES - OFFICE & RECEPTION
  {
    id: "facilities-reception-area",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2245-lpBfWl7Pf4fjCuMSPBwkDg4vUZHw0G.jpg",
    title: "Modern Reception & Customer Service",
    description:
      "Professional staff assisting student at Five Star Driving School reception desk with modern facilities",
    category: "facilities",
    location: "Main Office",
    featured: true,
    likes: 112,
    views: 945,
    date: "2024-01-25",
    tags: ["facilities", "reception", "customer-service", "office", "modern"],
  },
  {
    id: "facilities-office-counter",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2176-OmVVZxUvuuRxHrOx0v0XRaoeVyB57o.jpg",
    title: "Office Counter & Registration",
    description: "Warm and professional office environment with staff assisting customers at the counter",
    category: "facilities",
    location: "Roysambu Branch",
    featured: false,
    likes: 89,
    views: 756,
    date: "2024-01-25",
    tags: ["facilities", "office", "registration", "counter", "service"],
  },

  // EVENTS & BRAND - SIGNAGE & BRANDING
  {
    id: "brand-signage",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2266-iYIIVKHuxthHExpFEymYlxZg8351lT.jpg",
    title: "Five Star Driving School Signage",
    description: "Official FIVE STAR DRIVING SCHOOL signage displaying brand identity and contact information",
    category: "events",
    location: "Street Front",
    featured: false,
    likes: 76,
    views: 634,
    date: "2024-01-25",
    tags: ["brand", "signage", "identification", "location"],
  },

  // TEAM - GROUP GATHERINGS
  {
    id: "team-group-photo-1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2083-UshTBUZ35q9WWKa5MFdBstH9rnX77n.jpg",
    title: "Team Building & Training Event",
    description: "Full team and students gathering for training event showcase and team building activities",
    category: "team",
    location: "Roysambu Main Facility",
    featured: true,
    likes: 189,
    views: 1467,
    date: "2024-01-25",
    tags: ["team", "group", "event", "training", "community"],
  },
  {
    id: "team-group-photo-2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2082-JpKcCjmGHHZHMuN2Ds8LG3i5AeVHy3.jpg",
    title: "Extended Team Group Photo",
    description: "Large group photo of FIVE STAR team members, instructors and participants at main facility",
    category: "team",
    location: "Roysambu Main Facility",
    featured: false,
    likes: 145,
    views: 1123,
    date: "2024-01-25",
    tags: ["team", "group-photo", "family", "instructors", "staff"],
  },
]
