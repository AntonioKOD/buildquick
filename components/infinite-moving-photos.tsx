"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface PhotoItem {
  imageUrl: string
  alt: string
  url?: string
}

export const InfiniteMovingPhotos = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: PhotoItem[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({})

  // Add debugging for mobile
  useEffect(() => {
    console.log('InfiniteMovingPhotos mounted with items:', items.length)
    console.log('User agent:', navigator.userAgent)
    console.log('Is mobile:', /Mobile|Android|iPhone|iPad/.test(navigator.userAgent))
  }, [items])

  const addAnimation = React.useCallback(() => {
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
  }, [])

  useEffect(() => {
    addAnimation()
  }, [addAnimation])

  const [start, setStart] = useState(false)

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

  const handleImageError = (index: number, event?: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const item = items[index]
    console.error(`❌ Image failed to load [${index}]:`, {
      url: item?.imageUrl,
      alt: item?.alt,
      error: event,
      timestamp: new Date().toISOString()
    })
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  const handleImageLoad = (index: number) => {
    const item = items[index]
    console.log(`✅ Image loaded successfully [${index}]:`, {
      url: item?.imageUrl,
      alt: item?.alt,
      timestamp: new Date().toISOString()
    })
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  const PhotoFrame = ({ item, index }: { item: PhotoItem, index: number }) => (
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
          <PhotoContent 
            item={item} 
            index={index} 
            onError={(e) => handleImageError(index, e)} 
            onLoad={() => handleImageLoad(index)}
            hasError={imageErrors[index]} 
            isLoaded={imageLoaded[index]}
          />
        </a>
      ) : (
        <PhotoContent 
          item={item} 
          index={index} 
          onError={(e) => handleImageError(index, e)} 
          onLoad={() => handleImageLoad(index)}
          hasError={imageErrors[index]} 
          isLoaded={imageLoaded[index]}
        />
      )}
    </li>
  )

  const PhotoContent = ({ item, index, onError, onLoad, hasError, isLoaded }: { 
    item: PhotoItem, 
    index: number, 
    onError: (e?: React.SyntheticEvent<HTMLImageElement, Event>) => void,
    onLoad: () => void,
    hasError?: boolean,
    isLoaded?: boolean
  }) => {
    
    // Add timeout for images that take too long to load on mobile
    useEffect(() => {
      if (!hasError && !isLoaded) {
        const timeout = setTimeout(() => {
          console.warn(`⏰ Image loading timeout [${index}]: ${item.alt}`)
          onError()
        }, 10000) // 10 second timeout for mobile

        return () => clearTimeout(timeout)
      }
    }, [hasError, isLoaded, index, item.alt, onError])

    return (
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
              // Professional fallback content when image fails to load
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1B1F3B] to-[#2A2F4F] text-white">
                <div className="text-center p-3 sm:p-4">
                  <div className="mb-2 flex justify-center">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-white/20">
                      <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white/90">{item.alt}</div>
                  <div className="text-xs text-white/60 mt-1">Portfolio Project</div>
                </div>
              </div>
            ) : (
              <>
                {/* Loading placeholder - always show until image loads */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-20">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-300">
                      <ImageIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                )}
                
                {/* Main image - always render but control visibility */}
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
                  className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100 z-30' : 'opacity-0 z-10'}`}
                  onError={(e) => {
                    console.error(`Image onError fired for [${index}]:`, {
                      url: item.imageUrl,
                      alt: item.alt,
                      error: e
                    })
                    onError(e)
                  }}
                  onLoad={() => {
                    console.log(`Image onLoad fired for [${index}]: ${item.alt}`)
                    onLoad()
                  }}
                  onLoadStart={() => {
                    console.log(`Image loading started for [${index}]: ${item.alt}`)
                  }}
                  loading={index < 3 ? "eager" : "lazy"}
                  unoptimized={true}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </>
            )}
          </div>
        </div>
      </>
    )
  }

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
