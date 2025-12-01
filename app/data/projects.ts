/**
 * PROJECTS DATA FILE (app/data/projects.ts)
 * Contains all project data for the portfolio:
 * - Project type definitions
 * - Project interface
 * - Array of all projects (websites, graphics, videos)
 */

export type ProjectType = "website" | "graphic" | "video";

/**
 * PROJECT INTERFACE
 * Defines the structure of a project object
 */
export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  category: string;
  thumbnail: string; // Image URL or CSS gradient class
  description: string;
  year: string;
  
  // Website-specific fields
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  
  // Graphic-specific fields
  images?: string[]; // Array of image URLs
  tools?: string[];
  
  // Video-specific fields
  videoUrl?: string; // YouTube/Vimeo ID or URL
  duration?: string;
}

/**
 * PROJECTS ARRAY
 * All portfolio projects organized by type
 */
export const projects: Project[] = [
  // ========== WEBSITE PROJECTS ==========
  {
    id: "web-1",
    type: "website",
    title: "Currency Converter",
    category: "Web Application",
    thumbnail: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1000&auto=format&fit=crop",
    description: "A real-time currency conversion application with live exchange rates. Features intuitive UI, multiple currency support, and instant conversion calculations.",
    year: "2024",
    liveUrl: "https://currency-conversion-xi.vercel.app/",
    techStack: ["Next.js", "TypeScript", "API Integration", "Tailwind CSS"]
  },
  {
    id: "web-2",
    type: "website",
    title: "TechFlow Landing Page",
    category: "Landing Page",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    description: "A modern business landing page showcasing digital solutions. Features pricing tables, testimonials, feature sections, and a responsive design optimized for conversions.",
    year: "2024",
    liveUrl: "https://landingpage-practice.vercel.app/",
    techStack: ["Next.js", "React", "Tailwind CSS", "Responsive Design"]
  },
  {
    id: "web-3",
    type: "website",
    title: "Flower Shop E-commerce",
    category: "E-commerce",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e596e35?q=80&w=1000&auto=format&fit=crop",
    description: "A beautiful e-commerce platform for a flower shop. Complete shopping experience with product catalog, cart functionality, and seamless checkout process.",
    year: "2024",
    liveUrl: "https://flower-shop-ecommerce-red.vercel.app/",
    techStack: ["Next.js", "E-commerce", "State Management", "Tailwind CSS"]
  },
  {
    id: "web-4",
    type: "website",
    title: "Civic Classic Blog",
    category: "Blog Platform",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop",
    description: "A dedicated blog platform celebrating the classic Honda Civic. Features timeline, model galleries, specifications, and a rich content experience for automotive enthusiasts.",
    year: "2024",
    liveUrl: "https://civic-blog.vercel.app/",
    techStack: ["Next.js", "Content Management", "Blog System", "Tailwind CSS"]
  },
  {
    id: "web-5",
    type: "website",
    title: "Todo List App",
    category: "Productivity Tool",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
    description: "A clean and efficient todo list application. Manage tasks with an intuitive interface, featuring add, edit, delete, and completion tracking functionality.",
    year: "2024",
    liveUrl: "https://todo-list-mu-nine-39.vercel.app/",
    techStack: ["Next.js", "State Management", "Local Storage", "Tailwind CSS"]
  },

  // ========== GRAPHIC DESIGN PROJECTS ==========
  {
    id: "gfx-1",
    type: "graphic",
    title: "Brand Identity: Nexus",
    category: "Branding",
    thumbnail: "bg-gradient-to-br from-orange-400 to-rose-500",
    description: "Complete brand identity overhaul including logo design, typography system, and brand guidelines.",
    year: "2024",
    images: ["/placeholder-1.jpg", "/placeholder-2.jpg"],
    tools: ["Illustrator", "Photoshop", "Figma"]
  },
  {
    id: "gfx-2",
    type: "graphic",
    title: "Cyberpunk Poster Series",
    category: "Digital Art",
    thumbnail: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
    description: "A series of digital posters exploring futuristic themes and neon aesthetics.",
    year: "2023",
    images: ["/placeholder-3.jpg"],
    tools: ["Photoshop", "Blender"]
  },

  // ========== VIDEO PROJECTS ==========
  {
    id: "vid-1",
    type: "video",
    title: "Product Launch Commercial",
    category: "Commercial",
    thumbnail: "bg-gradient-to-br from-indigo-500 to-blue-600",
    description: "High-energy product launch video featuring 3D product renders and kinetic typography.",
    year: "2024",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    duration: "0:45",
    tools: ["After Effects", "Premiere Pro", "Cinema 4D"]
  },
  {
    id: "vid-2",
    type: "video",
    title: "Music Video Visualizer",
    category: "Motion Graphics",
    thumbnail: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
    description: "Audio-reactive visualizer created for an electronic music track.",
    year: "2023",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:20",
    tools: ["After Effects", "Trapcode Suite"]
  }
];
