"use client"

import { useEffect, useState, useRef } from "react"
import { Download, FileText, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import anime from 'animejs'

export default function ResumePage() {
  const [pdfError, setPdfError] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  // In Next.js, files in public folder are served from root, not /public/
  // Use URL-encoded path for proper browser handling
  // Add PDF viewer parameters to show single page view
  const pdfPath = "/Antonio Developer.pdf"
  const pdfPathEncoded = encodeURI("/Antonio Developer.pdf") + "#view=FitH&page=1"

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

    // Check if PDF loads successfully
    const checkPdfLoad = () => {
      fetch(pdfPathEncoded)
        .then((response) => {
          if (!response.ok) {
            setPdfError(true)
            setPdfLoading(false)
          } else {
            setPdfLoading(false)
            // Set a timeout to show error if iframe doesn't load
            setTimeout(() => {
              if (iframeRef.current) {
                try {
                  const iframe = iframeRef.current
                  // If still loading after 5 seconds, likely an error
                  if (iframe.contentDocument?.readyState !== 'complete') {
                    setPdfError(true)
                  }
                } catch {
                  // Cross-origin error, PDF might still be loading
                }
              }
            }, 5000)
          }
        })
        .catch(() => {
          setPdfError(true)
          setPdfLoading(false)
        })
    }

    checkPdfLoad()
  }, [pdfPathEncoded])

  return (
    <div className="flex min-h-screen flex-col bg-color-background overflow-x-hidden">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-6 w-full max-w-full">
        <Link href="/" className="flex items-center gap-2 resume-element">
          <ArrowLeft className="h-4 w-4 text-[#1B1F3B]" />
          <div className="text-xl font-bold text-[#1B1F3B] md:text-2xl">{"{codeWithToni}"}</div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={pdfPath}
            download="Antonio-Kodheli-Resume.pdf"
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
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12 w-full max-w-full">
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
              {pdfError ? (
                <div className="flex flex-col items-center justify-center h-[600px] md:h-[800px] lg:h-[900px] rounded-lg border-2 border-[#1B1F3B] bg-gray-50 p-8">
                  <AlertCircle className="h-12 w-12 text-[#1B1F3B] mb-4" />
                  <h2 className="text-xl font-bold text-[#1B1F3B] mb-2">PDF Not Found</h2>
                  <p className="text-sm text-black/70 mb-2 text-center max-w-md">
                    The resume PDF file is not available at <code className="bg-gray-200 px-2 py-1 rounded text-xs">{pdfPath}</code>
                  </p>
                  <p className="text-xs text-black/60 mb-4 text-center max-w-md">
                    Please ensure &quot;Antonio Developer.pdf&quot; is placed in the <code className="bg-gray-200 px-2 py-1 rounded text-xs">public</code> folder.
                  </p>
                  <a href={pdfPath} download="Antonio-Kodheli-Resume.pdf">
                    <Button
                      className="h-10 rounded-md border-2 border-[#1B1F3B] bg-primary px-6 text-sm font-bold text-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
                      variant="default"
                    >
                      Try Downloading PDF
                    </Button>
                  </a>
                </div>
              ) : (
                <>
                  {pdfLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg z-10">
                      <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1B1F3B] border-r-transparent mb-2"></div>
                        <p className="text-sm text-[#1B1F3B]">Loading PDF...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    src={pdfPathEncoded}
                    className="w-full h-[600px] md:h-[800px] lg:h-[900px] rounded-lg border-2 border-[#1B1F3B]"
                    title="Antonio Kodheli Resume"
                    onLoad={() => {
                      setPdfLoading(false)
                      // Additional check after load
                      setTimeout(() => {
                        if (iframeRef.current) {
                          try {
                            const iframe = iframeRef.current
                            const doc = iframe.contentDocument || iframe.contentWindow?.document
                            if (!doc || doc.body.innerHTML === '') {
                              // If document is empty, might be an error
                              setPdfError(true)
                            }
                          } catch {
                            // Cross-origin - can't check, assume it's loading
                          }
                        }
                      }, 1000)
                    }}
                    onError={() => {
                      setPdfError(true)
                      setPdfLoading(false)
                    }}
                  />
                </>
              )}
            </div>

            {/* Download button below PDF */}
            <div className="mt-6 text-center">
              <a href={pdfPath} download="Antonio-Kodheli-Resume.pdf">
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

