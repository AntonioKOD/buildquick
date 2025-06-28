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
  const [isMobile, setIsMobile] = useState(false)

  // Enhanced mobile detection and debugging
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
      
      console.log('📱 Mobile Detection:', {
        userAgent: navigator.userAgent,
        windowWidth: window.innerWidth,
        isMobile: isMobileDevice,
        items: items.length,
        timestamp: new Date().toISOString()
      })
      
      return isMobileDevice
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
      isMobile,
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
      isMobile,
      timestamp: new Date().toISOString()
    })
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  // Enhanced mobile click/touch handler
  const handleProjectClick = (url: string, alt: string) => {
    console.log('🖱️ Project clicked:', { url, alt, isMobile })
    
    if (url) {
      // For mobile, use a more reliable method to open links
      if (isMobile) {
        // Stop animation temporarily for mobile clicks
        if (containerRef.current) {
          const animationState = containerRef.current.style.animationPlayState
          containerRef.current.style.animationPlayState = 'paused'
          
          setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer')
          }, 100)
          
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.animationPlayState = animationState || 'running'
            }
          }, 500)
        }
      } else {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const PhotoFrame = ({ item, index }: { item: PhotoItem, index: number }) => (
    <li
      className={cn(
        "relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] max-w-full shrink-0 transform transition-transform duration-300 cursor-pointer",
        // Improved mobile interactions
        isMobile 
          ? "active:scale-95 active:rotate-1" 
          : "hover:scale-105 hover:-rotate-2"
      )}
      key={`photo-${index}`}
      onClick={() => item.url && handleProjectClick(item.url, item.alt)}
      onTouchStart={() => {
        if (isMobile) {
          console.log('👆 Touch started on:', item.alt)
        }
      }}
      role={item.url ? "button" : undefined}
      tabIndex={item.url ? 0 : undefined}
      aria-label={item.url ? `View ${item.alt} project` : item.alt}
    >
      <PhotoContent 
        item={item} 
        index={index} 
        onError={(e) => handleImageError(index, e)} 
        onLoad={() => handleImageLoad(index)}
        hasError={imageErrors[index]} 
        isLoaded={imageLoaded[index]}
        isMobile={isMobile}
      />
    </li>
  )

  const PhotoContent = ({ item, index, onError, onLoad, hasError, isLoaded, isMobile }: { 
    item: PhotoItem, 
    index: number, 
    onError: (e?: React.SyntheticEvent<HTMLImageElement, Event>) => void,
    onLoad: () => void,
    hasError?: boolean,
    isLoaded?: boolean,
    isMobile?: boolean
  }) => {
    
    // Reduced timeout for mobile devices
    useEffect(() => {
      if (!hasError && !isLoaded) {
        const timeout = setTimeout(() => {
          console.warn(`⏰ Image loading timeout [${index}]: ${item.alt} (Mobile: ${isMobile})`)
          onError()
        }, isMobile ? 8000 : 10000) // Shorter timeout for mobile

        return () => clearTimeout(timeout)
      }
    }, [hasError, isLoaded, index, item.alt, onError, isMobile])

    // Clean image URL for mobile - remove problematic query parameters
    const getCleanImageUrl = (url: string) => {
      if (isMobile && url.includes('?')) {
        const baseUrl = url.split('?')[0]
        console.log(`🧹 Cleaned URL for mobile [${index}]:`, { original: url, cleaned: baseUrl })
        return baseUrl
      }
      return url
    }

    return (
      <>
        {/* Background layers - LOWER z-index */}
        <div className="absolute inset-0 bg-[#1B1F3B] rounded-lg transform rotate-3 z-[1]"></div>
        <div className="absolute inset-0 bg-primary rounded-lg transform -rotate-2 z-[2]"></div>
        
        {/* Main content container - HIGHER z-index for clicks */}
        <div className="relative z-[50] w-full h-full p-2 sm:p-3 bg-white rounded-lg border-2 border-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] overflow-hidden">
          {/* Decorative overlays - pointer-events-none to not interfere with clicks */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#1B1F3B_25%,transparent_25%,transparent_50%,#1B1F3B_50%,#1B1F3B_75%,transparent_75%,transparent)] bg-[length:6px_6px] sm:bg-[length:8px_8px] pointer-events-none z-[51]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_3px] sm:bg-[length:100%_4px] pointer-events-none z-[52]"></div>

          {/* Pixel corners - pointer-events-none */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B] pointer-events-none z-[53]"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B] pointer-events-none z-[53]"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B] pointer-events-none z-[53]"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B1F3B] pointer-events-none z-[53]"></div>

          {/* Image Container - HIGHEST z-index for content */}
          <div className="relative w-full h-full overflow-hidden rounded bg-gray-100 z-[54]">
            {hasError ? (
              // Professional fallback content when image fails to load
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1B1F3B] to-[#2A2F4F] text-white z-[55]">
                <div className="text-center p-3 sm:p-4">
                  <div className="mb-2 flex justify-center">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-white/20">
                      <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white/90">{item.alt}</div>
                  <div className="text-xs text-white/60 mt-1">Portfolio Project</div>
                  {isMobile && (
                    <div className="text-xs text-white/40 mt-1">Tap to view</div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Loading placeholder */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-[55]">
                    <div className="text-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-300 mx-auto mb-2">
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="text-xs text-gray-600">Loading...</div>
                    </div>
                  </div>
                )}
                
                {/* Main image */}
                <Image
                  src={getCleanImageUrl(item.imageUrl)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    isLoaded ? 'opacity-100 z-[56]' : 'opacity-0 z-[55]'
                  )}
                  onError={(e) => {
                    console.error(`📱 Image onError fired for [${index}] (Mobile: ${isMobile}):`, {
                      url: item.imageUrl,
                      cleanUrl: getCleanImageUrl(item.imageUrl),
                      alt: item.alt,
                      error: e.nativeEvent
                    })
                    onError(e)
                  }}
                  onLoad={() => {
                    console.log(`📱 Image onLoad fired for [${index}] (Mobile: ${isMobile}): ${item.alt}`)
                    onLoad()
                  }}
                  onLoadStart={() => {
                    console.log(`📱 Image loading started for [${index}] (Mobile: ${isMobile}): ${item.alt}`)
                  }}
                  loading={index < 3 ? "eager" : "lazy"}
                  unoptimized={isMobile} // Only unoptimized on mobile where needed
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />

                {/* Mobile touch indicator */}
                {isMobile && item.url && isLoaded && (
                  <div className="absolute bottom-2 right-2 bg-[#1B1F3B]/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-[57]">
                    Tap to view
                  </div>
                )}
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
          pauseOnHover && !isMobile && "hover:[animation-play-state:paused]", // Only pause on hover for desktop
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
