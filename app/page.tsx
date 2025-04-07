/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { CheckCircle, ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import anime from 'animejs';
import logo from '@/public/logo_buildquick.svg'
import Image from "next/image";
import pause from "@/public/pause.svg"
import sub from "@/public/sub.svg"
import testing from "@/public/testing.svg"
import receive from "@/public/receive.svg"
import request from "@/public/request.svg"
import lightning from "@/public/lightning.svg"
import pricing from "@/public/pricing.svg"
import rocket from "@/public/rocket.svg"
import top from "@/public/top.svg"
import scalable from "@/public/scalable.svg"
import talk from "@/public/talk.svg"
import Link from "next/link";
import contentful from "@/public/contentful.svg"
import next from '@/public/nextjs.svg'
import pacific from '@/public/pacific.svg'
import rolandmusic from '@/public/rolandmusic.svg'
import mongo from '@/public/mongo.svg'
import countrygarden from '@/public/countrygarden.svg'

export default function Home() {
  const heroRef = useRef(null)
  const logoGridRef = useRef(null)
  const processRef = useRef(null)
  const benefitsRef = useRef(null)
  const pricingRef = useRef(null)
  const testimonialsRef = useRef(null)
  const faqRef = useRef(null)
  const flexibleRef = useRef(null)
  

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

    const animateProcess = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".process-card",
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(150),
          })
          processObserver.unobserve(entry.target)
        }
      })
    }

    const animateBenefits = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".benefit-card",
            scale: [0.9, 1],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(100),
          })
          benefitsObserver.unobserve(entry.target)
        }
      })
    }

    const animatePricing = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".pricing-card",
            translateX: [50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(200),
          })
          pricingObserver.unobserve(entry.target)
        }
      })
    }

    const animateTestimonials = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".testimonial-card",
            translateY: [50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(150),
          })
          testimonialsObserver.unobserve(entry.target)
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

    const animateFlexible = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".flexible-card",
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: "easeOutElastic(1, .5)",
            duration: 1000,
            delay: anime.stagger(200),
          })
          flexibleObserver.unobserve(entry.target)
        }
      })
    }

    const processObserver = new IntersectionObserver(animateProcess, observerOptions)
    const benefitsObserver = new IntersectionObserver(animateBenefits, observerOptions)
    const pricingObserver = new IntersectionObserver(animatePricing, observerOptions)
    const testimonialsObserver = new IntersectionObserver(animateTestimonials, observerOptions)
    const faqObserver = new IntersectionObserver(animateFaq, observerOptions)
    const flexibleObserver = new IntersectionObserver(animateFlexible, observerOptions)

    const processNode = processRef.current;
    if (processNode) processObserver.observe(processNode);
    if (benefitsRef.current) benefitsObserver.observe(benefitsRef.current)
    if (pricingRef.current) pricingObserver.observe(pricingRef.current)
    if (testimonialsRef.current) testimonialsObserver.observe(testimonialsRef.current)
    if (faqRef.current) faqObserver.observe(faqRef.current)
    if (flexibleRef.current) flexibleObserver.observe(flexibleRef.current)

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
      if (processNode) processObserver.unobserve(processNode)
      if (processRef.current) processObserver.unobserve(processRef.current)
      if (benefitsRef.current) benefitsObserver.unobserve(benefitsRef.current)
      if (pricingRef.current) pricingObserver.unobserve(pricingRef.current)
      if (testimonialsRef.current) testimonialsObserver.unobserve(testimonialsRef.current)
      if (faqRef.current) faqObserver.unobserve(faqRef.current)
      if (flexibleRef.current) flexibleObserver.unobserve(flexibleRef.current)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-color-background">
      <header className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
        <div className="flex items-center gap-2 hero-element">
          <Image src={logo} alt='logo for buildquick' height={120} width={120}/>
        </div>
        <div className="flex items-center gap-4">
          <Link href='https://calendly.com/antonio-36xn/new-meeting'>
          <Button
            className="h-10 rounded-md border-2 border-[#1B1F3B] bg-[#1B1F3B] px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)] animate-button hero-element"
            variant="default"
          >
            Let&apos; talk
          </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-primary geo-shape md:-left-8 md:-top-8 md:h-32 md:w-32"></div>
            <div className="absolute -right-4 bottom-4 h-20 w-20 rounded-full bg-secondary geo-shape md:-right-8 md:bottom-8 md:h-40 md:w-40"></div>
            <div className="relative grid gap-12 rounded-xl border-2 border-[#1B1F3B] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] md:grid-cols-2 md:items-center md:p-12">
              <div>
                <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B] hero-element">
                  Develop Fast, Launch Now
                </div>
                <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-[#1B1F3B] hero-element md:text-6xl">
                  Unlimited development
                  <br />
                  <span className="italic">for MVPs</span>
                  <br />
                  and <span className="text-primary">more</span>
                </h1>
                <div className="mb-4 h-1 w-24 bg-[#1B1F3B] hero-element"></div>
                <p className="mb-8 text-lg text-black/70 hero-element">
                  I&apos;m your lead dev—building your ideas in days. Pause or cancel anytime.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href='https://buy.stripe.com/eVacOcfVxeRL2n6fYY'>
                    <Button
                      className="h-12 rounded-md border-2 border-[#1B1F3B] bg-primary px-8 text-sm font-bold text-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)] animate-button hero-element"
                      variant="default"
                    >
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hero-element">
                <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-gradient-to-br from-secondary to-[#1B1F3B] p-6 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)]">
                  <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-secondary opacity-50 blur-xl"></div>
                  <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-primary opacity-50 blur-xl"></div>
                  <div className="relative z-10 text-center text-white">
                    <div className="mb-4 flex justify-center">
                      <div className="text-center">
                        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-black bg-yellow-400">
                          <div className="flex h-full w-full items-center justify-center text-4xl"><Image src={rocket} alt='rocket' width={120} height={120}/></div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-2 inline-block rounded-md bg-black px-4 py-1 text-sm font-bold text-white">
                      Start today
                    </div>
                    
                    <h2 className="mb-2 text-3xl font-bold">Get the Builder&apos;s Pass</h2>
                    <p className="mb-6"> Unlimited builds, one flat fee.</p>
                    <Link href="#pricing">
                    <Button
                      className="h-10 w-full rounded-md border-2 border-black bg-white px-6 text-sm font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-button"
                      variant="outline"
                    >
                      See pricing
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logos */}
        <section ref={logoGridRef} className="border-y-2 border-foreground bg-background  ">
          <div className="container mx-auto px-2 md:px-6">
            <div className="flex flex-col items-center">  
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
                {[
                  { name: "Next.js", src: next },
                  { name: "Contentful", src: contentful },
                  { name: "Pacific Coffee", src: pacific },
                  { name: "Country Garden", src: countrygarden },
                  { name: "Roland Music", src: rolandmusic },
                  { name: "MongoDB", src: mongo }
                ].map((logo, index) => (
                  <div 
                    key={index} 
                    className="group logo-float relative flex items-center justify-center"
                  >
                    <div className="absolute inset-0 -z-10 rounded-lg border-2 border-foreground bg-card opacity-0 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all duration-300 group-hover:opacity-100"></div>
                    <div className="relative w-full overflow-hidden p-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <Image 
                        src={logo.src || "/placeholder.svg"} 
                        alt={`${logo.name} logo`} 
                        width={120} 
                        height={120} 
                        className="h-full w-full object-contain" 
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
                Development, <span className="italic">reimagined</span>
                <br />
                for <span className="text-primary">dreamers</span>
              </h2>
            </div>
          </div>
        </section>

        {/* Three-step Process */}
        <section ref={processRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Subscribe",
                description: "Subscribe to our $499/month plan and request as many development tasks as you'd like.",
                color: "bg-gradient-to-br from-primary to-[#F8D980]",
                icon: <Image src={sub} alt="subscribe" width={40}/>,
                pattern: "bg-[radial-gradient(black_1px,transparent_1px)] bg-[length:10px_10px]",
              },
              {
                title: "Request",
                description: "Submit unlimited development requests—whether it’s a full MVP, landing page, or a quick bug fix, we’ve got you covered.",
                color: "bg-gradient-to-br from-secondary to-[#1B1F3B]",
                icon: <Image src={request} alt="request" width={40}/>,
                pattern:
                  "bg-[linear-gradient(45deg,black_25%,transparent_25%,transparent_50%,black_50%,black_75%,transparent_75%,transparent)] bg-[length:6px_6px]",
              },
              {
                title: "Receive",
                description: "Get your development work delivered in just a few days—no long waits, no bottlenecks, just fast, high-quality results.",
                color: "bg-gradient-to-br from-primary to-[#1B1F3B]",
                icon: <Image src={receive} alt="receive" width={40}/>,
                pattern:
                  "bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-[length:10px_10px]",
              },
            ].map((step, index) => (
              <div key={index} className="group relative process-card">
                <div
                  className={`relative overflow-hidden rounded-xl border-2 border-black ${step.color} p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <div className={`absolute inset-0 opacity-10 ${step.pattern}`}></div>
                  <div className="mb-4 text-4xl">{step.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-white/90">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Benefits */}
        <section ref={benefitsRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32">
          <div className="mb-16 text-center">
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
            Your Builder&apos;s Advantage
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold text-[#1B1F3B] md:text-6xl">
            It&apos;s <span className='italic'>&apos;game-changer&apos;</span> brilliant


            </h2>
            <div className="mx-auto mb-6 h-1 w-24 bg-[#1B1F3B]"></div>
            <p className="mx-auto max-w-2xl text-lg text-black/70">
            Say goodbye to flaky freelancers and overpriced agencies—BuildQuick delivers unlimited development for a single monthly fee. From MVPs to AI agents, your projects launch at lightning speed, keeping you ahead of the game.


            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Image src={lightning} alt="lightning"/>,
                title: "Lightning-Fast Dev Hub",
                description:
                  "Moving at warp speed to bring your ideas to life, so you can test and iterate without the wait.",
              },
              {
                icon: <Image src={pricing} alt="pricing"/>,
                title: "One Price, Endless Builds",
                description:
                  "A single monthly fee unlocks unlimited development—no hidden costs, no matter how much you create.",
              },
              {
                icon: <Image src={top} alt="top quality"/>,
                title: "Elite Development Craft",
                description: "Access senior-grade expertise whenever you need it, delivered with speed, precision, and zero stress ",
              },
              {
                icon: <Image src={scalable} alt="scalable"/>,
                title: "Scale with Total Freedom",
                description: "Ramp up, dial back, or pause anytime—your subscription adapts to your rhythm, hassle-free.",
              },
            ].map((benefit, index) => (
              <div key={index} className="group relative benefit-card">
                <div className="relative rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(27,31,59,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(27,31,59,1)]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#1B1F3B] bg-primary text-2xl shadow-[2px_2px_0px_0px_rgba(27,31,59,1)]">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#1B1F3B]">{benefit.title}</h3>
                  <p className="text-[#444444]">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32" id="pricing">
          <div className="mb-16 text-center">
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
              Pricing
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold text-[#1B1F3B] md:text-6xl">
              One subscription,
              <br />
              <span className="italic">endless possibilities</span>
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 bg-[#1B1F3B]"></div>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] pricing-card">
              <div className="absolute -right-16 -top-16 h-32 w-32 rotate-12 bg-[linear-gradient(45deg,#F4C542_25%,transparent_25%,transparent_50%,#F4C542_50%,#F4C542_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-20"></div>
              <div className="mb-4 flex justify-center">
                <div className="text-center">
                  <div className="h-30 w-30 overflow-hidden rounded-full border-2 border-black bg-primary">
                    <div className="flex h-full w-full items-center justify-center text-4xl"><Image src={talk} alt="talk bubble"/></div>
                  </div>
                </div>
              </div>
              
              <div className="mb-2 inline-block rounded-md bg-black px-4 py-1 text-sm font-bold text-white">
                Start today
              </div>
              
              <h3 className="mb-2 text-2xl font-bold">Join BuildQuick</h3>
              <p className="mb-4 text-black/70">One subscription to rule them all.</p>
              <Link href={'https://calendly.com/antonio-36xn/new-meeting'}>
              <Button
                className="mb-4 h-10 w-full rounded-md border-2 border-black bg-black px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-button"
                variant="default"
              >
                Let&apos;s talk
              </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-black/70">
                <Clock className="h-4 w-4" />
                <span>Book a 30-min intro call</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-[#1B1F3B] p-8 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] pricing-card">
              <div className="absolute -right-16 -top-16 h-32 w-32 rotate-12 bg-[linear-gradient(45deg,#F4C542_25%,transparent_25%,transparent_50%,#F4C542_50%,#F4C542_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-20"></div>
              <div className="mb-2 text-sm font-bold uppercase tracking-wider text-white/70">Builder&apos;s Pass</div>
              <div className="mb-6 border-b border-white/10 pb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">$499</span>
                  <span className="text-sm text-white/70">/month</span>
                </div>
                <div className="mt-2 inline-block rounded-md border border-white/20 px-3 py-0.5 text-xs text-white/70">
                  PAUSE OR CANCEL ANYTIME
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-white">One request at a time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-white">Unlimited revisions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-white">Avg. 3-5 day delivery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-white">Pause or cancel anytime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-white">Full-stack development</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-white">MVP-focused</span>
                  </div>
                </div>
              </div>
              <Link href='https://buy.stripe.com/eVacOcfVxeRL2n6fYY'>
              <Button
                className="h-12 w-full rounded-md border-2 border-black bg-primary px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-button"
                variant="default"
              >
                Join today
              </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials 
        <section ref={testimonialsRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-[#1B1F3B] md:text-5xl">What our clients say</h2>
            <div className="mx-auto mb-6 h-1 w-24 bg-[#1B1F3B]"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote: "BuildQuick shows that they know the art of building MVPs quickly.",
                author: "Sarah Johnson",
                role: "Founder, TechStart",
                logo: "TechStart",
                pattern: "bg-[radial-gradient(black_1px,transparent_1px)] bg-[length:10px_10px]",
              },
              {
                quote: "Development is everything, and these guys have nailed it.",
                author: "Michael Chen",
                role: "CEO, GrowthLabs",
                logo: "GrowthLabs",
                pattern:
                  "bg-[linear-gradient(45deg,black_25%,transparent_25%,transparent_50%,black_50%,black_75%,transparent_75%,transparent)] bg-[length:6px_6px]",
              },
            ].map((testimonial, index) => (
              <div key={index} className="group relative testimonial-card">
                <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-white p-8 shadow-[6px_6px_0px_0px_rgba(27,31,59,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(27,31,59,1)]">
                  <div className={`absolute inset-0 opacity-5 ${testimonial.pattern}`}></div>
                  <h3 className="mb-6 text-3xl font-serif font-bold text-[#1B1F3B]">&quot;{testimonial.quote}&quot;</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#1B1F3B] bg-primary">
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#1B1F3B]">
                        {testimonial.author
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-[#1B1F3B]">{testimonial.author}</div>
                      <div className="text-sm text-[#444444]">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-8 w-24 rounded bg-[#E3E6F5]"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        */}

        

        {/* FAQ Section */}
        <section ref={faqRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1B1F3B]">
                Frequently
              </div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-[#1B1F3B] md:text-6xl">asked questions</h2>
              <div className="mb-6 h-1 w-24 bg-[#1B1F3B]"></div>

              <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-gradient-to-br from-primary to-[#F8D980] p-8 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)]">
                <div className="absolute -right-16 -top-16 h-32 w-32 rotate-12 bg-[linear-gradient(45deg,white_25%,transparent_25%,transparent_50%,white_50%,white_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-20"></div>
                <div className="mb-4 text-4xl">📞</div>
                <h3 className="mb-2 text-2xl font-bold text-white">Book a 30-min intro call</h3>
                <p className="mb-6 text-white/90">Have more questions? Schedule a quick call with us.</p>
                <Link href='https://calendly.com/antonio-36xn/new-meeting'>
                <Button
                  className="h-10 w-full rounded-md border-2 border-black bg-white px-6 text-sm font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-button"
                  variant="outline"
                >
                  Let&apos;s talk
                </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How fast will I receive my MVP?",
                  answer:
                    "Most MVPs can be built in 5 days up to 4 weeks, depending on complexity. We work in sprints to deliver value quickly.",
                },
                {
                  question: "Is there a limit to how many requests I can make?",
                  answer:
                    "We work on one request at a time, but you can queue up as many as you'd like. Once one is complete, we move to the next.",
                },
                {
                  question: "How does the pause feature work?",
                  answer:
                    "You can pause your subscription anytime. We'll complete any in-progress work, and you can resume when you're ready.",
                },
                {
                  question: "What tech stack do you use?",
                  answer:
                    "We primarily use React, Next.js, Node.js, Express, PayloadCMS and various databases like MongoDB and PostgreSQL. We can adapt to your needs.",
                },
                {
                  question: "Can I use BuildQuick for just a month?",
                  answer: "There's no minimum commitment. Use us for a month, a year, or however long you need.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] faq-item"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1B1F3B]">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-[#1B1F3B]" />
                  </div>
                  <div className="mt-2 text-[#444444]">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flexible Options */}
        <section ref={flexibleRef} className="container mx-auto px-4 py-20 md:px-6 md:py-32">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border-2 border-[#1B1F3B] bg-white p-8 shadow-[6px_6px_0px_0px_rgba(27,31,59,1)] flexible-card">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md border-2 border-[#1B1F3B] bg-primary text-2xl shadow-[2px_2px_0px_0px_rgba(27,31,59,1)]">
                <Image src={pause} alt="pause" width={120} height={120}/>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#1B1F3B]">Freeze when you need</h3>
              <p className="text-[#444444]">Take a break from your plan anytime, effortlessly.</p>
            </div>

            <div className="rounded-xl border-2 border-[#1B1F3B] bg-white p-8 shadow-[6px_6px_0px_0px_rgba(27,31,59,1)] flexible-card">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md border-2 border-[#1B1F3B] bg-primary text-2xl shadow-[2px_2px_0px_0px_rgba(27,31,59,1)]">
                <Image src={testing} alt="testing" width={120} height={120}/>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#1B1F3B]">Test Drive for 7 Days</h3>
              <p className="text-[#444444]">Not hooked yet? Claim 50% back, hassle-free.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#1B1F3B] bg-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="logo image " width={120} height={120}/>
            </div>
            <div className="flex gap-4">
              <Link href='https://x.com/_buildquick'>
              <Button
                className="h-9 w-9 rounded-full border-2 border-[#1B1F3B] bg-background p-0 text-[#1B1F3B] shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] animate-button"
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
                  className="h-4 w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Button>
              </Link>
              <Link href={'https://www.linkedin.com/in/antonio-kodheli-1430aa290/'}>
              <Button
                className="h-9 w-9 rounded-full border-2 border-[#1B1F3B] bg-background p-0 text-[#1B1F3B] shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(27,31,59,1)] animate-button"
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
                  className="h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t-2 border-black/10 pt-8 text-center text-xs text-black/70">
            <p>© {new Date().getFullYear()} BuildQuick. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

