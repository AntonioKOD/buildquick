"use client"

import { useEffect } from "react"
import { Download, FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import anime from 'animejs'

export default function ResumePage() {
  useEffect(() => {
    // Animate page elements
    anime({
      targets: ".resume-element",
      translateY: [30, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(100),
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-color-background">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-6">
        <Link href="/" className="flex items-center gap-2 resume-element">
          <ArrowLeft className="h-4 w-4 text-[#1B1F3B]" />
          <div className="text-xl font-bold text-[#1B1F3B] md:text-2xl">{"{codeWithToni}"}</div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="/Antonio Developer.pdf"
            download
            className="resume-element"
          >
            <Button
              className="h-9 rounded-md border-2 border-[#1B1F3B] bg-[#1B1F3B] px-3 text-xs font-bold text-white shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] md:h-10 md:px-6 md:text-sm md:shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] md:hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
              variant="default"
            >
              <Download className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 text-center resume-element">
          <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
            <FileText className="mr-2 inline h-3 w-3" />
            Resume
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold text-[#1B1F3B] md:text-5xl">
            Antonio Kodheli
          </h1>
          <div className="mx-auto mb-4 h-1 w-20 bg-[#1B1F3B] md:mb-6 md:w-24"></div>
          <p className="text-sm text-black/70 md:text-base">
            Full-Stack Web Developer | Boston, MA
          </p>
        </div>

        {/* PDF Viewer */}
        <div className="resume-element">
          <div className="relative rounded-xl border-2 border-[#1B1F3B] bg-white p-4 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] md:p-6">
            {/* Decorative elements */}
            <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-primary opacity-20 md:-left-4 md:-top-4 md:h-12 md:w-12"></div>
            <div className="absolute -right-2 bottom-2 h-8 w-8 rounded-full bg-secondary opacity-20 md:-right-4 md:bottom-4 md:h-16 md:w-16"></div>

            <div className="relative">
              <iframe
                src="/Antonio Developer.pdf"
                className="w-full h-[600px] md:h-[800px] lg:h-[900px] rounded-lg border-2 border-[#1B1F3B]"
                title="Antonio Kodheli Resume"
              />
            </div>

            {/* Download button below PDF */}
            <div className="mt-6 text-center">
              <a href="/Antonio Developer.pdf" download>
                <Button
                  className="h-12 rounded-md border-2 border-[#1B1F3B] bg-primary px-6 text-sm font-bold text-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)] md:px-8"
                  variant="default"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume PDF
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center resume-element">
          <p className="text-sm text-black/70 md:text-base">
            Questions?{" "}
            <Link
              href="mailto:antonio_kodheli@icloud.com"
              className="font-medium text-primary underline"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#1B1F3B] bg-background py-6 md:py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-[#1B1F3B] md:text-base">© {new Date().getFullYear()} Antonio Kodheli</p>
              <p className="text-xs text-[#444444] md:text-sm">Full-Stack Web Developer</p>
            </div>
            <Link href="/">
              <Button
                className="h-9 rounded-md border-2 border-[#1B1F3B] bg-white px-4 text-xs font-bold text-[#1B1F3B] shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] md:h-10 md:px-6 md:text-sm"
                variant="outline"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

