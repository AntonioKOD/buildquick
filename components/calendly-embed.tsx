"use client";

import React from "react";
import { InlineWidget } from "react-calendly";

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

export default function CalendlyEmbed({ url, height = 650 }: CalendlyEmbedProps) {
  return (
    <div
      className="border-2 border-[#1B1F3B] rounded-xl shadow-[8px_8px_0px_rgba(27,31,59,1)] bg-white overflow-hidden"
      style={{ minHeight: `${height}px`, width: "100%" }}
    >
      <InlineWidget
        url={`${url}?hide_landing_page_details=1&hide_gdpr_banner=1`}
        styles={{ height: `${height}px`, width: "100%" }}
        pageSettings={{
          backgroundColor: "fef6e4",
          primaryColor: "E63946",
          textColor: "#1B1F3B",
        }}
      />
    </div>
  );
}