"use client";

// Uses Google Maps Embed API — free, no API key required for basic embeds
interface InteractiveMapProps {
  destination?: string;
}

// Per-destination coordinates for the embed
const DESTINATION_COORDS: Record<string, { q: string; label: string }> = {
  kashmir: { q: "Dal+Lake,Srinagar,Jammu+and+Kashmir,India", label: "Dal Lake, Srinagar" },
  goa: { q: "Baga+Beach,Goa,India", label: "Baga Beach, Goa" },
  kerala: { q: "Alleppey+Backwaters,Kerala,India", label: "Alleppey Backwaters, Kerala" },
  jaipur: { q: "Amber+Fort,Jaipur,Rajasthan,India", label: "Amber Fort, Jaipur" },
  ladakh: { q: "Pangong+Lake,Ladakh,India", label: "Pangong Tso, Ladakh" },
  varanasi: { q: "Dashashwamedh+Ghat,Varanasi,India", label: "Dashashwamedh Ghat, Varanasi" },
  meghalaya: { q: "Living+Root+Bridge,Cherrapunji,Meghalaya,India", label: "Root Bridges, Meghalaya" },
  andaman: { q: "Radhanagar+Beach,Havelock+Island,Andaman,India", label: "Radhanagar Beach, Andaman" },
  hyderabad: { q: "Charminar,Hyderabad,Telangana,India", label: "Charminar, Hyderabad" },
};

export default function InteractiveMap({ destination = "Kashmir" }: InteractiveMapProps) {
  const key = destination.toLowerCase().replace(/,.*/, "").trim();
  const coords = DESTINATION_COORDS[key] || { q: `${destination.replace(/ /g, "+")},India`, label: destination };

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${coords.q}&zoom=11`;

  return (
    <div className="w-full rounded-[2rem] overflow-hidden relative glass-dark border border-white/10" style={{ height: 380 }}>
      <iframe
        title={`Map of ${coords.label}`}
        src={embedUrl}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Label overlay */}
      <div className="absolute bottom-4 left-4 right-4 glass px-4 py-2.5 rounded-xl flex items-center justify-between text-sm pointer-events-none">
        <span className="text-white font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {coords.label}
        </span>
        <span className="text-orange-400 text-xs font-semibold">📍 Live Map</span>
      </div>
    </div>
  );
}
