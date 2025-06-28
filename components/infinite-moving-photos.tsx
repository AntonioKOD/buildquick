"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from "next/image"

export const InfiniteMovingPhotos = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    imageUrl: string
    alt: string
    url?: string // Add optional url property
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    addAnimation()
  }, [])

  const [start, setStart] = useState(false)

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  const PhotoFrame = ({ item, index }: { item: any, index: number }) => (
    <li
      className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] max-w-full shrink-0 transform transition-transform duration-300 hover:scale-105 hover:-rotate-2 cursor-pointer"
      key={`photo-${index}`}
    >
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          aria-label={`View ${item.alt}`}
        >
          <PhotoContent item={item} index={index} onError={() => handleImageError(index)} hasError={imageErrors[index]} />
        </a>
      ) : (
        <PhotoContent item={item} index={index} onError={() => handleImageError(index)} hasError={imageErrors[index]} />
      )}
    </li>
  )

  const PhotoContent = ({ item, index, onError, hasError }: { 
    item: any, 
    index: number, 
    onError: () => void,
    hasError?: boolean 
  }) => (
    <>
      <div className="absolute inset-0 bg-[#1B1F3B] rounded-lg transform rotate-3 z-0"></div>
      <div className="absolute inset-0 bg-primary rounded-lg transform -rotate-2 z-10"></div>
      <div className="relative z-20 w-full h-full p-2 sm:p-3 bg-white rounded-lg border-2 border-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] overflow-hidden">
        {/* Retro pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#1B1F3B_25%,transparent_25%,transparent_50%,#1B1F3B_50%,#1B1F3B_75%,transparent_75%,transparent)] bg-[length:6px_6px] sm:bg-[length:8px_8px] pointer-events-none"></div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_3px] sm:bg-[length:100%_4px] pointer-events-none"></div>

        {/* Pixel corners */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B]"></div>
        <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B]"></div>
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B]"></div>
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B]"></div>

        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden rounded bg-gray-100">
          {hasError ? (
            // Fallback content when image fails to load
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🖼️</div>
                <div className="text-xs text-gray-600 font-medium">{item.alt}</div>
              </div>
            </div>
          ) : (
            <Image
              src={item.imageUrl}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
              className="object-cover"
              onError={onError}
              loading={index < 3 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          )}
        </div>
      </div>
    </>
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-4 md:gap-6 md:py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <PhotoFrame key={`photo-${idx}`} item={item} index={idx} />
        ))}
      </ul>
    </div>
  )
}

// Add this to your globals.css file if not already present
// @keyframes scroll {
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(calc(-50% - 0.75rem));
//   }
// }
// .animate-scroll {
//   animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
// }
