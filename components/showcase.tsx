import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Showcase() {
    const photos = [
      {
        imageUrl: "https://i.imgur.com/XdEyFxn.jpeg",
        alt: "Gjovana's Villas",
        url: "https://gjovanasvillas.com/",
        title: "Gjovana's Villas",
        description: "Luxury villa rental platform"
      },
      {
        imageUrl: "https://i.imgur.com/gFKotKH.jpeg",
        alt: "Construct Concepts",
        url: "https://constructconcepts.com",
        title: "Construct Concepts",
        description: "Construction company website"
      },
      {
        imageUrl: "https://i.imgur.com/3uE1ACD.png",
        alt: "Scene Match social media",
        url: "https://sceneconnect.vercel.app/",
        title: "Scene Match",
        description: "Social media platform"
      },
      {
        imageUrl: "https://i.imgur.com/7ZderMm.png",
        alt: "Roaming Mix Bartender",
        url: "https://roamingmix.com",
        title: "Roaming Mix",
        description: "Mobile bartender services"
      },
      {
        imageUrl: "https://i.imgur.com/52NSKei.png",
        alt: "Hotel As",
        url: "https://www.hotelasbaksrrjoll.com/",
        title: "Hotel As",
        description: "Hotel booking platform"
      },
      {
        imageUrl: "https://i.imgur.com/sMVGy4K.png",
        alt: "PioneerUI",
        url: "https://pioneerui.com",
        title: "PioneerUI",
        description: "UI component library"
      },
      {
        imageUrl: "https://i.imgur.com/gLd4qDC.png",
        alt: "Internal Inventory system",
        url: "https://inventory-kzr2.onrender.com/",
        title: "Inventory System",
        description: "Internal inventory management"
      },
    ]
  
    return (
      <div className="w-full max-w-full overflow-x-hidden">
        {/* Mobile: Carousel/Slider */}
        <div className="block md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="flex-none w-72 snap-center"
              >
                <ProjectCard photo={photo} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {photos.map((photo, index) => (
            <ProjectCard key={index} photo={photo} />
          ))}
        </div>
      </div>
    )
}

function ProjectCard({ photo }: { photo: { imageUrl: string; alt: string; url: string; title: string; description: string } }) {
  return (
    <div className="group relative bg-white rounded-xl border-2 border-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(27,31,59,1)] hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <Image
          src={photo.imageUrl}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 288px, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#1B1F3B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            <ExternalLink className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">View Project</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#1B1F3B] text-lg mb-2 group-hover:text-primary transition-colors">
          {photo.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {photo.description}
        </p>
        <Link
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1B1F3B] hover:text-primary transition-colors"
        >
          View Live Site
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
  