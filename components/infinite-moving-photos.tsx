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

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[280px] h-[280px] max-w-full shrink-0 transform transition-transform duration-300 hover:scale-105 hover:-rotate-2 cursor-pointer"
            key={`photo-${idx}`}
          >
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={`View ${item.alt}`}
              >
                <div className="absolute inset-0 bg-[#1B1F3B] rounded-lg transform rotate-3 z-0"></div>
                <div className="absolute inset-0 bg-primary rounded-lg transform -rotate-2 z-10"></div>
                <div className="relative z-20 w-full h-full p-3 bg-white rounded-lg border-2 border-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] overflow-hidden">
                  {/* Retro pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#1B1F3B_25%,transparent_25%,transparent_50%,#1B1F3B_50%,#1B1F3B_75%,transparent_75%,transparent)] bg-[length:8px_8px] pointer-events-none"></div>

                  {/* Scan lines effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none"></div>

                  {/* Pixel corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#1B1F3B]"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#1B1F3B]"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#1B1F3B]"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#1B1F3B]"></div>

                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden rounded">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </a>
            ) : (
              <>
                <div className="absolute inset-0 bg-[#1B1F3B] rounded-lg transform rotate-3 z-0"></div>
                <div className="absolute inset-0 bg-primary rounded-lg transform -rotate-2 z-10"></div>
                <div className="relative z-20 w-full h-full p-3 bg-white rounded-lg border-2 border-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] overflow-hidden">
                  {/* Retro pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#1B1F3B_25%,transparent_25%,transparent_50%,#1B1F3B_50%,#1B1F3B_75%,transparent_75%,transparent)] bg-[length:8px_8px] pointer-events-none"></div>

                  {/* Scan lines effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none"></div>

                  {/* Pixel corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#1B1F3B]"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#1B1F3B]"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#1B1F3B]"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#1B1F3B]"></div>

                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden rounded">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </>
            )}
          </li>
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
