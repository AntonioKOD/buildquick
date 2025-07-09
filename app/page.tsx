/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Mail, Code, Globe, Database, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import anime from 'animejs';
import Image from "next/image";
import lightning from "@/public/lightning.svg"
import pricing from "@/public/pricing.svg"
import rocket from "@/public/rocket.svg"
import top from "@/public/top.svg"
import scalable from "@/public/scalable.svg"
import Link from "next/link";
import contentful from "@/public/contentful.svg"
import next from '@/public/nextjs.svg'
import pacific from '@/public/pacific.svg'
import rolandmusic from '@/public/rolandmusic.svg'
import mongo from '@/public/mongo.svg'
import countrygarden from '@/public/countrygarden.svg'
import Showcase from "@/components/showcase";


export default function Home() {
  const heroRef = useRef(null)
  const logoGridRef = useRef(null)
  const servicesRef = useRef(null)
  const skillsRef = useRef(null)
  const portfolioRef = useRef(null)
  const faqRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    // Hero animation
    anime({
      targets: ".hero-element",
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: anime.stagger(150, { start: 300 }),
    })

    // Animate geometric shapes
    anime({
      targets: ".geo-shape",
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutElastic(1, .5)",
      duration: 1500,
      delay: anime.stagger(100, { start: 500 }),
    })

    // Setup intersection observers for other sections
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const animateServices = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".service-card",
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(150),
          })
          servicesObserver.unobserve(entry.target)
        }
      })
    }

    const animateSkills = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".skill-card",
            scale: [0.9, 1],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(100),
          })
          skillsObserver.unobserve(entry.target)
        }
      })
    }

    const animatePortfolio = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".portfolio-section-wrapper",
            translateY: [50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
          })
          portfolioObserver.unobserve(entry.target)
        }
      })
    }

    const animateFaq = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".faq-item",
            translateX: [-50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(100),
          })
          faqObserver.unobserve(entry.target)
        }
      })
    }

    const animateContact = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".contact-section-wrapper",
            translateY: [50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
          })
          contactObserver.unobserve(entry.target)
        }
      })
    }

    const servicesObserver = new IntersectionObserver(animateServices, observerOptions)
    const skillsObserver = new IntersectionObserver(animateSkills, observerOptions)
    const portfolioObserver = new IntersectionObserver(animatePortfolio, observerOptions)
    const faqObserver = new IntersectionObserver(animateFaq, observerOptions)
    const contactObserver = new IntersectionObserver(animateContact, observerOptions)

    if (servicesRef.current) servicesObserver.observe(servicesRef.current)
    if (skillsRef.current) skillsObserver.observe(skillsRef.current)
    if (portfolioRef.current) portfolioObserver.observe(portfolioRef.current)
    if (faqRef.current) faqObserver.observe(faqRef.current)
    if (contactRef.current) contactObserver.observe(contactRef.current)

    // Button hover animations
    const buttons = document.querySelectorAll(".animate-button")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        anime({
          targets: button,
          scale: 1.05,
          duration: 300,
          easing: "easeOutElastic(1, .5)",
        })
      })

      button.addEventListener("mouseleave", () => {
        anime({
          targets: button,
          scale: 1,
          duration: 300,
          easing: "easeOutElastic(1, .5)",
        })
      })
    })

    return () => {
      const services = servicesRef.current
      const skills = skillsRef.current
      const portfolio = portfolioRef.current
      const faq = faqRef.current
      const contact = contactRef.current
      
      if (services) servicesObserver.unobserve(services)
      if (skills) skillsObserver.unobserve(skills)
      if (portfolio) portfolioObserver.unobserve(portfolio)
      if (faq) faqObserver.unobserve(faq)
      if (contact) contactObserver.unobserve(contact)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-color-background overflow-x-hidden">
      <header className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-6 w-full max-w-full">
        <div className="flex items-center gap-2 hero-element">
          <div className="text-xl font-bold text-[#1B1F3B] md:text-2xl">{"{codeWithToni}"}</div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href='mailto:antonio_kodheli@icloud.com'>
          <Button
            className="h-9 rounded-md border-2 border-[#1B1F3B] bg-[#1B1F3B] px-3 text-xs font-bold text-white shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] animate-button hero-element md:h-10 md:px-6 md:text-sm md:shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] md:hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
            variant="default"
          >
            <span className="hidden sm:inline">Contact Me</span>
            <span className="sm:hidden">Contact</span>
          </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto px-4 py-12 md:px-6 md:py-24 w-full max-w-full">
          <div className="relative w-full max-w-full">
            <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-primary geo-shape md:-left-8 md:-top-8 md:h-32 md:w-32"></div>
            <div className="absolute -right-2 bottom-2 h-10 w-10 rounded-full bg-secondary geo-shape md:-right-8 md:bottom-8 md:h-40 md:w-40"></div>
            <div className="relative grid gap-8 rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] md:grid-cols-2 md:items-center md:p-12 md:gap-12 md:shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] w-full max-w-full">
              <div className="w-full max-w-full">
                <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B] hero-element">
                  Full-Stack Web Developer
                </div>
                <h1 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-[#1B1F3B] hero-element md:text-5xl lg:text-6xl md:mb-6">
                  Building Modern
                  <br />
                  <span className="italic">Web Applications</span>
                  <br />
                  <span className="text-primary">With Cutting-Edge Tech</span>
                </h1>
                <div className="mb-3 h-1 w-20 bg-[#1B1F3B] hero-element md:mb-4 md:w-24"></div>
                <p className="mb-8 text-sm text-black/70 hero-element md:text-lg">
                  Specialized in Next.js with PayloadCMS for rapid development and the MERN stack for full-stack web applications. Based in Boston, MA.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full">
                  <Link href='#portfolio' className="w-full sm:w-auto">
                    <Button
                      className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-primary px-6 text-sm font-bold text-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)] animate-button hero-element sm:px-8"
                      variant="default"
                    >
                      View My Work
                    </Button>
                  </Link>
                  <Link href='#contact' className="w-full sm:w-auto">
                    <Button
                      className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-white px-6 text-sm font-bold text-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)] animate-button hero-element sm:px-8"
                      variant="outline"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hero-element w-full max-w-full">
                <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-gradient-to-br from-secondary to-[#1B1F3B] p-4 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] md:p-6 md:shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] w-full max-w-full">
                  <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-secondary opacity-50 blur-xl md:-right-12 md:-top-12 md:h-24 md:w-24"></div>
                  <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-primary opacity-50 blur-xl md:-bottom-12 md:-left-12 md:h-24 md:w-24"></div>
                  <div className="relative z-10 text-center text-white">
                    <div className="mb-4 flex justify-center">
                      <div className="text-center">
                        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-black bg-yellow-400">
                          <div className="flex h-full w-full items-center justify-center text-4xl"><Image src={rocket} alt='rocket' width={120} height={120}/></div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-2 inline-block rounded-md bg-black px-4 py-1 text-sm font-bold text-white">
                      Available for Projects
                    </div>
                    
                    <h2 className="mb-2 text-3xl font-bold">Let&apos;s Create</h2>
                    <p className="mb-6">Building innovative web solutions</p>
                    <Link href="#contact">
                    <Button
                      className="h-10 w-full rounded-md border-2 border-black bg-white px-6 text-sm font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-button"
                      variant="outline"
                    >
                      Start a Project
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Highlight Section */}
        <section className="border-y-2 border-[#1B1F3B] bg-gradient-to-r from-[#F4C542] to-[#F8D980] py-12 md:py-24 w-full overflow-x-hidden">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-full">
            <div className="relative w-full max-w-full">
              <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-[#1B1F3B] opacity-20 md:-left-8 md:-top-8 md:h-24 md:w-24"></div>
              <div className="absolute -right-2 bottom-2 h-8 w-8 rounded-full bg-white opacity-30 md:-right-8 md:bottom-8 md:h-32 md:w-32"></div>
              
              <div className="relative text-center w-full max-w-full">
                <div className="mb-3 inline-block rounded-md bg-[#1B1F3B] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 md:mb-4 md:px-4 md:py-2 md:text-sm">
                  <Code className="h-3 w-3 md:h-4 md:w-4" />
                  Featured Work
                </div>
                <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-[#1B1F3B] md:text-5xl md:mb-6">
                  Crafting <span className="italic">modern</span>
                  <br />
                  <span className="underline decoration-2 decoration-[#1B1F3B] md:decoration-4">digital experiences</span>
                </h2>
                <div className="mx-auto mb-6 h-1 w-20 bg-[#1B1F3B] md:mb-8 md:w-24"></div>
                
                <div className="mx-auto max-w-3xl w-full">
                  <p className="mb-6 text-base text-[#1B1F3B]/80 md:text-lg md:mb-8">
                    Delivering <span className="font-bold text-[#1B1F3B]">high-performance web applications</span> built with modern technologies and best practices.
                  </p>

                  <div className="mb-6 grid gap-4 md:grid-cols-3 md:gap-6 md:mb-8">
                    <div className="rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)]">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#1B1F3B] text-white">
                        <Zap className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-bold text-[#1B1F3B]">Modern Stack</h3>
                      <p className="text-sm text-[#444444]">Next.js, React, and cutting-edge technologies</p>
                    </div>
                    
                    <div className="rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)]">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#1B1F3B] text-white">
                        <Globe className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-bold text-[#1B1F3B]">Full Stack</h3>
                      <p className="text-sm text-[#444444]">End-to-end solutions from frontend to backend</p>
                    </div>
                    
                    <div className="rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)]">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-[#1B1F3B] text-white">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-bold text-[#1B1F3B]">Performance</h3>
                      <p className="text-sm text-[#444444]">Optimized for speed and user experience</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-[#1B1F3B] bg-[#1B1F3B] p-6 text-white">
                    <p className="mb-4 text-lg font-medium flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Let&apos;s build something amazing together
                    </p>
                    <Link href="#contact">
                      <Button
                        className="h-10 w-full rounded-md border-2 border-white bg-transparent px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] animate-button"
                        variant="outline"
                      >
                        Start a Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Logos */}
        <section ref={logoGridRef} className="border-y-2 border-foreground bg-background py-8 md:py-12 w-full overflow-x-hidden">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-full">
            <div className="flex flex-col items-center w-full">
              <h3 className="mb-6 text-center font-serif text-xl font-bold text-[#1B1F3B] md:text-3xl md:mb-8">
                Trusted by businesses using modern tech
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-8 w-full max-w-4xl">
                {[
                  { name: "Next.js", src: next },
                  { name: "PayloadCMS", src: contentful },
                  { name: "React", src: pacific },
                  { name: "Node.js", src: countrygarden },
                  { name: "Express.js", src: rolandmusic },
                  { name: "MongoDB", src: mongo }
                ].map((logo, index) => (
                  <div 
                    key={index} 
                    className="group logo-float relative flex items-center justify-center w-full"
                  >
                    <div className="absolute inset-0 -z-10 rounded-lg border-2 border-foreground bg-card opacity-0 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] transition-all duration-300 group-hover:opacity-100 md:shadow-[4px_4px_0px_0px_rgba(27,31,59,1)]"></div>
                    <div className="relative w-full overflow-hidden p-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:p-4">
                      <Image 
                        src={logo.src || "/placeholder.svg"} 
                        alt={`${logo.name} logo`} 
                        width={60} 
                        height={60} 
                        className="h-12 w-12 object-contain mx-auto md:h-20 md:w-20 md:h-16 md:w-16" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tagline Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute -left-4 -top-4 h-8 w-8 border-2 border-[#1B1F3B] bg-primary geo-shape md:-left-8 md:-top-8 md:h-16 md:w-16"></div>
              <div className="absolute -right-4 -bottom-4 h-8 w-8 border-2 border-[#1B1F3B] bg-secondary geo-shape md:-right-8 md:-bottom-8 md:h-16 md:w-16"></div>
              <h2 className="relative z-10 mx-auto font-serif text-4xl font-bold leading-tight text-[#1B1F3B] md:text-5xl">
                &quot;Rapid development <span className="italic">meets modern technology</span>
                <br />
                for <span className="text-primary">scalable web solutions&quot;</span>
              </h2>
            </div>
          </div>
        </section>

        {/* Services */}
        <section ref={servicesRef} className="container mx-auto px-4 py-16 md:px-6 md:py-32 w-full max-w-full overflow-x-hidden">
          <div className="mb-12 text-center md:mb-16">
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
              Services
            </div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-[#1B1F3B] md:text-6xl md:mb-4">
                What I <span className="italic">specialize</span> in
              </h2>
            <div className="mx-auto mb-4 h-1 w-20 bg-[#1B1F3B] md:mb-6 md:w-24"></div>
            <p className="mx-auto max-w-2xl text-base text-black/70 md:text-lg">
              Modern web development solutions built with cutting-edge technologies for scalable applications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 w-full max-w-full">
            {[
              {
                title: "Next.js + PayloadCMS",
                description: "Rapid web development with Next.js and PayloadCMS for content management, delivering fast and scalable websites with modern features.",
                color: "bg-gradient-to-br from-primary to-[#F8D980]",
                icon: <Globe className="h-8 w-8" />,
                pattern: "bg-[radial-gradient(black_1px,transparent_1px)] bg-[length:10px_10px]",
              },
              {
                title: "MERN Stack Development",
                description: "Full-stack web applications using MongoDB, Express.js, React, and Node.js for complete end-to-end solutions.",
                color: "bg-gradient-to-br from-secondary to-[#1B1F3B]",
                icon: <Database className="h-8 w-8" />,
                pattern:
                  "bg-[linear-gradient(45deg,black_25%,transparent_25%,transparent_50%,black_50%,black_75%,transparent_75%,transparent)] bg-[length:6px_6px]",
              },
              {
                title: "JavaScript Solutions",
                description: "Full-stack JavaScript development with TypeScript, modern frameworks, and best practices for robust web applications.",
                color: "bg-gradient-to-br from-primary to-[#1B1F3B]",
                icon: <Code className="h-8 w-8" />,
                pattern:
                  "bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-[length:10px_10px]",
              },
            ].map((service, index) => (
              <div key={index} className="group relative service-card">
                <div
                  className={`relative overflow-hidden rounded-xl border-2 border-black ${service.color} p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <div className={`absolute inset-0 opacity-10 ${service.pattern}`}></div>
                  <div className="mb-4 text-white">{service.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{service.title}</h3>
                  <p className="text-white/90">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Expertise */}
        <section ref={skillsRef} className="container mx-auto px-4 py-16 md:px-6 md:py-32 w-full max-w-full overflow-x-hidden">
          <div className="mb-12 text-center md:mb-16">
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
              Tech Stack
            </div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-[#1B1F3B] md:text-6xl md:mb-4">
                My <span className="italic">development</span> toolkit
              </h2>
            <div className="mx-auto mb-4 h-1 w-20 bg-[#1B1F3B] md:mb-6 md:w-24"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8 w-full max-w-full">
            {[
              {
                icon: <Image src={lightning} alt="lightning"/>,
                title: "Rapid Prototyping",
                description: "Next.js with PayloadCMS for lightning-fast website deployment and content management systems.",
              },
              {
                icon: <Image src={pricing} alt="MERN"/>,
                title: "MERN Stack",
                description: "Full-stack development with MongoDB, Express.js, React, and Node.js for scalable web applications.",
              },
              {
                icon: <Image src={top} alt="javascript"/>,
                title: "Modern JavaScript",
                description: "TypeScript, ES6+, and modern frameworks for robust and maintainable web applications.",
              },
              {
                icon: <Image src={scalable} alt="database"/>,
                title: "Database Design",
                description: "MongoDB, PostgreSQL, and modern database solutions for scalable and efficient data management.",
              },
            ].map((skill, index) => (
              <div key={index} className="group relative skill-card">
                <div className="relative rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(27,31,59,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(27,31,59,1)]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#1B1F3B] bg-primary text-2xl shadow-[2px_2px_0px_0px_rgba(27,31,59,1)]">
                    {skill.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#1B1F3B]">{skill.title}</h3>
                  <p className="text-[#444444]">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} className="container mx-auto px-4 py-16 md:px-6 md:py-32 w-full max-w-full overflow-x-hidden" id="portfolio">
          <div className="mb-12 text-center md:mb-16">
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
              Portfolio
            </div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-[#1B1F3B] md:text-5xl md:mb-4">
              Featured <span className="italic">projects</span>
            </h2>
            <div className="mx-auto mb-4 h-1 w-20 bg-[#1B1F3B] md:mb-6 md:w-24"></div>
            <p className="mx-auto max-w-2xl text-base text-black/70 md:text-lg">
              A showcase of web applications built with Next.js, PayloadCMS, and the MERN stack.
            </p>
          </div>

          <div className="portfolio-section-wrapper w-full max-w-full">
            <Showcase/>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32" id="contact">
          <div className="mb-16 text-center">
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
              Contact
            </div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-[#1B1F3B] md:text-5xl lg:text-6xl">
              Let&apos;s <span className="italic">work together</span>
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 bg-[#1B1F3B]"></div>
            <p className="mx-auto max-w-2xl text-base text-[#1B1F3B]/80 md:text-lg">
              Have a project in mind? Let&apos;s discuss how we can create something amazing together.
            </p>
          </div>

          <div className="contact-section-wrapper">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-primary opacity-20 md:-left-8 md:-top-8 md:h-32 md:w-32"></div>
              <div className="absolute -right-4 bottom-4 h-20 w-20 rounded-full bg-secondary opacity-20 md:-right-8 md:bottom-8 md:h-40 md:w-40"></div>

              <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)]">
                <div className="absolute -right-16 -top-16 h-32 w-32 rotate-12 bg-[linear-gradient(45deg,white_25%,transparent_25%,transparent_50%,white_50%,white_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-20"></div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>

                  <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-[#1B1F3B] md:text-4xl">Get in Touch</h2>

                  <div className="mb-6 h-1 w-24 bg-[#1B1F3B]"></div>

                  <p className="mb-6 max-w-2xl text-base text-[#444444] md:text-lg">
                    Whether you need a modern website, web application, or technical consultation, I&apos;m here to help bring your vision to life.
                  </p>

                  <p className="mb-8 max-w-2xl text-base text-[#444444]">
                    Email me at{" "}
                    <Link href="mailto:antonio_kodheli@icloud.com" className="font-medium text-primary underline">
                      antonio_kodheli@icloud.com
                    </Link>{" "}
                    or use the contact button below.
                  </p>

                  <div className="mb-8 text-center">
                    <p className="text-[#444444]">📍 Boston, MA</p>
                  </div>

                  <Button
                    className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-primary px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)] sm:w-auto sm:px-8"
                    asChild
                  >
                    <a href="mailto:antonio_kodheli@icloud.com">
                      Contact Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#1B1F3B] bg-background py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold text-[#1B1F3B] md:text-2xl">{"{codeWithToni}"}</div>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#1B1F3B] md:text-base">Full-Stack Web Developer</p>
              <p className="text-xs text-[#444444] md:text-sm">Next.js • PayloadCMS • MERN Stack</p>
            </div>
            <div className="flex gap-3 md:gap-4">
              <Link href='https://twitter.com/antonio_codes'>
              <Button
                className="h-8 w-8 rounded-full border-2 border-[#1B1F3B] bg-background p-0 text-[#1B1F3B] shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] animate-button md:h-9 md:w-9"
                variant="outline"
                size="icon"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 md:h-4 md:w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
              </Link>
              <Link href={'https://www.linkedin.com/in/antonio-kodheli-1430aa290/'}>
              <Button
                className="h-8 w-8 rounded-full border-2 border-[#1B1F3B] bg-background p-0 text-[#1B1F3B] shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] animate-button md:h-9 md:w-9"
                variant="outline"
                size="icon"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 md:h-4 md:w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Button>
              </Link>
              <Link href={'https://github.com/antonio-codes'}>
              <Button
                className="h-8 w-8 rounded-full border-2 border-[#1B1F3B] bg-background p-0 text-[#1B1F3B] shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] animate-button md:h-9 md:w-9"
                variant="outline"
                size="icon"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 md:h-4 md:w-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t-2 border-black/10 pt-8 text-center text-xs text-black/70">
            <p>© {new Date().getFullYear()} Antonio Kodheli. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

