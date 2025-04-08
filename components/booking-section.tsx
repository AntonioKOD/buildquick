"use client";

import React, { useEffect } from "react";
import { Clock, Check } from "lucide-react";
import anime from "animejs";
import CustomCalendlyWidget from "./custom-calendly/custom-calendly-widget";



export function BookingSection() {
  useEffect(() => {
    // Animate all elements with the class "booking-element"
    anime({
      targets: ".booking-element",
      translateY: [20, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(100),
    });
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] md:p-8">
      {/* Decorative background elements */}
      <div className="absolute -left-16 -top-16 h-32 w-32 rotate-12 rounded-full bg-primary opacity-10"></div>
      <div className="absolute -right-16 -bottom-16 h-32 w-32 rotate-12 rounded-full bg-accent opacity-10"></div>
      <div className="absolute right-0 top-0 h-24 w-24 bg-[linear-gradient(45deg,#F4C542_25%,transparent_25%,transparent_50%,#F4C542_50%,#F4C542_75%,transparent_75%,transparent)] bg-[length:8px_8px] opacity-20"></div>

      <div className="relative z-10 grid gap-8 md:grid-cols-2">
        {/* Left column - Informational content */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-2 inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white booking-element">
              Book a call
            </div>
            <h2 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#1B1F3B] booking-element">
              See if BuildQuick is <br />
              <span className="italic">the right fit for you</span>
              <br />
              <span className="text-primary">(it totally is)</span>
            </h2>
            <div className="mb-6 h-1 w-24 bg-[#1B1F3B] booking-element"></div>
            <p className="mb-8 text-lg text-[#444444] booking-element">
              Schedule a quick, 15 minute guided tour through BuildQuick.
            </p>

            <div className="mb-8 space-y-4 booking-element">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#1B1F3B] bg-accent text-[#1B1F3B]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B1F3B]">15-Minute Introduction</h3>
                  <p className="text-sm text-[#444444]">
                    Quick overview of how BuildQuick works
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#1B1F3B] bg-secondary text-[#1B1F3B]">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B1F3B]">No Commitment</h3>
                  <p className="text-sm text-[#444444]">
                    Just a friendly chat to see if we&apos;re a good match
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative emoji icons */}
          <div className="mt-auto hidden md:block">
            <div className="grid grid-cols-4 gap-2">
              {["😊", "😎", "🚀", "✨"].map((emoji, index) => (
                <div
                  key={index}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#1B1F3B] bg-white text-2xl shadow-[2px_2px_0px_0px_rgba(27,31,59,1)]"
                  style={{
                    backgroundColor:
                      index === 0
                        ? "var(--primary)"
                        : index === 1
                        ? "var(--accent)"
                        : index === 2
                        ? "var(--secondary)"
                        : "var(--background)",
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Calendly widget embed */}
        <div className="relative booking-element">
          <div className="rounded-xl border-2 border-[#1B1F3B] bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(27,31,59,1)]">
            <CustomCalendlyWidget/>
          </div>
        </div>
      </div>
    </div>
  );
}