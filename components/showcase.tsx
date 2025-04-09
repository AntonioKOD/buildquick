import { InfiniteMovingPhotos } from "./infinite-moving-photos";

export default function Showcase() {
    const photos = [
      {
        imageUrl: "https://i.imgur.com/XdEyFxn.jpeg",
        alt: "Gjovana's Villas",
        url: "https://gjovanasvillas.com/",
      },
      {
        imageUrl: "https://i.imgur.com/gFKotKH.jpeg",
        alt: "Construct Concepts",
        url: "https://constructconcepts.com",
      },
      {
        imageUrl: "https://i.imgur.com/3uE1ACD.png",
        alt: "Scene Match social media",
        url: "https://scenematch.com",
      },
      {
        imageUrl: "https://i.imgur.com/7ZderMm.png",
        alt: "Roaming Mix Bartender",
        url: "https://roamingmix.com",
      },
      {
        imageUrl: "https://i.imgur.com/52NSKei.png",
        alt: "Hotel As",
        url: "https://www.hotelasbaksrrjoll.com/",
      },
      {
        imageUrl: "https://i.imgur.com/sMVGy4K_d.png?maxwidth=520&shape=thumb&fidelity=high",
        alt: "PioneerUI",
        url: "https://pioneerui.com",
      },
      {
        imageUrl: "https://i.imgur.com/gLd4qDC.png",
        alt: "Internal Inventory system",
        url: "https://inventory-kzr2.onrender.com/",
      },
    ]
  
    return (
      <div className="py-12 gallery-section">
        <InfiniteMovingPhotos items={photos} direction="left" speed="normal" />
      </div>
    )
  }
  